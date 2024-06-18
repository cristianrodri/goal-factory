import {
  IDependency,
  IDistraction,
  IGame,
  IImpulse,
  IProductiveProcrastination,
  IReward,
  ITaskSamurai
} from '@/types'
import User from './model'
import { CustomError } from '@/utils/error'
import { Status } from '@/utils/enums'

export const getMotivationTechniques = async (userId: string) => {
  const user = await User.findOne({ _id: userId })
    .populate<{ impulses: IImpulse[] }>('impulses')
    .populate<{ dependency: IDependency }>('dependency')
    .populate<{ taskSamurai: ITaskSamurai }>('taskSamurai')
    .populate<{ productiveProcrastination: IProductiveProcrastination }>(
      'productiveProcrastination'
    )
    .populate<{ distraction: IDistraction }>('distraction')
    .populate<{ reward: IReward }>('reward')
    .populate<{ games: IGame[] }>('games')

  if (!user) {
    throw new CustomError('User not found', Status.NOT_FOUND)
  }

  // Impulses should have at least one video
  const isImpulsesPassed = user?.impulses.length > 0

  // Dependency should have at least one dependency
  const isDependencyPassed = user?.dependency.dependencies.length > 0

  // TaskSamurai should have at least 5 tasks
  const isTaskSamuraiPassed = user?.taskSamurai.boredTasks.length > 4

  // ProductiveProcrastination should have at least 3 tasks
  const isProductiveProcrastinationPassed =
    user?.productiveProcrastination.productiveLists.length > 2

  // Distraction should have at least 2 distractions and 2 impulsivities
  const isDistractionPassed =
    user?.distraction.distractions.length > 1 &&
    user?.distraction.impulsivities.length > 1

  // Rewards should have at least 10 small rewards and 5 medium rewards
  const isRewardPassed =
    user?.reward.small.length > 9 && user?.reward.medium.length > 4

  // Games should have at least 3 games
  const isGamesPassed = user?.games.length > 2

  return {
    isImpulsesPassed,
    isDependencyPassed,
    isTaskSamuraiPassed,
    isProductiveProcrastinationPassed,
    isDistractionPassed,
    isRewardPassed,
    isGamesPassed
  }
}
