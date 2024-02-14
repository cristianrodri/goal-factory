import Activity from '@/lib/activity/model'
import Goal from '@/lib/goal/model'
import { IGoal } from '@/types'
import { privateApi } from '@/utils/api'
import { NextResponse } from 'next/server'

export const DELETE = privateApi<unknown, { id: string }>(
  async (userId, { params }) => {
    const data = await Goal.findOne({
      user: userId,
      _id: params.id
    }).populate<{ innerGoals: IGoal[] }>('innerGoals')

    // If the goal has no inner goals, delete the associated activities
    if (data?.innerGoals.length === 0) {
      await Activity.deleteMany({ goal: data?._id, user: userId })
    }

    // Delete the goal
    await data?.deleteOne()

    return NextResponse.json(data)
  }
)
