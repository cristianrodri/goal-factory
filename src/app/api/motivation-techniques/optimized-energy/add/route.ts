import OptimizedEnergy from '@/lib/motivation-techniques/optimized-energy/model'
import { IEnergyConclusion, IEnergyLevel } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
  energyLevel?: IEnergyLevel
  conclusion?: string
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  const { bigGoal, energyLevel, conclusion } = body

  const optimizedEnergy = await OptimizedEnergy.findOneOrThrow({
    user,
    bigGoal
  })

  if (energyLevel) {
    optimizedEnergy.energyLevels.push(energyLevel)
  }

  if (conclusion) {
    optimizedEnergy.conclusions.push({ conclusion } as IEnergyConclusion)
  }

  await optimizedEnergy.save()

  return successResponse(optimizedEnergy, Status.CREATED)
})
