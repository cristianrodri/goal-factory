import { IBigGoal } from '@/types'
import BigGoal from './model'

export const createBigGoal = async (
  user: string,
  body: Omit<IBigGoal, 'user'>
) => {
  // Create big goal
  const bigGoal = await BigGoal.create({
    ...body,
    user,
    activityAnalisys: [],
    moderatingFactors: {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: []
    },
    moderationFactorAlternatives: [],
    facilitators: {
      1: [],
      2: [],
      3: [],
      4: []
    },
    futureGoals: []
  })

  return bigGoal
}
