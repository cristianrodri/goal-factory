import OptimizedEnergy from '@/lib/motivation-techniques/optimized-energy/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'
import { getParam } from '@/utils/url'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params, req }) => {
    // Property must be 'energyLevels' or 'conclusions'
    const property = getParam(req, 'property') as string

    // Delete energy level by id
    const optimizedEnergy = await OptimizedEnergy.findOneAndUpdateOrThrow(
      { user, [`${property}._id`]: params.id },
      {
        $pull: { [property]: { _id: params.id } }
      }
    )

    return successResponse(optimizedEnergy)
  }
)
