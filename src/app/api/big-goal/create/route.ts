import { createBigGoal } from '@/lib/big-goal/create'
import { createGoalMotivationTechniques } from '@/lib/motivation-technique/create'
import { createGoalAutomaticHabit } from '@/lib/motivation-techniques/automatic-habit/create'
import { createGoalContaminateTemptation } from '@/lib/motivation-techniques/contaminate-temptation/create'
import { createGoalInterruptionStimulus } from '@/lib/motivation-techniques/interruption-stimulus/create'
import { createGoalOptimalAccountability } from '@/lib/motivation-techniques/optimal-accountability/create'
import { createGoalOptimisticLevel } from '@/lib/motivation-techniques/optimistic-level/create'
import { createGoalOptimizedEnergy } from '@/lib/motivation-techniques/optimized-energy/create'
import { createGoalPreCommitment } from '@/lib/motivation-techniques/pre-commitment/create'
import { createGoalPurposePassion } from '@/lib/motivation-techniques/purpose-passion/create'
import { createGoalReduceAlternative } from '@/lib/motivation-techniques/reduce-alternative/create'
import { createGoalTotalStructureFocus } from '@/lib/motivation-techniques/total-structure-focus/create'
import { createGoalVisualProspective } from '@/lib/motivation-techniques/visual-prospective/create'
import { createGoalWorstContext } from '@/lib/motivation-techniques/worst-context/create'
import { IBigGoal } from '@/types'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

export const POST = privateApi<Omit<IBigGoal, 'user'>>(
  async (user, { body }) => {
    const bigGoal = await createBigGoal(user, body)
    const goalId = bigGoal._id.toString()

    // Creation motivation techniques related to the big goal
    await createGoalMotivationTechniques(user, goalId)

    await createGoalAutomaticHabit(user, goalId)
    await createGoalContaminateTemptation(user, goalId)
    await createGoalInterruptionStimulus(user, goalId)
    await createGoalOptimalAccountability(user, goalId)
    await createGoalOptimisticLevel(user, goalId)
    await createGoalOptimizedEnergy(user, goalId)
    await createGoalPreCommitment(user, goalId)
    await createGoalPurposePassion(user, goalId)
    await createGoalReduceAlternative(user, goalId)
    await createGoalTotalStructureFocus(user, goalId)
    await createGoalVisualProspective(user, goalId)
    await createGoalWorstContext(user, goalId)

    return successResponse(bigGoal, Status.CREATED)
  }
)
