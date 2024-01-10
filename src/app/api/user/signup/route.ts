import { createUser } from '@/lib/user/create'
import { UserData } from '@/types'
import { publicApi } from '@/utils/api'
import { user } from '@/utils/classes/User'
import { createTokenCookie } from '@/utils/cookie'
import { Status } from '@/utils/enums'
import { NextResponse } from 'next/server'

export const POST = publicApi<UserData>(async body => {
  const createdUser = await createUser(body)
  const token = createdUser.generateAuthToken()

  // Add the user id to the class
  user.setId(createdUser._id.toString())

  createTokenCookie(token)

  return NextResponse.json(createdUser, {
    status: Status.CREATED
  })
})
