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

  // Check if the given reward type is valid
  if (type !== RewardType.SMALL && type !== RewardType.MEDIUM) {
    return errorResponse('Invalid reward type', Status.BAD_REQUEST)
  }

  const userReward = await Reward.findOne({ user })

  if (!userReward) {
    return errorResponse('User reward not found', Status.NOT_FOUND)
  }

  const isSmallReward = userReward.small.some(
    r => r._id.toString() === rewardId
  )
  const isMediumReward = userReward.medium.some(
    r => r._id.toString() === rewardId
  )

  if (!isSmallReward && !isMediumReward) {
    return errorResponse('Reward not found', Status.NOT_FOUND)
  }

  // The reward type remains the same
  if (
    (isSmallReward && type === RewardType.SMALL) ||
    (isMediumReward && type === RewardType.MEDIUM)
  ) {
    // Check if the new description already exists in the rewards array
    const existedReward = userReward[type].find(
      reward =>
        reward.description === newDescription &&
        reward._id.toString() !== rewardId
    )

    if (existedReward) {
      return errorResponse(
        `${newDescription} already exists in ${type} rewards`,
        Status.BAD_REQUEST
      )
    }

    // Update the description of the reward
    userReward[type].map(reward => {
      if (reward._id.toString() === rewardId) {
        reward.description = newDescription
      }

      return reward
    })
  } else {
    // The reward type is changed

    const currentType =
      type === RewardType.SMALL ? RewardType.MEDIUM : RewardType.SMALL

    // Check if the new description already exists in the another rewards array
    const existedReward = userReward[type].find(
      reward => reward.description === newDescription
    )

    if (existedReward) {
      return errorResponse(
        `${newDescription} already exists in ${type} rewards`,
        Status.BAD_REQUEST
      )
    }

    // Remove the reward from the current reward type
    const filteredNewtypeRewards = userReward[currentType].filter(
      reward => reward._id.toString() !== rewardId
    )

    userReward[currentType] = filteredNewtypeRewards

    // Add the reward to the another reward type
    userReward[type].push({
      description: newDescription
    } as unknown as IRewardDescription)
  }

  await userReward.save()

  return successResponse(userReward)
})
