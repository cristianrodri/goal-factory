import Reward from '@/lib/reward/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const GET = privateApi(async user => {
  const userReward = await Reward.findOneOrThrow({ user })

  return successResponse(userReward)
})
