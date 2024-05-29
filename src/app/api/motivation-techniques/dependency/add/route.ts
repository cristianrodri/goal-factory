import Dependency from '@/lib/motivation-techniques/dependency/model'
import { privateApi } from '@/utils/api'
import { updateOptions } from '@/utils/db'
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

  const dependency = await Dependency.findOneAndUpdate(
    { user },
    {
      $push: {
        dependencies: body
      }
    },
    updateOptions
  )

  if (!dependency) {
    return errorResponse('Dependency not found', Status.NOT_FOUND)
  }

  return successResponse(dependency, Status.CREATED)
})
