import ContaminateTemptation from './model'

export const createGoalContaminateTemptation = async (
  user: string,
  goalId: string
) => {
  const contaminateTemptation = await ContaminateTemptation.create({
    temptations: [],
    bigGoal: goalId,
    user
  })

  return contaminateTemptation
}
