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
    moderatingFactors: [
      { num: 1, obstacles: [] },
      { num: 2, obstacles: [] },
      { num: 3, obstacles: [] },
      { num: 4, obstacles: [] },
      { num: 5, obstacles: [] },
      { num: 6, obstacles: [] }
    ],
    moderationFactorAlternatives: [],
    mediatingFactors: [
      { num: 1, facilitators: [] },
      { num: 2, facilitators: [] },
      { num: 3, facilitators: [] },
      { num: 4, facilitators: [] }
    ],
    futureGoals: []
  })

  return bigGoal
}
