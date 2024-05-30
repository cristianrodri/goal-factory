import User from '@/lib/user/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

export const GET = privateApi(async userId => {
  const user = await User.findById(userId)

  if (!user) {
    return errorResponse('User not found', Status.NOT_FOUND)
  }

  return successResponse(user)
})
