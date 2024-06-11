import OptimizedEnergy from '@/lib/motivation-techniques/optimized-energy/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params }) => {
    // Delete energy level by id
    const optimizedEnergy = await OptimizedEnergy.findOneAndUpdateOrThrow(
      { user, 'energyLevels._id': params.id },
      {
        $pull: { energyLevels: { _id: params.id } }
      }
    )

    return successResponse(optimizedEnergy)
  }
)
