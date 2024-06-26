import BigGoal from '@/lib/big-goal/model'
import { IBigGoal } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

export const PUT = privateApi<Omit<IBigGoal, 'user'>, { id: string }>(
  async (userId, { body, params }) => {
    const {
      activityAnalysis,
      moderatingFactors,
      moderationFactorAlternatives,
      mediatingFactors,
      futureGoals
    } = body

    if (
      activityAnalysis ||
      moderatingFactors ||
      moderationFactorAlternatives ||
      mediatingFactors ||
      futureGoals
    ) {
      return errorResponse(
        'Cannot edit array fields directly.',
        Status.FORBIDDEN
      )
    }

    const bigGoal = await BigGoal.findOneAndUpdateOrThrow(
      { user: userId, _id: params.id },
      {
        $set: body
      }
    )

    return successResponse(bigGoal)
  }
)
