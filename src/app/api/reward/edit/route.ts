import Reward from '@/lib/reward/model'
import { IRewardDescription } from '@/types'
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

  const typeRewards = await Reward.find({ user })
  const foundRewardType = typeRewards.find(rewardType =>
    rewardType.rewards.some(reward => reward._id.toString() === rewardId)
  )

  if (!foundRewardType) {
    return errorResponse('Reward not found', Status.NOT_FOUND)
  }

  if (type !== RewardType.SMALL && type !== RewardType.MEDIUM) {
    return errorResponse('Invalid reward type', Status.BAD_REQUEST)
  }

  // Check if the updated reward hasn't changed the type by verifying the new type with the current type
  if (foundRewardType && foundRewardType.type === type) {
    // Check if the new description already exists in the rewards array
    const existedReward = foundRewardType.rewards.find(
      reward =>
        reward.description === newDescription &&
        reward._id.toString() !== rewardId
    )

    if (existedReward) {
      return errorResponse(
        `${newDescription} already exists in ${foundRewardType.type} rewards`,
        Status.BAD_REQUEST
      )
    }

    // Update the description of the reward
    foundRewardType.rewards.map(reward => {
      if (reward._id.toString() === rewardId) {
        reward.description = newDescription
      }

      return reward
    })

    await foundRewardType.save()

    return successResponse(foundRewardType)
  }

  // Remove the reward from the current reward type and add it to the new reward type
  const anotherRewardType = typeRewards.find(
    rewardType => rewardType.type === type
  )

  if (anotherRewardType) {
    const existedReward = anotherRewardType.rewards.find(
      reward => reward.description === newDescription
    )

    if (existedReward) {
      return errorResponse(
        `${newDescription} already exists in ${anotherRewardType.type} rewards`,
        Status.BAD_REQUEST
      )
    }

    // Remove the reward from the current reward type
    const filteredNewtypeRewards = foundRewardType.rewards.filter(
      reward => reward._id.toString() !== rewardId
    )

    foundRewardType.rewards = filteredNewtypeRewards

    anotherRewardType.rewards.push({
      description: newDescription
    } as unknown as IRewardDescription)

    await foundRewardType.save()
    await anotherRewardType.save()
  }

  return successResponse(typeRewards)
})
