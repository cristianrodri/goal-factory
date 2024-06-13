import OptimizedEnergy from '@/lib/motivation-techniques/optimized-energy/model'
import { privateApi } from '@/utils/api'
import { Param } from '@/utils/enums'
import { successResponse } from '@/utils/response'
import { getParam } from '@/utils/url'

export const GET = privateApi(async (user, { req }) => {
  const bigGoal = getParam(req, Param.BIG_GOAL)

  const optimizedEnergy = await OptimizedEnergy.findOneOrThrow({
    user,
    bigGoal
  })

  return successResponse(optimizedEnergy)
})
