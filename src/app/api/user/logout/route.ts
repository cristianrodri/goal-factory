import { privateApi } from '@/utils/api'
import { deleteTokenCookie } from '@/utils/cookie'
import { successResponse } from '@/utils/response'

export const POST = privateApi(async () => {
  deleteTokenCookie()

  return successResponse({ message: 'Logged out' })
})
