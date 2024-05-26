import AutomaticHabit from '@/lib/motivation-techniques/automatic-habit/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

export const GET = privateApi(async (user, { req }) => {
  const url = new URL(req.url)
  const bigGoal = url.searchParams.get('bigGoal')

  // Find and update the document to remove the specific utilHabit
  const automaticHabit = await AutomaticHabit.findOne({
    user,
    bigGoal
  })

  if (!automaticHabit) {
    return errorResponse('Automatic habit not found', Status.NOT_FOUND)
  }

  return successResponse(automaticHabit)
})
