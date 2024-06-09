import InterruptionStimulus from '@/lib/motivation-techniques/interruption-stimulus/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params }) => {
    const interruptionStimulus =
      await InterruptionStimulus.findOneAndUpdateOrThrow(
        { user, 'externalReminders._id': params.id },
        {
          $pull: {
            externalReminders: { _id: params.id }
          }
        }
      )

    return successResponse(interruptionStimulus)
  }
)
