import { getRate } from '@/lib/motivation-techniques/impulse/getRate'
import Impulse from '@/lib/motivation-techniques/impulse/model'
import { ImpulseRate } from '@/types'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

type RequestBody = ImpulseRate

export const PUT = privateApi<RequestBody, { id: string }>(
  async (user, { body, params, req }) => {
    const rateId = getRate(req)

    // Update only the fields that are present in the request body
    const updateFields = Object.fromEntries(
      Object.entries(body).map(([key, value]) => [`rates.$.${key}`, value])
    )

    const impulse = await Impulse.findOneAndUpdateOrThrow(
      { user, _id: params.id, 'rates._id': rateId },
      { $set: updateFields }
    )

    return successResponse(impulse)
  }
)
