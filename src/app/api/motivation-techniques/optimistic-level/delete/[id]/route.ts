import OptimisticLevel from '@/lib/motivation-techniques/optimistic-level/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params }) => {
    const optimisticLevel = await OptimisticLevel.findOneAndUpdateOrThrow(
      { user, 'improvements._id': params.id },
      {
        $pull: {
          improvements: {
            _id: params.id
          }
        }
      }
    )

    return successResponse(optimisticLevel)
  }
)
