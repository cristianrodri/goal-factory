import { privateApi } from '@/utils/api'
import BigGoal from '@/lib/big-goal/model'
import { successResponse } from '@/utils/response'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params }) => {
    const data = await BigGoal.findOneAndDelete({
      user,
      _id: params.id
    })

    return successResponse(data)
  }
)
