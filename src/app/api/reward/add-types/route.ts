import Reward from '@/lib/reward/model'
import { privateApi } from '@/utils/api'
import { RewardType, Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

export const POST = privateApi(async user => {
  const checkUserRewardTypes = await Reward.find({ user })

  // If user already has reward types
  if (checkUserRewardTypes.length > 0) {
    return errorResponse('User already has reward types')
  }

  const newReward = new Reward(
    {
      type: RewardType.MEDIUM,
      rewards: [],
      user
    },
    {
      type: RewardType.SMALL,
      rewards: [],
      user
    }
  )

  await newReward.save()

  return successResponse(newReward, Status.CREATED)
})
