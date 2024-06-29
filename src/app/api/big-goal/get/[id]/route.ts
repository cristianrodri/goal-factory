import { getBigGoal } from '@/lib/big-goal/get'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const GET = privateApi<unknown, { id: string }>(
  async (user, { params }) => {
    // Add the user id to the class
    const data = await getBigGoal(params.id, user)

    return successResponse(data)
  }
)
