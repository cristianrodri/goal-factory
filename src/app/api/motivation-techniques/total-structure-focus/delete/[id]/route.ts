import TotalStructureFocus from '@/lib/motivation-techniques/total-structure-focus/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params }) => {
    const totalStructureFocus =
      await TotalStructureFocus.findOneAndUpdateOrThrow(
        { user, focusIdeas: { $elemMatch: { _id: params.id } } },
        {
          $pull: {
            focusIdeas: {
              _id: params.id
            }
          }
        }
      )

    return successResponse(totalStructureFocus)
  }
)
