import TotalStructureFocus from '@/lib/motivation-techniques/total-structure-focus/model'
import { privateApi } from '@/utils/api'
import { Param } from '@/utils/enums'
import { successResponse } from '@/utils/response'
import { getParam } from '@/utils/url'

export const GET = privateApi(async (user, { req }) => {
  const bigGoal = getParam(req, Param.BIG_GOAL)

  const totalStructureFocus = await TotalStructureFocus.findOneOrThrow({
    user,
    bigGoal
  })

  return successResponse(totalStructureFocus)
})
