import BigGoal from '@/lib/big-goal/model'
import { IBigGoal } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { NextResponse } from 'next/server'

export const POST = privateApi<Omit<IBigGoal, 'user'>>(
  async (userId, { body }) => {
    const bigGoal = new BigGoal({
      ...body,
      reached: false,
      progress: 0,
      user: userId
    })

    const createdBigGoal = await bigGoal.save()

    return NextResponse.json(createdBigGoal, {
      status: Status.CREATED
    })
  }
)
