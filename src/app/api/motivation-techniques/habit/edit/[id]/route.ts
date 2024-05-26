import { verifyBigGoal } from '@/lib/big-goal/get'
import AutomaticHabit from '@/lib/motivation-techniques/automatic-habit/model'
import { IUtilHabit } from '@/types'
import { privateApi } from '@/utils/api'
import { updateOptions } from '@/utils/db'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  utilHabit: IUtilHabit
  bigGoal: string
}

export const PUT = privateApi<RequestBody, { id: string }>(
  async (user, { body, params }) => {
    const { utilHabit, bigGoal } = body

    await verifyBigGoal(bigGoal, user)

    const { habit, impact } = utilHabit

    // Check if the edited habit already exists for the given bigGoal
    const automaticHabit = await AutomaticHabit.findOne({
      user,
      bigGoal,
      'utilHabits.habit': habit
    })

    // Find the utilHabit with the same habit description
    const sameHabit = automaticHabit?.utilHabits.find(u => u.habit === habit)

    // If the edited habit already exists and the params id is different, return an error because the user tries to repeat habits name
    if (sameHabit && sameHabit?._id.toString() !== params.id) {
      return errorResponse(
        `${habit} already exists for this big goal`,
        Status.CONFLICT
      )
    }

    // Update the existing utilHabit
    const updatedHabit = await AutomaticHabit.findOneAndUpdate(
      {
        user,
        bigGoal,
        'utilHabits._id': params.id // Match the utilHabit by its _id
      },
      {
        $set: {
          'utilHabits.$.habit': habit, // Update the habit field
          'utilHabits.$.impact': impact // Update the impact field
        }
      },
      updateOptions
    )

    if (!updatedHabit) {
      return errorResponse('Automatic habit not found', Status.NOT_FOUND)
    }

    return successResponse(updatedHabit)
  }
)
