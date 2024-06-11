import { verifyBigGoal } from '@/lib/big-goal/get'
import { createGoalPreCommitment } from '@/lib/motivation-techniques/pre-commitment/create'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  await verifyBigGoal(body.bigGoal, user)

  const preCommitment = await createGoalPreCommitment(user, body.bigGoal)

  return successResponse(preCommitment, Status.CREATED)
})
