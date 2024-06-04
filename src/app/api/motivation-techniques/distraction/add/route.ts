import Distraction from '@/lib/motivation-techniques/distraction/model'
import { verifyBody } from '@/lib/motivation-techniques/distraction/verify'
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
  verifyBody({ distraction, impulsivityData })

  // Fetch the existing Distraction document for the user
  const userDistraction = await Distraction.findOneOrThrow({ user })

  // Add new distraction if it is provided and does not already exist
  if (distraction) {
    const checkExistedDistraction = userDistraction.distractions.some(
      d => d.distraction === distraction
    )

    if (checkExistedDistraction) {
      return errorResponse('Distraction already exists', Status.CONFLICT)
    }

    userDistraction.distractions.push({ distraction } as IDistractionItem)
  }

  // Add new impulsivity if it is provided and does not already exist
  if (impulsivityData) {
    const checkExistedImpulsivity = userDistraction.impulsivities.some(
      i => i.impulsivity === impulsivityData.impulsivity
    )

    if (checkExistedImpulsivity) {
      return errorResponse('Impulsivity already exists', Status.CONFLICT)
    }

    userDistraction.impulsivities.push(impulsivityData)
  }

  // Save the updated document
  await userDistraction.save()

  // Return success response
  return successResponse(userDistraction, Status.CREATED)
})
