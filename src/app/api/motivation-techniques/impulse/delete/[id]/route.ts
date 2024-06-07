import Impulse from '@/lib/motivation-techniques/impulse/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params }) => {
    const impulse = await Impulse.findOneAndDeleteOrThrow({
      user,
      _id: params.id
    })

    return successResponse(impulse)
  }
)
