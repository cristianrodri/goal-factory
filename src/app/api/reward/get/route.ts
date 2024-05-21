import Reward from '@/lib/reward/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

export const GET = privateApi(async user => {
  const userReward = await Reward.findOne({ user })

  if (!userReward) {
    return errorResponse('Reward not found', Status.NOT_FOUND)
  }

  return successResponse(userReward)
})
