import { getBigGoal } from '@/lib/big-goal/get'
import { privateApi } from '@/utils/api'
import { NextResponse } from 'next/server'

export const GET = privateApi<unknown, { id: string }>(
  async (userId, { params }) => {
    // Add the user id to the class
    const data = await getBigGoal(params.id, userId)

    return NextResponse.json(data)
  }
)
