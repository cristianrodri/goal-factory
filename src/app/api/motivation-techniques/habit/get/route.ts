import AutomaticHabit from '@/lib/motivation-techniques/automatic-habit/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const GET = privateApi(async (user, { req }) => {
  const url = new URL(req.url)
  const bigGoal = url.searchParams.get('bigGoal')

  // Find and update the document to remove the specific utilHabit
  const automaticHabit = await AutomaticHabit.findOneOrThrow({
    user,
    bigGoal
  })

  return successResponse(automaticHabit)
})
