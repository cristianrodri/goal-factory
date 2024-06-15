import VisualProspective from '@/lib/motivation-techniques/visual-prospective/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params }) => {
    // Delete the idea
    const visualProspective = await VisualProspective.findOneAndUpdateOrThrow(
      { user, 'timeReduceIdeas._id': params.id },
      { $pull: { timeReduceIdeas: { _id: params.id } } }
    )

    return successResponse(visualProspective)
  }
)
