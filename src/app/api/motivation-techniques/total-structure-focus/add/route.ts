import TotalStructureFocus from '@/lib/motivation-techniques/total-structure-focus/model'
import { IFocusIdea } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
  idea: string
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  const { bigGoal, idea } = body

  const totalStructureFocus = await TotalStructureFocus.findOneOrThrow({
    user,
    bigGoal
  })

  const foundSameFocusIdea = totalStructureFocus.focusIdeas.some(
    f => f.idea === idea
  )

  if (foundSameFocusIdea) {
    return errorResponse('Focus idea already exists', Status.CONFLICT)
  }

  totalStructureFocus.focusIdeas.push({ idea } as IFocusIdea)

  await totalStructureFocus.save()

  return successResponse(totalStructureFocus, Status.CREATED)
})
