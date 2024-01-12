import { NextResponse } from 'next/server'
import { privateApi } from '@/utils/api'
import { deleteTokenCookie } from '@/utils/cookie'

export const POST = privateApi(async () => {
  deleteTokenCookie()

  return NextResponse.json({ message: 'Logged out' })
})
