import OptimisticLevel from '@/lib/motivation-techniques/optimistic-level/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  editedImprovementDescription: string
  bigGoal: string
}

export const PUT = privateApi<RequestBody, { id: string }>(
  async (user, { body, params }) => {
    const { editedImprovementDescription, bigGoal } = body

    // Edit the improvement in the optimistic level
    const optimisticLevel = await OptimisticLevel.findOneOrThrow({
      user,
      bigGoal
    })

    const foundSameDescription = optimisticLevel.improvements.some(
      i =>
        i.description === editedImprovementDescription &&
        i._id.toString() !== params.id
    )

    if (foundSameDescription) {
      return errorResponse('Improvement already exists', Status.CONFLICT)
    }

    optimisticLevel.improvements = optimisticLevel.improvements.map(i => {
      if (i._id.toString() === params.id) {
        i.description = editedImprovementDescription
      }
      return i
    })

    await optimisticLevel.save()

    return successResponse(optimisticLevel)
  }
)
