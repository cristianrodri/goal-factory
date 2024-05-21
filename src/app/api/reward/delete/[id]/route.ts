import Reward from '@/lib/reward/model'
import { privateApi } from '@/utils/api'
import { updateOptions } from '@/utils/db'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params }) => {
    const { id } = params

    const updatedRewardType = await Reward.findOneAndUpdate(
      {
        user,
        $or: [{ 'small._id': id }, { 'medium._id': id }]
      },
      { $pull: { small: { _id: id }, medium: { _id: id } } },
      updateOptions
    )

    if (!updatedRewardType) {
      return errorResponse('Reward not found', Status.NOT_FOUND)
    }

    return successResponse(updatedRewardType)
  }
)
