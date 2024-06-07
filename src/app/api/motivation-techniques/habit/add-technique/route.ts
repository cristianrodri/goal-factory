import { verifyBigGoal } from '@/lib/big-goal/get'
import { createGoalAutomaticHabit } from '@/lib/motivation-techniques/automatic-habit/create'
import { IAutomaticHabit } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

type RequestBody = Omit<IAutomaticHabit, 'bigGoal'> & {
  bigGoal: string
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  // Check if the big goal exists
  await verifyBigGoal(body.bigGoal, user)

  // Create the automatic habit
  const automaticHabit = await createGoalAutomaticHabit(user, body.bigGoal)

  return successResponse(automaticHabit, Status.CREATED)
})
