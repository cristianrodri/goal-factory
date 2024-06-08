import InterruptionStimulus from '@/lib/motivation-techniques/interruption-stimulus/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const GET = privateApi(async (user, { req }) => {
  const url = new URL(req.url)
  const bigGoal = url.searchParams.get('bigGoal')

  const interruptionStimulus = await InterruptionStimulus.findOneOrThrow({
    user,
    bigGoal
  })

  return successResponse(interruptionStimulus)
})
