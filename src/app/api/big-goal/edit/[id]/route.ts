import BigGoal from '@/lib/big-goal/model'
import { IBigGoal } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { NextResponse } from 'next/server'

export const PUT = privateApi<Omit<IBigGoal, 'user'>, { id: string }>(
  async (userId, { body, params }) => {
    const bigGoal = await BigGoal.findOneAndUpdate(
      { user: userId, _id: params.id },
      {
        ...body,
        user: userId
      },
      { new: true }
    )

    return NextResponse.json(bigGoal, {
      status: Status.CREATED
    })
  }
)
