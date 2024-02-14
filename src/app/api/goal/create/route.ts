import Aspiration from '@/lib/aspiration/model'
import Goal from '@/lib/goal/model'
import { IGoal } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { NextResponse } from 'next/server'

export const POST = privateApi<Omit<IGoal, 'user'>>(
  async (userId, { body }) => {
    // Check if the given aspiration exists and belongs to the user
    const aspirationExists = await Aspiration.exists({
      _id: body.aspiration,
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

    const goal = new Goal({ ...body, user: userId })

    const createdGoal = await goal.save()

    return NextResponse.json(createdGoal, {
      status: Status.CREATED
    })
  }
)
