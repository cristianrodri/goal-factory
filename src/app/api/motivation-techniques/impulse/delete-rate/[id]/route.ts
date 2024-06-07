import { getRate } from '@/lib/motivation-techniques/impulse/getRate'
import Impulse from '@/lib/motivation-techniques/impulse/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params, req }) => {
    const rateId = getRate(req)

    const impulse = await Impulse.findOneAndUpdateOrThrow(
      { user, _id: params.id },
      {
        $pull: {
          rates: { _id: rateId }
        }
      }
    )

    return successResponse(impulse)
  }
)
