import InterruptionStimulus from '@/lib/motivation-techniques/interruption-stimulus/model'
import { ExternalReminder } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
  externalReminder: ExternalReminder
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  const { bigGoal, externalReminder } = body

  const interruptionStimulus =
    await InterruptionStimulus.findOneAndUpdateOrThrow(
      { user, bigGoal },
      {
        $push: { externalReminders: externalReminder }
      }
    )

  return successResponse(interruptionStimulus, Status.CREATED)
})
