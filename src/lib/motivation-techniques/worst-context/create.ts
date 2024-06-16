import WorstContext from './model'

export const createGoalWorstContext = async (user: string, bigGoal: string) => {
  // Create a new worst context
  const worstContext = await WorstContext.create({
    user,
    bigGoal,
    contingencies: []
  })

  return worstContext
}
