import User from '@/lib/user/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const GET = privateApi(async userId => {
  // Add the user id to the class
  const data = await User.findById(userId)

  return successResponse(data)
})
