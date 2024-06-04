import User from '@/lib/user/model'
import { IUserData } from '@/types'
import { privateApi } from '@/utils/api'
import { comparePassword } from '@/utils/db'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody extends Pick<IUserData, 'email' | 'username'> {
  currentPassword: string
  newPassword: string
}

export const PUT = privateApi<RequestBody>(async (user, { body }) => {
  const { email, username, currentPassword, newPassword } = body

  const userDocument = await User.findOneOrThrow({ user })

  if (email) {
    userDocument.email = email
  }

  if (username) {
    userDocument.username = username
  }

  if (currentPassword && newPassword) {
    const isMatch = await comparePassword(
      currentPassword,
      userDocument.password
    )

    if (!isMatch) {
      return errorResponse('Invalid password', Status.UNAUTHORIZED)
    }
    userDocument.password = newPassword
  }

  await userDocument.save()

  return successResponse(user)
})
