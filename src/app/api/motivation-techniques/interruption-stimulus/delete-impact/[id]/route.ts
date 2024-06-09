import InterruptionStimulus from '@/lib/motivation-techniques/interruption-stimulus/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params }) => {
    // Delete the impact from the interruption stimulus
    const interruptionStimulus =
      await InterruptionStimulus.findOneAndUpdateOrThrow(
        { user, 'externalReminders.impacts._id': params.id },
        {
          $pull: {
            'externalReminders.$.impacts': { _id: params.id }
          }
        }
      )

    return successResponse(interruptionStimulus)
  }
)
