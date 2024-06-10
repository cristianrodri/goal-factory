import OptimisticLevel from '@/lib/motivation-techniques/optimistic-level/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'
import { getParam } from '@/utils/url'

export const GET = privateApi(async (user, { req }) => {
  const bigGoal = getParam(req, 'bigGoal')

  const optimisticLevel = await OptimisticLevel.findOneOrThrow({
    user,
    bigGoal
  })

  return successResponse(optimisticLevel)
})
