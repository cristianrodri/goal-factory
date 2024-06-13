import PurposePassion from '@/lib/motivation-techniques/purpose-passion/model'
import { privateApi } from '@/utils/api'
import { Param } from '@/utils/enums'
import { successResponse } from '@/utils/response'
import { getParam } from '@/utils/url'

export const GET = privateApi(async (user, { req }) => {
  const bigGoal = getParam(req, Param.BIG_GOAL)

  const purposePassion = await PurposePassion.findOneOrThrow({ user, bigGoal })

  return successResponse(purposePassion)
})
