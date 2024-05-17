import Reward from '@/lib/reward/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params }) => {
    const deletedReward = await Reward.findOneAndDelete({
      'rewards._id': params.id,
      user
    })

    if (!deletedReward) {
      return errorResponse('Reward not found', Status.NOT_FOUND)
    }

    return successResponse(deletedReward)
  }
)
