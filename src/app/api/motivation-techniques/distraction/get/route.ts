import Distraction from '@/lib/motivation-techniques/distraction/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const GET = privateApi(async user => {
  const userDistraction = await Distraction.findOneOrThrow({ user })

  return successResponse(userDistraction)
})
