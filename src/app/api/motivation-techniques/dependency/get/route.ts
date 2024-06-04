import Dependency from '@/lib/motivation-techniques/dependency/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const GET = privateApi(async user => {
  const userDependency = await Dependency.findOneOrThrow({ user })

  return successResponse(userDependency)
})
