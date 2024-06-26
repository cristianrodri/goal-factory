import User from '@/lib/user/model'
import { IUserData } from '@/types'
import { publicApi } from '@/utils/api'
import { createTokenCookie } from '@/utils/cookie'
import { successResponse } from '@/utils/response'

export const POST = publicApi<IUserData>(
  async ({ body: { email, password } }) => {
    const foundUser = await User.findByCredentials(email, password)
    const token = foundUser.generateAuthToken()

    createTokenCookie(token)

    return successResponse(foundUser)
  }
)
