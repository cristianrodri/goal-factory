import { createUser } from '@/lib/user/create'
import { UserData } from '@/types'
import { publicApi } from '@/utils/api'
import { user } from '@/utils/classes/User'
import { createTokenCookie } from '@/utils/cookie'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

export const POST = publicApi<UserData>(async ({ body }) => {
  const createdUser = await createUser(body)
  const token = createdUser.generateAuthToken()

  // Add the user id to the class
  user.setId(createdUser._id.toString())

  createTokenCookie(token)

  return successResponse(createdUser, Status.CREATED)
})
