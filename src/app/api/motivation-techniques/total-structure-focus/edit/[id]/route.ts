import TotalStructureFocus from '@/lib/motivation-techniques/total-structure-focus/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
  editedIdea: string
}

export const PUT = privateApi<RequestBody, { id: string }>(
  async (user, { body, params }) => {
    const { bigGoal, editedIdea } = body

    const totalStructureFocus = await TotalStructureFocus.findOneOrThrow({
      user,
      bigGoal
    })

    const foundSameFocusIdea = totalStructureFocus.focusIdeas.some(
      f => f.idea === editedIdea && f._id.toString() !== params.id
    )

    if (foundSameFocusIdea) {
      return errorResponse('Focus idea already exists', Status.CONFLICT)
    }

    totalStructureFocus.focusIdeas = totalStructureFocus.focusIdeas.map(f => {
      if (f._id.toString() === params.id) {
        f.idea = editedIdea
      }

      return f
    })

    await totalStructureFocus.save()

    return successResponse(totalStructureFocus)
  }
)
