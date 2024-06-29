import Goal from '@/lib/goal/model'
import { privateApi } from '@/utils/api'
import { Param } from '@/utils/enums'
import { successResponse } from '@/utils/response'
import { getParam } from '@/utils/url'

export const GET = privateApi(async (user, { req }) => {
  const bigGoal = getParam(req, Param.BIG_GOAL)
  const parentGoal = getParam(req, Param.PARENT_GOAL)

  const goals = await Goal.find({
    user,
    bigGoal,
    ...(parentGoal ? { goal: parentGoal } : {})
  })

  return successResponse(goals)
})
