import { privateApi } from '@/utils/api'
import { NextResponse } from 'next/server'
import BigGoal from '@/lib/big-goal/model'

export const DELETE = privateApi<unknown, { id: string }>(
  async (userId, { params }) => {
    const data = await BigGoal.findOneAndDelete({
      user: userId,
      _id: params.id
    })

    return NextResponse.json(data)
  }
)
