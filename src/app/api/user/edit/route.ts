import User from '@/lib/user/model'
import { UserData } from '@/types'
import { privateApi } from '@/utils/api'
import { comparePassword } from '@/utils/db'
import { Status } from '@/utils/enums'
import { NextResponse } from 'next/server'

interface RequestBody extends Pick<UserData, 'email' | 'username'> {
  currentPassword: string
  newPassword: string
}

export const PUT = privateApi<RequestBody>(
  async (userId, { email, username, currentPassword, newPassword }) => {
    const user = await User.findById(userId)

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: Status.NOT_FOUND }
      )
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

    return NextResponse.json(user, {
      status: Status.CREATED
    })
  }
)
