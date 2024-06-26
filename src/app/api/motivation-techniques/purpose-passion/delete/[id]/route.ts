import PurposePassion from '@/lib/motivation-techniques/purpose-passion/model'
import { privateApi } from '@/utils/api'
import { Param } from '@/utils/enums'
import { successResponse } from '@/utils/response'
import { getParam } from '@/utils/url'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params, req }) => {
    const bigGoal = getParam(req, Param.BIG_GOAL)

    const purposePassion = await PurposePassion.findOneAndUpdateOrThrow(
      { user, bigGoal },
      {
        $pull: {
          dailyActivities: {
            _id: params.id
          }
        }
      }
    )

    return successResponse(purposePassion)
  }
)
