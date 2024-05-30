import Reward from '@/lib/reward/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

export const POST = privateApi(async user => {
  const userReward = await Reward.create({
    small: [],
    medium: [],
    user
  })

  return successResponse(userReward, Status.CREATED)
})
