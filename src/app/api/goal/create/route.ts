import Goal from '@/lib/goal/model'
import { IAspiration } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { NextResponse } from 'next/server'

export const POST = privateApi<Omit<IAspiration, 'user'>>(
  async (userId, { body }) => {
    const goal = new Goal({
      ...body,
      weeklyProgress: 0,
      user: userId
    })

    const createdGoal = await goal.save()

    return NextResponse.json(createdGoal, {
      status: Status.CREATED
    })
  }
)
