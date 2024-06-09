import { verifyBigGoal } from '@/lib/big-goal/get'
import { createGoalOptimalAccountability } from '@/lib/motivation-techniques/optimal-accountability/create'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

type RequestBody = {
  bigGoal: string
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  await verifyBigGoal(body.bigGoal, user)

  const interruptionStimulus = await createGoalOptimalAccountability(
    user,
    body.bigGoal
  )

  return successResponse(interruptionStimulus, Status.CREATED)
})
