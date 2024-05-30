import MotivationCalculation from '@/lib/motivation-calculation/model'
import { IMotivationCalculation } from '@/types'
import { privateApi } from '@/utils/api'
import { updateOptions } from '@/utils/db'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

type RequestBody = Omit<IMotivationCalculation, 'user' | 'bigGoal'> & {
  bigGoal?: string
}

export const PUT = privateApi<RequestBody, { id: string }>(
  async (user, { params, body }) => {
    // Big Goal is not editable and must not be given by request body
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
