import Habit from '@/lib/habit/model'
import { IHabit } from '@/types'
import { privateApi } from '@/utils/api'
import { updateOptions } from '@/utils/db'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

export const PUT = privateApi<IHabit, { id: string }>(
  async (user, { body, params }) => {
    const habit = await Habit.findOneAndUpdate(
      { _id: params.id, user },
      body,
      updateOptions
    )

    if (!habit) {
      return errorResponse('Habit not found', Status.NOT_FOUND)
    }

    return successResponse(habit)
  }
)
