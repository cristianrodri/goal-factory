import MotivationTechnique from '@/lib/motivation-technique/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { motivationTechniques } from '@/utils/motivation-techniques'
import { successResponse } from '@/utils/response'

export const POST = privateApi(async user => {
  const techniques = motivationTechniques.map(technique => ({
    realNumberTechnique: technique.realNumberTechinque,
    type: technique.type,
    user
  }))

  const createdTechniques = await MotivationTechnique.insertMany(techniques)

  return successResponse(createdTechniques, Status.CREATED)
})
