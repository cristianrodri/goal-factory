import Goal from '@/lib/goal/model'
import { IGoal } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { NextResponse } from 'next/server'

export const PUT = privateApi<Omit<IGoal, 'user'>, { id: string }>(
  async (userId, { body, params }) => {
    const { bigGoal } = body

    if (bigGoal) {
      return NextResponse.json(
        { error: 'Big Goal cannot be updated' },
        { status: Status.BAD_REQUEST }
      )
    }

    const goal = await Goal.findOneAndUpdate(
      { user: userId, _id: params.id },
      body,
      { new: true }
    )

    return NextResponse.json(goal, {
      status: Status.CREATED
    })
  }
)
