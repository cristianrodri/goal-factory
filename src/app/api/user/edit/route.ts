import User from '@/lib/user/model'
import { IUserData } from '@/types'
import { privateApi } from '@/utils/api'
import { comparePassword } from '@/utils/db'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'
import { NextResponse } from 'next/server'

interface RequestBody extends Pick<IUserData, 'email' | 'username'> {
  currentPassword: string
  newPassword: string
}

export const PUT = privateApi<RequestBody>(async (userId, { body }) => {
  const { email, username, currentPassword, newPassword } = body

  const user = await User.findById(userId)

  if (!user) {
    return errorResponse('User not found', Status.NOT_FOUND)
  }

  if (email) {
    user.email = email
  }

  if (username) {
    user.username = username
  }

  if (currentPassword && newPassword) {
    const isMatch = await comparePassword(currentPassword, user.password)

    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: Status.BAD_REQUEST }
      )
    }
    user.password = newPassword
  }

  await user.save()

  return successResponse(user)
})
