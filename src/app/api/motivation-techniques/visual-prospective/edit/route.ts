import {
  updateDataOfVisualProspective,
  VisualProspectiveEdit
} from '@/lib/motivation-techniques/visual-prospective/data'
import VisualProspective from '@/lib/motivation-techniques/visual-prospective/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

interface RequestBody {
  visualProspective: VisualProspectiveEdit
}

export const PUT = privateApi<RequestBody>(async (user, { body }) => {
  const { visualProspective } = body
  // Update data of visual prospective
  const visualProspectiveDoc = await VisualProspective.findOneOrThrow({
    user,
    bigGoal: body.visualProspective.bigGoal
  })

  updateDataOfVisualProspective(visualProspectiveDoc, visualProspective)

  await visualProspectiveDoc.save()

  return successResponse(visualProspectiveDoc)
})
