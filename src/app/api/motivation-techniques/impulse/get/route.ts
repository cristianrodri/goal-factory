import Impulse from '@/lib/motivation-techniques/impulse/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

export const GET = privateApi(async user => {
  const impulses = await Impulse.find({ user })

  return successResponse(impulses)
})
