import OptimizedEnergy from '@/lib/motivation-techniques/optimized-energy/model'
import { IEnergyLevel } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
  energyLevel: IEnergyLevel
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  const { bigGoal, energyLevel } = body

  const optimizedEnergy = await OptimizedEnergy.findOneOrThrow({
    user,
    bigGoal
  })

  optimizedEnergy.energyLevels.push(energyLevel)

  await optimizedEnergy.save()

  return successResponse(optimizedEnergy, Status.CREATED)
})
