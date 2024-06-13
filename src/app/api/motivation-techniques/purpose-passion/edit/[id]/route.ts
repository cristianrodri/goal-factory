import PurposePassion from '@/lib/motivation-techniques/purpose-passion/model'
import { IDailyActivityPassion } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
  dailyActivity: Partial<IDailyActivityPassion>
}

export const PUT = privateApi<RequestBody, { id: string }>(
  async (user, { body, params }) => {
    const { bigGoal, dailyActivity } = body

    const purposePassion = await PurposePassion.findOneOrThrow({
      user,
      bigGoal
    })

    const foundSameActivity = purposePassion.dailyActivities.some(
      d =>
        d.activity === dailyActivity.activity && d._id.toString() !== params.id
    )

    if (foundSameActivity) {
      return errorResponse('Activity already exists', Status.CONFLICT)
    }

    purposePassion.dailyActivities = purposePassion.dailyActivities.map(d => {
      if (d._id.toString() === params.id) {
        d.activity = dailyActivity?.activity || d.activity
        d.enjoyment = dailyActivity?.enjoyment || d.enjoyment
      }

      return d
    })

    await purposePassion.save()

    return successResponse(purposePassion)
  }
)
