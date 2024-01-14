import { NextResponse } from 'next/server'
import { privateApi } from '@/utils/api'
import { deleteTokenCookie } from '@/utils/cookie'
import { user } from '@/utils/classes/User'

export const POST = privateApi(async () => {
  deleteTokenCookie()

  // Add the user id to the class
  user.setId('')

  return NextResponse.json({ message: 'Logged out' })
})
