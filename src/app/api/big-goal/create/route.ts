import BigGoal from '@/lib/big-goal/model'
import { createGoalMotivationTechniques } from '@/lib/motivation-technique/create'
import { createContaminateTemptation } from '@/lib/motivation-techniques/contaminate-temptation/create'
import { IBigGoal } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

export const POST = privateApi<Omit<IBigGoal, 'user'>>(
  async (user, { body }) => {
    const bigGoal = await BigGoal.create({ ...body, user })
    const goalId = bigGoal._id as unknown as string

    // Creation motivation techniques related to the big goal
    await createGoalMotivationTechniques(user, goalId)

    await createContaminateTemptation(user, goalId)

    return successResponse(bigGoal, Status.CREATED)
  }
)
