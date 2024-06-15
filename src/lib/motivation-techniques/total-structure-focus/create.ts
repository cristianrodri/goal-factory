import TotalStructureFocus from './model'

export const createGoalTotalStructureFocus = async (
  user: string,
  bigGoal: string
) => {
  const totalStructureFocus = await TotalStructureFocus.create({
    user,
    bigGoal,
    focusIdeas: []
  })

  return totalStructureFocus
}
