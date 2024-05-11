import BigGoal from '@/lib/big-goal/model'
import Goal from '@/lib/goal/model'
import { IGoal } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { NextResponse } from 'next/server'

export const POST = privateApi<Omit<IGoal, 'user'>>(
  async (userId, { body }) => {
    // Check if the given big goal exists and belongs to the user
    const bigGoalExists = await BigGoal.exists({
      _id: body.bigGoal,
      user: userId
    })

    if (!bigGoalExists) {
      return NextResponse.json(
        {
          message: 'Big goal does not exist or does not belong to the user'
        },
        {
          status: Status.BAD_REQUEST
        }
      )
    }

    const goal = new Goal({ ...body, user: userId })

    const createdGoal = await goal.save()

    return NextResponse.json(createdGoal, {
      status: Status.CREATED
    })
  }
)
