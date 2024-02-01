import { getAllAspirations } from '@/lib/aspiration/get'
import { privateApi } from '@/utils/api'
import { NextResponse } from 'next/server'

export const GET = privateApi(async userId => {
  // Add the user id to the class
  const data = await getAllAspirations(userId)

  return NextResponse.json(data)
})
