import { addDataToVisualProspective } from '@/lib/motivation-techniques/visual-prospective/data'
import VisualProspective from '@/lib/motivation-techniques/visual-prospective/model'
import { IVisualProspective } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

interface RequestBody {
  visualProspective: Omit<IVisualProspective, 'user' | 'timeReduceIdeas'> & {
    timeReduceIdea: string
  }
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  const visualProspective = await VisualProspective.findOneOrThrow({
    user,
    bigGoal: body.visualProspective.bigGoal
  })

  // Add data to visual prospective
  addDataToVisualProspective(visualProspective, body)

  await visualProspective.save()

  return successResponse(visualProspective, Status.CREATED)
})
