import Habit from '@/lib/habit/model'
import { IHabit } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

export const POST = privateApi<IHabit>(async (user, { body }) => {
  const habit = await Habit.create({ ...body, user })

  return successResponse(habit, Status.CREATED)
})
