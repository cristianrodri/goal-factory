import ReduceAlternative from './model'

export const createGoalReduceAlternative = async (
  user: string,
  bigGoal: string
) => {
  const reduceAlternative = await ReduceAlternative.create({
    user,
    bigGoal,
    burnedShips: []
  })

  return reduceAlternative
}
