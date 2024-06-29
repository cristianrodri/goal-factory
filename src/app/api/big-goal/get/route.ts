import { getAllBigGoals } from '@/lib/big-goal/get'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const GET = privateApi(async user => {
  // Add the user id to the class
  const data = await getAllBigGoals(user)

  return successResponse(data)
})
