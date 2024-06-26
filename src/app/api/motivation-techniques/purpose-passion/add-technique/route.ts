import { verifyBigGoal } from '@/lib/big-goal/get'
import { createGoalPurposePassion } from '@/lib/motivation-techniques/purpose-passion/create'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  const { bigGoal } = body

  await verifyBigGoal(bigGoal, user)

  const purposePassion = await createGoalPurposePassion(user, bigGoal)

  return successResponse(purposePassion, Status.CREATED)
})
