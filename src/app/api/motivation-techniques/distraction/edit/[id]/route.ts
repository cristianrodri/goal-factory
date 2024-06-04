import Distraction from '@/lib/motivation-techniques/distraction/model'
import { verifyBody } from '@/lib/motivation-techniques/distraction/verify'
import { IImpulsivity } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  editedDistraction?: string
  impulsivityData?: Partial<IImpulsivity>
}

export const PUT = privateApi<RequestBody, { id: string }>(
  async (user, { body, params }) => {
    const { editedDistraction, impulsivityData } = body

    verifyBody({ distraction: editedDistraction, impulsivityData })

    const userDistraction = await Distraction.findOneOrThrow({
      user
    })

    // If editedDistraction is provided
    if (editedDistraction) {
      // Check if the edited distraction already exists (excluding the current item being edited)
      const checkExistedDistraction = userDistraction.distractions.some(
        d =>
          d.distraction === editedDistraction && d._id.toString() !== params.id
      )

      // If the distraction already exists, return a conflict error response
      if (checkExistedDistraction) {
        return errorResponse('Distraction already exists', Status.CONFLICT)
      }

      // Update the existing distraction with the new editedDistraction
      userDistraction.distractions = userDistraction.distractions.map(d => {
        if (d._id.toString() === params.id) {
          d.distraction = editedDistraction
        }

        return d
      })
    }

    // If impulsivityData is provided
    if (impulsivityData) {
      // Check if the impulsivity data already exists (excluding the current item being edited)
      const checkExistedImpulsivity = userDistraction.impulsivities.some(
        i =>
          i.impulsivity === impulsivityData.impulsivity &&
          i._id.toString() !== params.id
      )

      // If the impulsivity data already exists, return a conflict error response
      if (checkExistedImpulsivity) {
        return errorResponse('Impulsivity already exists', Status.CONFLICT)
      }

      // Update the existing impulsivity data with the new impulsivityData
      userDistraction.impulsivities = userDistraction.impulsivities.map(i => {
        if (i._id.toString() === params.id) {
          i.impulsivity = impulsivityData?.impulsivity ?? i.impulsivity
          i.timeToDo = impulsivityData?.timeToDo ?? i.timeToDo
        }

        return i
      })
    }

    await userDistraction.save()

    return successResponse(userDistraction)
  }
)
