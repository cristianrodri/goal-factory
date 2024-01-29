import { IGoal } from '@/types'
import Aspiration from './model'

export const getAllAspirations = async (userId: string) => {
  const aspirations = await Aspiration.find({ user: userId }).populate<{
    goals: IGoal[]
  }>({ path: 'goals', populate: 'activities' })

  return aspirations
}
