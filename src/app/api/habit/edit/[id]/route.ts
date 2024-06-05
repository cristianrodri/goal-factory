import Habit from '@/lib/habit/model'
import { IHabit } from '@/types'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const PUT = privateApi<IHabit, { id: string }>(
  async (user, { body, params }) => {
    const habit = await Habit.findOneAndUpdateOrThrow(
      { _id: params.id, user },
      body
    )

    return successResponse(habit)
  }
)
