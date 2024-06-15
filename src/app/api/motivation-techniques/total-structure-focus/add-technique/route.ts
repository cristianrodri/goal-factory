import { verifyBigGoal } from '@/lib/big-goal/get'
import { createGoalTotalStructureFocus } from '@/lib/motivation-techniques/total-structure-focus/create'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  const { bigGoal } = body

  await verifyBigGoal(bigGoal, user)

  // Create total structure focus
  const totalStructureFocus = await createGoalTotalStructureFocus(user, bigGoal)

  return successResponse(totalStructureFocus, Status.CREATED)
})
