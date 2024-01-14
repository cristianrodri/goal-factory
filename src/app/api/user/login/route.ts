import User from '@/lib/user/model'
import { UserData } from '@/types'
import { publicApi } from '@/utils/api'
import { user } from '@/utils/classes/User'
import { createTokenCookie } from '@/utils/cookie'
import { NextResponse } from 'next/server'

export const POST = publicApi<UserData>(async ({ email, password }) => {
  const foundUser = await User.findByCredentials(email, password)
  const token = foundUser.generateAuthToken()

  // Add the user id to the class
  user.setId(foundUser._id.toString())

  createTokenCookie(token)

  return NextResponse.json(foundUser)
})
