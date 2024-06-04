import Reward from '@/lib/reward/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params }) => {
    const { id } = params

    const updatedRewardType = await Reward.findOneAndUpdateOrThrow(
      {
        user,
        $or: [{ 'small._id': id }, { 'medium._id': id }]
      },
      { $pull: { small: { _id: id }, medium: { _id: id } } }
    )

    return successResponse(updatedRewardType)
  }
)
