import ContaminateTemptation from '@/lib/motivation-techniques/contaminate-temptation/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params, req }) => {
    const url = new URL(req.url)
    const bigGoal = url.searchParams.get('bigGoal')

    if (!bigGoal) {
      return errorResponse('Big goal is required', Status.BAD_REQUEST)
    }

    // Find and update the document to remove the specific temptation
    const deletedTemptation =
      await ContaminateTemptation.findOneAndUpdateOrThrow(
        {
          user,
          bigGoal,
          'temptations._id': params.id // Match the temptation by its _id
        },
        {
          $pull: {
            temptations: { _id: params.id } // Remove the utilHabit by its _id
          }
        }
      )

    return successResponse(deletedTemptation)
  }
)
