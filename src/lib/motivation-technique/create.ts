import { motivationTechniques } from '@/utils/motivation-techniques'
import MotivationTechnique from './model'
import { MotivationType } from '@/utils/enums'

const createTechniques = async (
  type: MotivationType,
  user: string,
  bigGoal?: string
) => {
  const techniques = motivationTechniques
    .filter(t => t.type === type)
    .map(technique => ({
      realNumberTechnique: technique.realNumberTechinque,
      type: technique.type,
      user,
      ...(type === MotivationType.PER_GOAL && { bigGoal })
    }))

  const createdTechniques = await MotivationTechnique.insertMany(techniques)

  return createdTechniques
}

export const createUserMotivationTechniques = async (user: string) => {
  const techniques = await createTechniques(MotivationType.PER_USER, user)

  return techniques
}

export const createGoalMotivationTechniques = async (
  user: string,
  bigGoal: string
) => {
  const techniques = await createTechniques(
    MotivationType.PER_GOAL,
    user,
    bigGoal
  )

  return techniques
}
