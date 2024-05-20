import Reward from '@/lib/reward/model'
import { IRewardDescription } from '@/types'
import { privateApi } from '@/utils/api'
import { updateOptions } from '@/utils/db'
import { RewardType, Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RewardData {
  rewards: IRewardDescription[]
  type: RewardType
}

export const POST = privateApi<RewardData>(async (user, { body }) => {
  const { rewards, type } = body

  const typeRewards = await Reward.findOne({ type, user })

  // Check if the reward exists in the specified type
  if (typeRewards && typeRewards.rewards.length > 0) {
    const foundSameReward = typeRewards?.rewards.find(r =>
      rewards.some(reward => reward.description === r.description)
    )

    if (foundSameReward) {
      return errorResponse(
        `${foundSameReward.description} reward already exists in ${type} rewards.`,
        Status.BAD_REQUEST
      )
    }
  }

  // Update the document in the database atomically
  const updatedRewardType = await Reward.findOneAndUpdate(
    { type, user },
    { $addToSet: { rewards: { $each: rewards } } }, // Use $each to push multiple rewards
    { ...updateOptions }
  )

  if (!updatedRewardType) {
    return errorResponse('Reward type not found', Status.NOT_FOUND)
  }

  return successResponse(updatedRewardType)
})
