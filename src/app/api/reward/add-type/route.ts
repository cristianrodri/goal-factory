import Reward from '@/lib/reward/model'
import { privateApi } from '@/utils/api'
import { RewardType, Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

export const POST = privateApi(async user => {
  const rewardTypes = await Reward.insertMany([
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
  ])

  return successResponse(rewardTypes, Status.CREATED)
})
