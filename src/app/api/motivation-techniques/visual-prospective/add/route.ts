import {
  addDataToVisualProspective,
  VisualProspectiveAdd
} from '@/lib/motivation-techniques/visual-prospective/data'
import VisualProspective from '@/lib/motivation-techniques/visual-prospective/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

interface RequestBody {
  visualProspective: VisualProspectiveAdd
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  const { visualProspective } = body

  const visualProspectiveDoc = await VisualProspective.findOneOrThrow({
    user,
    bigGoal: body.visualProspective.bigGoal
  })

  // Add data to visual prospective
  addDataToVisualProspective(visualProspectiveDoc, visualProspective)

  await visualProspectiveDoc.save()

  return successResponse(visualProspectiveDoc, Status.CREATED)
})
