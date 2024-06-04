import ContaminateTemptation from '@/lib/motivation-techniques/contaminate-temptation/model'
import { ITemptation } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  temptation: ITemptation
  bigGoal: string
}

export const PUT = privateApi<RequestBody, { id: string }>(
  async (user, { body, params }) => {
    const { temptation, bigGoal } = body
    const { temptation: temptationDescription } = temptation

    // Check if the edited habit already exists for the given bigGoal
    const contaminateTemptation = await ContaminateTemptation.findOne({
      user,
      bigGoal,
      'temptations.temptation': temptationDescription
    })

    // Find the temptation that matches with the given temptation
    const sameTemptation = contaminateTemptation?.temptations.find(
      t => t.temptation === temptationDescription
    )

    // If the edited habit already exists and the params id is different, return an error because the user tries to repeat habits name
    if (sameTemptation && sameTemptation?._id.toString() !== params.id) {
      return errorResponse(
        `${temptationDescription} temptation already exists for this big goal`,
        Status.CONFLICT
      )
    }

    // Update the existing contamination temptation
    const updatedContaminateTemptation =
      await ContaminateTemptation.findOneAndUpdateOrThrow(
        {
          user,
          bigGoal,
          'temptations._id': params.id // Match the temptations by its _id
        },
        {
          $set: {
            'temptations.$.temptation': temptationDescription, // Update the temptation field
            'temptations.$.catastrophe': temptation.catastrophe
          }
        }
      )

    return successResponse(updatedContaminateTemptation)
  }
)
