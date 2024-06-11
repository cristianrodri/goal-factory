import BigGoal from '@/lib/big-goal/model'
import { createGoalMotivationTechniques } from '@/lib/motivation-technique/create'
import { createGoalAutomaticHabit } from '@/lib/motivation-techniques/automatic-habit/create'
import { createGoalContaminateTemptation } from '@/lib/motivation-techniques/contaminate-temptation/create'
import { createGoalInterruptionStimulus } from '@/lib/motivation-techniques/interruption-stimulus/create'
import { createGoalOptimalAccountability } from '@/lib/motivation-techniques/optimal-accountability/create'
import { createGoalOptimisticLevel } from '@/lib/motivation-techniques/optimistic-level/create'
import { createGoalOptimizedEnergy } from '@/lib/motivation-techniques/optimized-energy/create'
import { IBigGoal } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

export const POST = privateApi<Omit<IBigGoal, 'user'>>(
  async (user, { body }) => {
    const bigGoal = await BigGoal.create({ ...body, user })
    const goalId = bigGoal._id.toString()

    // Creation motivation techniques related to the big goal
    await createGoalMotivationTechniques(user, goalId)

    await createGoalAutomaticHabit(user, goalId)
    await createGoalContaminateTemptation(user, goalId)
    await createGoalInterruptionStimulus(user, goalId)
    await createGoalOptimalAccountability(user, goalId)
    await createGoalOptimisticLevel(user, goalId)
    await createGoalOptimizedEnergy(user, goalId)

    return successResponse(bigGoal, Status.CREATED)
  }
)
