import Aspiration from '@/lib/aspiration/model'
import Goal from '@/lib/goal/model'
import { IGoal } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { NextResponse } from 'next/server'

export const POST = privateApi<Omit<IGoal[], 'user'>>(
  async (userId, { body }) => {
    const areGoalsSharingSameAspiration = body.every(
      goal => goal.aspiration === body[0].aspiration
    )

    if (!areGoalsSharingSameAspiration) {
      return NextResponse.json(
        {
          message: 'All goals must share the same aspiration'
        },
        {
          status: Status.BAD_REQUEST
        }
      )
    }

    // Check if the given aspiration exists and belongs to the user
    const aspirationExists = await Aspiration.exists({
      _id: body[0].aspiration,
      user: userId
    })

    if (!aspirationExists) {
      return NextResponse.json(
        {
          message: 'Aspiration does not exist or does not belong to the user'
        },
        {
          status: Status.BAD_REQUEST
        }
      )
    }

    // Add the user id to each goal
    const newGoals = body.map(goal => ({ ...goal, user: userId }))

    const goal = new Goal(newGoals)

    const createdGoals = await goal.save()

    return NextResponse.json(createdGoals, {
      status: Status.CREATED
    })
  }
)
