import PreCommitment from './model'

export const createGoalPreCommitment = async (
  user: string,
  bigGoal: string
) => {
  // Create a new pre-commitment
  const preCommitment = await PreCommitment.create({
    user,
    bigGoal,
    preCommitments: []
  })

  return preCommitment
}
