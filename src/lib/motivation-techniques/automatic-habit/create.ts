import AutomaticHabit from './model'

export const createGoalAutomaticHabit = async (
  user: string,
  bigGoal: string
) => {
  // Create the automatic habit
  const automaticHabit = await AutomaticHabit.create({
    utilHabits: [],
    bigGoal,
    user
  })

  return automaticHabit
}
