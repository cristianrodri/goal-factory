import VisualProspective from './model'

export const createGoalVisualProspective = async (
  user: string,
  bigGoal: string
) => {
  // Create a new visual prospective
  const visualProspective = await VisualProspective.create({
    user,
    bigGoal,
    timeReduceIdeas: []
  })

  return visualProspective
}
