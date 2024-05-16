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

  const reward = await Reward.findOne({ type, user })

  if (!reward) {
    return errorResponse('Reward type not found', Status.NOT_FOUND)
  }

  reward.rewards.push(...rewards)

  await reward.save()

  return successResponse(reward)
})
