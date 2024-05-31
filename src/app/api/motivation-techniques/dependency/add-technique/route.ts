import { createUserDependecy } from '@/lib/motivation-techniques/dependency/create'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const POST = privateApi(async user => {
  const userDependency = await createUserDependecy(user)

  return successResponse(userDependency)
})
