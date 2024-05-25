import { verifyBigGoal } from '@/lib/big-goal/get'
import AutomaticHabit from '@/lib/motivation-techniques/automatic-habit/model'
import { IAutomaticHabit } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

export const POST = privateApi<IAutomaticHabit>(async (user, { body }) => {
  // Check if the big goal exists
  await verifyBigGoal(body.bigGoal, user)

  // Create the automatic habit
  const automaticHabit = await AutomaticHabit.create({
    utilHabits: [],
    bigGoal: body.bigGoal,
    user
  })

  return successResponse(automaticHabit, Status.CREATED)
})
