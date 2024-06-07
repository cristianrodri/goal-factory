import Impulse from '@/lib/motivation-techniques/impulse/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

interface RequestBody {
  isShown: boolean
}

export const PUT = privateApi<RequestBody, { id: string }>(
  async (user, { body, params }) => {
    const impulse = await Impulse.findOneAndUpdateOrThrow(
      { user, _id: params.id },
      { isShown: body.isShown }
    )

    return successResponse(impulse)
  }
)
