import WorstContext from '@/lib/motivation-techniques/worst-context/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params }) => {
    const worstContext = await WorstContext.findOneAndUpdateOrThrow(
      { user, contingencies: { $elemMatch: { _id: params.id } } },
      { $pull: { contingencies: { _id: params.id } } }
    )

    return successResponse(worstContext)
  }
)
