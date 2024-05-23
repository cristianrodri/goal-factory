import MotivationCalculation from '@/lib/motivation-calculation/model'
import { IMotivationCalculation } from '@/types'
import { privateApi } from '@/utils/api'
import { updateOptions } from '@/utils/db'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

export const PUT = privateApi<IMotivationCalculation, { id: string }>(
  async (user, { params, body }) => {
    // Big Goal is not editable
    delete body?.bigGoal

    // Update the motivation calculation
    const motivationCalculation = await MotivationCalculation.findOneAndUpdate(
      {
        _id: params.id,
        user
      },
      body,
      updateOptions
    )

    if (!motivationCalculation) {
      return errorResponse('Motivation Calculation not found', Status.NOT_FOUND)
    }

    return successResponse(motivationCalculation)
  }
)
