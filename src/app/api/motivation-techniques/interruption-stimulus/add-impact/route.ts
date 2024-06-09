import InterruptionStimulus from '@/lib/motivation-techniques/interruption-stimulus/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
  reminderId: string
  impact: number
  date?: string
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  const { bigGoal, reminderId, impact, date } = body

  // Add the impact to the interruption stimulus
  const interruptionStimulus =
    await InterruptionStimulus.findOneAndUpdateOrThrow(
      { user, bigGoal, 'externalReminders._id': reminderId },
      {
        $push: {
          'externalReminders.$.impacts': {
            impact,
            date: date || new Date().toISOString()
          }
        }
      }
    )

  return successResponse(interruptionStimulus, Status.CREATED)
})
