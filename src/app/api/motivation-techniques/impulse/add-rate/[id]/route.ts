import Impulse from '@/lib/motivation-techniques/impulse/model'
import { ImpulseRate } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

type RequestBody = ImpulseRate

export const POST = privateApi<RequestBody, { id: string }>(
  async (user, { body, params }) => {
    const impulse = await Impulse.findOneAndUpdateOrThrow(
      { user, _id: params.id },
      {
        $push: {
          rates: body
        }
      }
    )

    return successResponse(impulse, Status.CREATED)
  }
)
