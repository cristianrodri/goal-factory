import PurposePassion from '@/lib/motivation-techniques/purpose-passion/model'
import { IDailyActivityPassion } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
  dailyActivity: IDailyActivityPassion
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  const { bigGoal, dailyActivity } = body

  const purposePassion = await PurposePassion.findOneOrThrow({ user, bigGoal })

  const sameActivityFound = purposePassion.dailyActivities.some(
    d => d.activity === dailyActivity.activity
  )

  if (sameActivityFound) {
    return errorResponse('Activity already exists', Status.CONFLICT)
  }

  purposePassion.dailyActivities.push(dailyActivity)

  await purposePassion.save()

  return successResponse(purposePassion, Status.CREATED)
})
