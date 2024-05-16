import Reward from '@/lib/reward/model'
import { privateApi } from '@/utils/api'
import { RewardType, Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RewardData {
  newDescription: string
  rewardId: string
  type: RewardType
}

export const PUT = privateApi<RewardData>(async (user, { body }) => {
  const { newDescription, rewardId, type } = body

  // Update the reward within the rewards array
  const updatedRewardType = await Reward.findOneAndUpdate(
    { type, user, 'rewards._id': rewardId }, // Find the document with the matching reward ID
    { $set: { 'rewards.$.description': newDescription } }, // Update the description of the matched reward
    { new: true } // Return the modified document
  )

  if (!updatedRewardType) {
    return errorResponse('Reward not found', Status.NOT_FOUND)
  }

  return successResponse(updatedRewardType)
})
