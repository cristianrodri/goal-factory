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
    moderatingFactors: [],
    moderationFactorAlternatives: [],
    facilitators: [],
    futureGoals: []
  })

  return bigGoal
}
