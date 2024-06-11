import OptimizedEnergy from '@/lib/motivation-techniques/optimized-energy/model'
import { IEnergyLevel } from '@/types'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
  energyLevel: Partial<IEnergyLevel>
}

export const PUT = privateApi<RequestBody, { id: string }>(
  async (user, { body, params }) => {
    const { bigGoal, energyLevel } = body

    const updateObj: { [key: string]: number | Date } = {}
    if (energyLevel?.time) {
      updateObj['energyLevels.$.time'] = energyLevel.time
    }
    if (energyLevel?.level) {
      updateObj['energyLevels.$.level'] = energyLevel.level
    }

    const optimizedEnergy = await OptimizedEnergy.findOneAndUpdateOrThrow(
      {
        user,
        bigGoal,
        'energyLevels._id': params.id
      },
      {
        $set: updateObj
      }
    )

    return successResponse(optimizedEnergy)
  }
)
