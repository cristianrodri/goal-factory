import Distraction from '@/lib/motivation-techniques/distraction/model'
import { IDistractionItem, IImpulsivity } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  distraction?: string
  impulsivityData?: IImpulsivity
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  const { distraction, impulsivityData } = body

  // Validate request body to ensure it contains either a distraction or impulsivity data
  if (!distraction && !impulsivityData) {
    return errorResponse(
      'Request body must contain either a distraction or an impulsivity',
      Status.BAD_REQUEST
    )
  }

  // Fetch the existing Distraction document for the user
  const userDistraction = await Distraction.findOne({ user })

  // Add new distraction if it is provided and does not already exist
  if (userDistraction && distraction) {
    const checkExistedDistraction = userDistraction.distractions.some(
      d => d.distraction === distraction
    )

    if (checkExistedDistraction) {
      return errorResponse('Distraction already exists', Status.CONFLICT)
    }

    userDistraction.distractions.push({ distraction } as IDistractionItem)
  }

  // Add new impulsivity if it is provided and does not already exist
  if (userDistraction && impulsivityData) {
    const checkExistedImpulsivity = userDistraction.impulsivities.some(
      i => i.impulsivity === impulsivityData.impulsivity
    )

    if (checkExistedImpulsivity) {
      return errorResponse('Impulsivity already exists', Status.CONFLICT)
    }

    userDistraction.impulsivities.push(impulsivityData)
  }

  // Save the updated document
  await userDistraction?.save()

  // Return success response
  return successResponse(userDistraction, Status.CREATED)
})
