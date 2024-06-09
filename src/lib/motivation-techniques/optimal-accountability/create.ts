import OptimalAccountability from './model'

export const createGoalOptimalAccountability = async (
  user: string,
  bigGoal: string
) => {
  const optimalAccountability = await OptimalAccountability.create({
    user,
    bigGoal,
    trustedPeople: []
  })

  return optimalAccountability
}
