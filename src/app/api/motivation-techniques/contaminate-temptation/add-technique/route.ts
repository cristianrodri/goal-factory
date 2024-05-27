import { verifyBigGoal } from '@/lib/big-goal/get'
import ContaminateTemptation from '@/lib/motivation-techniques/contaminate-temptation/model'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

interface RequestBody {
  bigGoal: string
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  await verifyBigGoal(body.bigGoal, user)

  const contaminateTemptation = await ContaminateTemptation.create({
    temptations: [],
    bigGoal: body.bigGoal,
    user
  })

  return successResponse(contaminateTemptation)
})
