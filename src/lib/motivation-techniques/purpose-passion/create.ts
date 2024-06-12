import PurposePassion from './model'

export const createGoalPurposePassion = async (
  user: string,
  bigGoal: string
) => {
  const purposePassion = await PurposePassion.create({
    user,
    bigGoal,
    dailyActivities: []
  })

  return purposePassion
}
