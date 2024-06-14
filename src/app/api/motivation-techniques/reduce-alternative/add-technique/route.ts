import { verifyBigGoal } from '@/lib/big-goal/get'
import { createGoalReduceAlternative } from '@/lib/motivation-techniques/reduce-alternative/create'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  const { bigGoal } = body

  await verifyBigGoal(bigGoal, user)

  const reduceAlternative = await createGoalReduceAlternative(user, bigGoal)

  return successResponse(reduceAlternative, Status.CREATED)
})
