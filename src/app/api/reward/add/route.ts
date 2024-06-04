import Reward from '@/lib/reward/model'
import { privateApi } from '@/utils/api'
import { RewardType, Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RewardData {
  description: string
  type: RewardType
}

export const POST = privateApi<RewardData>(async (user, { body }) => {
  const { description, type } = body

  if (type !== RewardType.SMALL && type !== RewardType.MEDIUM) {
    return errorResponse('Invalid reward type', Status.BAD_REQUEST)
  }

  const userReward = await Reward.findOneOrThrow({ user })

  // Check if the reward exists in the specified type
  if (userReward[type].length > 0) {
    const foundSameReward = userReward[type].find(
      r => r.description === description
    )

    if (foundSameReward) {
      return errorResponse(
        `${foundSameReward.description} reward already exists in ${type} rewards.`,
        Status.BAD_REQUEST
      )
    }
  }

  // Update the document in the database atomically
  const updatedUserReward = await Reward.findOneAndUpdateOrThrow(
    { user },
    { $push: { [type]: { description } } } // Use $each to apush multiple rewards
  )

  return successResponse(updatedUserReward)
})
