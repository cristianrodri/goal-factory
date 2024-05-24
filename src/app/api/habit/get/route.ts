import Habit from '@/lib/habit/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const GET = privateApi(async user => {
  const habits = await Habit.find({ user })

  return successResponse(habits)
})
