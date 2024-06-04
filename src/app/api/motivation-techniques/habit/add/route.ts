import { verifyBigGoal } from '@/lib/big-goal/get'
import AutomaticHabit from '@/lib/motivation-techniques/automatic-habit/model'
import { IUtilHabit } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  utilHabit: IUtilHabit
  bigGoal: string
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  const { utilHabit, bigGoal } = body

  await verifyBigGoal(bigGoal, user)

  // Check if the habit already exists for the given bigGoal
  const existingHabit = await AutomaticHabit.findOne({
    user,
    bigGoal,
    'utilHabits.habit': utilHabit.habit
  })

  if (existingHabit) {
    return errorResponse(
      `${utilHabit.habit} already exists for this big goal`,
      Status.CONFLICT
    )
  }

  // Add the habit to the utils habits related to the bigGoal
  const automaticHabit = await AutomaticHabit.findOneAndUpdateOrThrow(
    { user, bigGoal },
    {
      $push: {
        utilHabits: utilHabit
      }
    }
  )

  return successResponse(automaticHabit, Status.CREATED)
})
