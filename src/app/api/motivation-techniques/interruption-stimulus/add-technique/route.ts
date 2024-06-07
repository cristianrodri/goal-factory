import { verifyBigGoal } from '@/lib/big-goal/get'
import { createGoalInterruptionStimulus } from '@/lib/motivation-techniques/interruption-stimulus/create'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

type RequestBody = {
  bigGoal: string
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  await verifyBigGoal(body.bigGoal, user)

  const interruptionStimulus = await createGoalInterruptionStimulus(
    user,
    body.bigGoal
  )

  return successResponse(interruptionStimulus)
})
