import ContaminateTemptation from '@/lib/motivation-techniques/contaminate-temptation/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const GET = privateApi(async (user, { req }) => {
  const url = new URL(req.url)
  const bigGoal = url.searchParams.get('bigGoal')

  // Find and update the document to remove the specific temptations
  const contaminateTemptation = await ContaminateTemptation.findOneOrThrow({
    user,
    bigGoal
  })

  return successResponse(contaminateTemptation)
})
