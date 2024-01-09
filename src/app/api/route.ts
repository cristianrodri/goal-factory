import { publicApi } from '@/utils/api'
import { NextResponse } from 'next/server'

export const GET = publicApi(async () => {
  return NextResponse.json({ message: 'Hello' })
})
