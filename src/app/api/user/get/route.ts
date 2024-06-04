import User from '@/lib/user/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const GET = privateApi(async userId => {
  const user = await User.findOneOrThrow({ _id: userId })

  return successResponse(user)
})
