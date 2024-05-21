import Reward from '@/lib/reward/model'
import { IReward } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

export const POST = privateApi(async user => {
  const userReward = new Reward<IReward>({
    small: [],
    medium: [],
    user
  })

  await userReward.save()

  return successResponse(userReward, Status.CREATED)
})
