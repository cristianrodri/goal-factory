import { getAllBigGoals } from '@/lib/big-goal/get'
import { privateApi } from '@/utils/api'
import { NextResponse } from 'next/server'

export const GET = privateApi(async userId => {
  // Add the user id to the class
  const data = await getAllBigGoals(userId)

  return NextResponse.json(data)
})
