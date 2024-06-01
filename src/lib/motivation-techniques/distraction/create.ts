import Distraction from './model'

export const createUserDistraction = async (userId: string) => {
  const userDistraction = await Distraction.create({
    distractions: [],
    impulsivities: [],
    user: userId
  })

  return userDistraction
}
