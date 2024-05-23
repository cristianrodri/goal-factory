import { privateApi } from '@/utils/api'
import { deleteTokenCookie } from '@/utils/cookie'
import { user } from '@/utils/classes/User'
import { successResponse } from '@/utils/response'

export const POST = privateApi(async () => {
  deleteTokenCookie()

  // Add the user id to the class
  user.setId('')

  return successResponse({ message: 'Logged out' })
})
