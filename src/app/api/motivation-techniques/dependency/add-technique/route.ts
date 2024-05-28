import Dependency from '@/lib/motivation-techniques/dependency/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

export const POST = privateApi(async user => {
  const dependencyCreated = await Dependency.create({
    dependencies: [],
    user
  })

  return successResponse(dependencyCreated, Status.CREATED)
})
