import { IGoal } from '@/types'
import Aspiration from './model'

interface PopulatedAspiration {
  goals: IGoal[]
}

export const getAllAspirations = async (userId: string) => {
  const aspirations = await Aspiration.find({
    user: userId
  }).populate<PopulatedAspiration>({ path: 'goals', populate: 'activities' })

  return aspirations
}

export const getAspiration = async (id: string, userId: string) => {
  const aspiration = await Aspiration.findOne({
    _id: id,
    user: userId
  }).populate<PopulatedAspiration>({ path: 'goals', populate: 'activities' })

  return aspiration
}
