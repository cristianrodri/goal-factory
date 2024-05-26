import { verifyBigGoal } from '@/lib/big-goal/get'
import AutomaticHabit from '@/lib/motivation-techniques/automatic-habit/model'
import { privateApi } from '@/utils/api'
import { updateOptions } from '@/utils/db'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params, req }) => {
    const url = new URL(req.url)
    const bigGoal = url.searchParams.get('bigGoal')

    if (!bigGoal) {
      return errorResponse('Big goal is required', Status.BAD_REQUEST)
    }

    await verifyBigGoal(bigGoal, user)

    // Find and update the document to remove the specific utilHabit
    const updatedHabit = await AutomaticHabit.findOneAndUpdate(
      {
        user,
        bigGoal
      },
      {
        $pull: {
          utilHabits: { _id: params.id } // Remove the utilHabit by its _id
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
