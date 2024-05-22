import { IGoal } from '@/types'
import BigGoal from './model'
import { CustomError } from '@/utils/error'
import { Status } from '@/utils/enums'

interface PopulatedBigGoal {
  goals: IGoal[]
}

export const verifyBigGoal = async (id: string, userId: string) => {
  const bigGoalExists = await BigGoal.exists({
    _id: id,
    user: userId
  })

  return bigGoalExists
}

export const getAllBigGoals = async (userId: string) => {
  const bigGoals = await BigGoal.find({
    user: userId
  }).populate<PopulatedBigGoal>({ path: 'goals', populate: 'activities' })

  return bigGoals
}

export const getBigGoal = async (id: string, userId: string) => {
  try {
    const bigGoal = await BigGoal.findOne({
      _id: id,
      user: userId
    }).populate<PopulatedBigGoal>({ path: 'goals', populate: 'activities' })

    return bigGoal
  } catch (error) {
    throw new CustomError('Big Goal not found', Status.NOT_FOUND)
  }
}
