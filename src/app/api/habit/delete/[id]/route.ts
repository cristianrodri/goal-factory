import Habit from '@/lib/habit/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params }) => {
    const habit = await Habit.findOneAndDelete({ _id: params.id, user })

    if (!habit) {
      return errorResponse('Habit not found', Status.NOT_FOUND)
    }

    return successResponse(habit)
  }
)
