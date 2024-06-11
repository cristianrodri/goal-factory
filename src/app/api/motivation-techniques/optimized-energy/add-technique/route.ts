import { verifyBigGoal } from '@/lib/big-goal/get'
import { createGoalOptimizedEnergy } from '@/lib/motivation-techniques/optimized-energy/create'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  await verifyBigGoal(body.bigGoal, user)

  const optimizedEnergy = await createGoalOptimizedEnergy(user, body.bigGoal)

  return successResponse(optimizedEnergy, Status.CREATED)
})
