import MotivationCalculation from '@/lib/motivation-calculation/model'
import { IMotivationCalculation } from '@/types'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

type RequestBody = Omit<IMotivationCalculation, 'user' | 'bigGoal'> & {
  bigGoal?: string
}

export const PUT = privateApi<RequestBody, { id: string }>(
  async (user, { params, body }) => {
    // Big Goal is not editable and must not be given by request body
    delete body?.bigGoal

    // Update the motivation calculation
    const motivationCalculation =
      await MotivationCalculation.findOneAndUpdateOrThrow(
        {
          _id: params.id,
          user
        },
        body
      )

    return successResponse(motivationCalculation)
  }
)
