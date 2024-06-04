import Dependency from '@/lib/motivation-techniques/dependency/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  dependency: string
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  const previousDependency = await Dependency.findOne({ user })

  if (previousDependency) {
    const exists = previousDependency.dependencies.some(
      dependency => dependency.dependency === body.dependency
    )

    if (exists) {
      return errorResponse('Dependency already exists', Status.CONFLICT)
    }
  }

  const userDependency = await Dependency.findOneAndUpdateOrThrow(
    { user },
    {
      $push: {
        dependencies: body
      }
    }
  )

  return successResponse(userDependency, Status.CREATED)
})
