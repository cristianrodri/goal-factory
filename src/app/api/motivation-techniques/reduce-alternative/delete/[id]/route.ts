import ReduceAlternative from '@/lib/motivation-techniques/reduce-alternative/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params }) => {
    const reduceAlternative = await ReduceAlternative.findOneAndUpdateOrThrow(
      { user, burnedShips: { $elemMatch: { _id: params.id } } },
      {
        $pull: { burnedShips: { _id: params.id } }
      }
    )

    return successResponse(reduceAlternative)
  }
)
