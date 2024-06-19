import {
  IDependency,
  IDistraction,
  IGame,
  IImpulse,
  IProductiveProcrastination,
  IReward,
  ITaskSamurai
} from '@/types'
import User from '../user/model'
import { CustomError } from '@/utils/error'
import { Status, TechniqueNumber } from '@/utils/enums'

export type ApprovalTechniques = {
  realNumberTechnique: TechniqueNumber
  isApproved: boolean
}

export const getUserMotivationTechniques = async (userId: string) => {
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
  const userImpulses: ApprovalTechniques = {
    realNumberTechnique: TechniqueNumber.USER_IMPULSE,
    isApproved: user?.impulses.length > 0
  }

  // Dependency should have at least one dependency
  const userDependencies: ApprovalTechniques = {
    realNumberTechnique: TechniqueNumber.USER_DEPENDENCY,
    isApproved: user?.dependency.dependencies.length > 0
  }

  // TaskSamurai should have at least 5 tasks
  const userTaskSamurai: ApprovalTechniques = {
    realNumberTechnique: TechniqueNumber.USER_TASK_SAMURAI,
    isApproved: user?.taskSamurai.boredTasks.length > 4
  }

  // ProductiveProcrastination should have at least 3 tasks
  const userProductiveProcrastination: ApprovalTechniques = {
    realNumberTechnique: TechniqueNumber.USER_PRODUCTIVE_PROCRASTINATION,
    isApproved: user?.productiveProcrastination.productiveLists.length > 2
  }

  // Distraction should have at least 2 distractions and 2 impulsivities
  const userDistraction: ApprovalTechniques = {
    realNumberTechnique: TechniqueNumber.USER_DISTRACTION_LIMITATION,
    isApproved:
      user?.distraction.distractions.length > 1 &&
      user?.distraction.impulsivities.length > 1
  }

  // Rewards should have at least 10 small rewards and 5 medium rewards
  const userReward: ApprovalTechniques = {
    realNumberTechnique: TechniqueNumber.REWARD,
    isApproved:
      user?.reward?.small.length > 9 && user?.reward?.medium.length > 4
  }

  // Games should have at least 3 games
  const userGames: ApprovalTechniques = {
    realNumberTechnique: TechniqueNumber.GAME,
    isApproved: user?.games.length > 2
  }

  const techniques = [
    userImpulses,
    userDependencies,
    userTaskSamurai,
    userProductiveProcrastination,
    userDistraction,
    userReward,
    userGames
  ]

  return {
    user,
    techniques
  }
}
