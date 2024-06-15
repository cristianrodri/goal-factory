import { createGoalVisualProspective } from '@/lib/motivation-techniques/visual-prospective/create'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  const { bigGoal } = body

  // Create visual prospective
  const visualProspective = await createGoalVisualProspective(user, bigGoal)

  return successResponse(visualProspective, Status.CREATED)
})
