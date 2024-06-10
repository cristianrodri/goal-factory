import { verifyBigGoal } from '@/lib/big-goal/get'
import { createGoalOptimisticLevel } from '@/lib/motivation-techniques/optimistic-level/create'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  await verifyBigGoal(body.bigGoal, user)

  const optimisticLevel = await createGoalOptimisticLevel(user, body.bigGoal)

  return successResponse(optimisticLevel, Status.CREATED)
})
