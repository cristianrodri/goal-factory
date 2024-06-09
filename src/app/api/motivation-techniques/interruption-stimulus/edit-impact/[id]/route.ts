import InterruptionStimulus from '@/lib/motivation-techniques/interruption-stimulus/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
  reminderId: string
  impact: number
  date?: string
}

interface UpdateFields {
  [key: string]: number | string // You can replace with a more specific type if possible
}

export const PUT = privateApi<RequestBody, { id: string }>(
  async (user, { body, params }) => {
    const { bigGoal, reminderId, impact, date } = body

    // Edit the impact of the interruption stimulus
    const updateFields: UpdateFields = {
      'externalReminders.$[reminder].impacts.$[impact].impact': impact
    }

    if (date) {
      updateFields['externalReminders.$[reminder].impacts.$[impact].date'] =
        date
    }

    const interruptionStimulus =
      await InterruptionStimulus.findOneAndUpdateOrThrow(
        {
          user,
          bigGoal,
          'externalReminders._id': reminderId,
          'externalReminders.impacts._id': params.id
        },
        {
          $set: updateFields
        },
        {
          arrayFilters: [
            { 'reminder._id': reminderId },
            { 'impact._id': params.id }
          ]
        }
      )

    return successResponse(interruptionStimulus)
  }
)
