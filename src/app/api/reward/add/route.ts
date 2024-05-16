import Reward from '@/lib/reward/model'
import { IRewardDescription } from '@/types'
import { privateApi } from '@/utils/api'
import { RewardType, Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RewardData {
  rewards: IRewardDescription[]
  type: RewardType
}

export const POST = privateApi<RewardData>(async (user, { body }) => {
  const { rewards, type } = body

  // Update the document in the database atomically
  const updatedRewardType = await Reward.findOneAndUpdate(
    { type, user },
    { $push: { rewards: { $each: rewards } } }, // Use $each to push multiple rewards
    { new: true } // Return the modified document
  )

  if (!updatedRewardType) {
    return errorResponse('Reward type not found', Status.NOT_FOUND)
  }

  return successResponse(updatedRewardType)
})
