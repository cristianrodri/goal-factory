import User from '@/lib/user/model'
import { privateApi } from '@/utils/api'
import { user } from '@/utils/classes/User'
import { Status } from '@/utils/enums'
import { NextResponse } from 'next/server'

export const GET = privateApi(async () => {
  // Add the user id to the class
  const data = await User.findById(user.id)

  return NextResponse.json(data, {
    status: Status.CREATED
  })
})
