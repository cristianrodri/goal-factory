import Dependency from '@/lib/motivation-techniques/dependency/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'
import { Status } from '@/utils/enums'

export const GET = privateApi(async user => {
  const userDependency = await Dependency.findOne({ user })

  if (!userDependency) {
    return successResponse('User dependencies not found', Status.NOT_FOUND)
  }

  return successResponse(userDependency)
})
