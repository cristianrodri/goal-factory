import OptimizedEnergy from './model'

export const createGoalOptimizedEnergy = async (
  user: string,
  bigGoal: string
) => {
  // Add the optimized energy for the big goal
  const optimizedEnergy = await OptimizedEnergy.create({
    user,
    bigGoal,
    energyLevels: []
  })

  return optimizedEnergy
}
