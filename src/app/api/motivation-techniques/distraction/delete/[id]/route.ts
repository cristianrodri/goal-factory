import Distraction from '@/lib/motivation-techniques/distraction/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params }) => {
    const userDistraction = await Distraction.findOneOrThrow({ user })

    // Step 2: Check if the item exists in the distractions array
    const isDistraction = userDistraction.distractions.some(
      d => d._id.toString() === params.id
    )

    // Step 3: Check if the item exists in the impulsivities array
    const isImpulsivity = userDistraction.impulsivities.some(
      i => i._id.toString() === params.id
    )

    if (!isDistraction && !isImpulsivity) {
      return errorResponse('Item not found', Status.NOT_FOUND)
    }

    // Step 4: Remove the item from the distractions array
    if (isDistraction) {
      userDistraction.distractions = userDistraction.distractions.filter(
        d => d._id.toString() !== params.id
      )
    }

    // Step 5: Remove the item from the impulsivities array
    if (isImpulsivity) {
      userDistraction.impulsivities = userDistraction.impulsivities.filter(
        i => i._id.toString() !== params.id
      )
    }

    // Step 6: Save the updated document
    await userDistraction.save()

    return successResponse(userDistraction)
  }
)
