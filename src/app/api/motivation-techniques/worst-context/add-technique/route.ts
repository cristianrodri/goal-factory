import { verifyBigGoal } from '@/lib/big-goal/get'
import { createGoalWorstContext } from '@/lib/motivation-techniques/worst-context/create'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  const { bigGoal } = body

  await verifyBigGoal(bigGoal, user)

  const worstContext = await createGoalWorstContext(user, bigGoal)

  return successResponse(worstContext, Status.CREATED)
})
