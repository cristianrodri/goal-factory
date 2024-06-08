import InterruptionStimulus from '@/lib/motivation-techniques/interruption-stimulus/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
  editedReminder: string
}

export const PUT = privateApi<RequestBody, { id: string }>(
  async (user, { body, params }) => {
    const { bigGoal, editedReminder } = body

    // Update the interruption stimulus
    const interruptionStimulus =
      await InterruptionStimulus.findOneAndUpdateOrThrow(
        { user, bigGoal, 'externalReminders._id': params.id },
        {
          $set: { 'externalReminders.$.reminder': editedReminder }
        }
      )

    return successResponse(interruptionStimulus)
  }
)
