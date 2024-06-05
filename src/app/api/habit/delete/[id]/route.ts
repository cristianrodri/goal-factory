import Habit from '@/lib/habit/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params }) => {
    const habit = await Habit.findOneAndDeleteOrThrow({ _id: params.id, user })

    return successResponse(habit)
  }
)
