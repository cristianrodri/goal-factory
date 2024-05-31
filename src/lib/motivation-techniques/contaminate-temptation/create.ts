import ContaminateTemptation from './model'

export const createContaminateTemptation = async (
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
