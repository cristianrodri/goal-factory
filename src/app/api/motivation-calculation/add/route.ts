import { verifyBigGoal } from '@/lib/big-goal/get'
import MotivationCalculation from '@/lib/motivation-calculation/model'
import { IMotivationCalculation } from '@/types'
import { privateApi } from '@/utils/api'
import { successResponse } from '@/utils/response'

type RequestBody = Omit<IMotivationCalculation, 'user'>

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  await verifyBigGoal(body.bigGoal, user)

  // Create a new motivation calculation
  const motivationCalculation = new MotivationCalculation({
    ...body,
    user
  })

  // Save the motivation calculation
  await motivationCalculation.save()

  return successResponse(motivationCalculation)
})
