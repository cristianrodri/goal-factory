import { verifyBigGoal } from '@/lib/big-goal/get'
import ContaminateTemptation from '@/lib/motivation-techniques/contaminate-temptation/model'
import { ITemptation } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  temptationData: ITemptation
  bigGoal: string
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  const { temptationData, bigGoal } = body
  const { temptation } = temptationData

  await verifyBigGoal(bigGoal, user)

  // Check if the contamination document already exists for the given bigGoal
  const existingTemptation = await ContaminateTemptation.findOne({
    user,
    bigGoal,
    'temptations.temptation': temptation
  })

  if (existingTemptation) {
    return errorResponse(
      `${temptation} temptation already exists for this big goal`,
      Status.CONFLICT
    )
  }

  // Add the habit to the utils habits related to the bigGoal
  const contaminateTemptation =
    await ContaminateTemptation.findOneAndUpdateOrThrow(
      { user, bigGoal },
      {
        $push: {
          temptations: temptationData
        }
      }
    )

  return successResponse(contaminateTemptation, Status.CREATED)
})
