import {
  IAutomaticHabit,
  IContaminateTemptation,
  IGoal,
  IInterruptionStimulus,
  IMotivationBook,
  IOptimalAccountability,
  IOptimisticLevel,
  IOptimizedEnergy,
  IPreCommitment,
  IPurposePassion,
  IReduceAlternative,
  ITotalStructureFocus,
  IVisualProspective,
  IWorstContext
} from '@/types'
import BigGoal from './model'
import { Status } from '@/utils/enums'
import { CustomError } from '@/utils/error'

export const getPopulatedBigGoals = async (user: string, bigGoalId: string) => {
  const bigGoal = await BigGoal.findOne({ _id: bigGoalId, user })
    .populate<{ goals: IGoal[] }>({
      path: 'goals',
      populate: {
        path: 'activities'
      }
    })
    .populate<{ motivationBooks: IMotivationBook[] }>({
      path: 'motivationBooks',
      options: {
        sort: { date: -1 }, // Sort by date in descending order
        limit: 7 // Limit to the last 7 documents
      }
    })
    .populate<{ visualProspective: IVisualProspective }>('visualProspective')
    .populate<{ optimisticLevel: IOptimisticLevel }>('optimisticLevel')
    .populate<{ worstContext: IWorstContext }>('worstContext')
    .populate<{ optimalAccountability: IOptimalAccountability }>(
      'optimalAccountability'
    )
    .populate<{ purposePassion: IPurposePassion }>('purposePassion')
    .populate<{ totalStructureFocus: ITotalStructureFocus }>(
      'totalStructureFocus',
      'focusIdeas'
    )
    .populate<{ optimizedEnergy: IOptimizedEnergy }>('optimizedEnergy')
    .populate<{ contaminateTemptation: IContaminateTemptation }>(
      'contaminateTemptation'
    )
    .populate<{ interruptionStimulus: IInterruptionStimulus }>(
      'interruptionStimulus'
    )
    .populate<{ preCommitment: IPreCommitment }>('preCommitment')
    .populate<{ reduceAlternative: IReduceAlternative }>('reduceAlternative')
    .populate<{ automaticHabit: IAutomaticHabit }>('automaticHabit')

  if (!bigGoal) {
    throw new CustomError('Big goal not found', Status.NOT_FOUND)
  }

  return bigGoal
}
