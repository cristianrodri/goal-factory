import OptimizedEnergy from '@/lib/motivation-techniques/optimized-energy/model'
import { IEnergyLevel } from '@/types'
import { privateApi } from '@/utils/api'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
  energyLevel?: Partial<IEnergyLevel>
  editedConclusion?: string
}

export const PUT = privateApi<RequestBody, { id: string }>(
  async (user, { body, params }) => {
    const { bigGoal, energyLevel, editedConclusion } = body

    if (!energyLevel && !editedConclusion) {
      return errorResponse('Energy level or conclusion is required')
    }

    if (energyLevel && editedConclusion) {
      return errorResponse(
        'Energy level and conclusion cannot be edited at the same time'
      )
    }

    const updateObj: { [key: string]: number | Date | string } = {}
    if (energyLevel?.time) {
      updateObj['energyLevels.$.time'] = energyLevel.time
    }
    if (energyLevel?.level) {
      updateObj['energyLevels.$.level'] = energyLevel.level
    }

    if (editedConclusion) {
      updateObj['conclusions.$.conclusion'] = editedConclusion
    }

    const filteredProperty = energyLevel
      ? 'energyLevels._id'
      : 'conclusions._id'

    const optimizedEnergy = await OptimizedEnergy.findOneAndUpdateOrThrow(
      {
        user,
        bigGoal,
        [filteredProperty]: params.id
      },
      {
        $set: updateObj
      }
    )

    return successResponse(optimizedEnergy)
  }
)
