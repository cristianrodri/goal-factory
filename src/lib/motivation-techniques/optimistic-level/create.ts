import OptimisticLevel from './model'

export const createGoalOptimisticLevel = async (
  user: string,
  bigGoal: string
) => {
  // Create a new optimistic level
  const optimisticLevel = await OptimisticLevel.create({
    user,
    bigGoal,
    improvements: []
  })

  return optimisticLevel
}
