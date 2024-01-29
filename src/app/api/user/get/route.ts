import User from '@/lib/user/model'
import { privateApi } from '@/utils/api'
import { NextResponse } from 'next/server'

export const GET = privateApi(async userId => {
  // Add the user id to the class
  const data = await User.findById(userId)

  return NextResponse.json(data)
})
