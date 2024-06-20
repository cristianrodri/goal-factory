import { TechniqueNumber } from '@/utils/enums'
import { checkActivitiesHaveFallback } from '../activity/motivation'
import { ApprovalTechniques } from './userTechniques'
import { checkPreviousMotivationBooks } from '../motivation-book/motivation'
import {
  isDifficultiesApproved,
  isRediApproved,
  isTaskDistributionApproved
} from '../goal/motivation'
import { getPopulatedBigGoals } from '../big-goal/populate'
import { IActivity } from '@/types'
import { optimizedEnergyIsPassed } from '@/lib/motivation-techniques/optimized-energy/motivation'

export const getGoalMotivationTechniques = async (
  user: string,
  bigGoalId: string
) => {
  const bigGoal = await getPopulatedBigGoals(user, bigGoalId)
  const currentGoals = bigGoal?.goals.filter(goal => !goal.achieved)
  const activities = currentGoals?.flatMap(
    goal => goal.activities
  ) as IActivity[]

  // SCALABLE_LOOP (1):
  // All activities must have at least one fallback
  // Get the last 7 motivation book and check if the sum of stabilities and the sum of motivation divided by the number of days is greater than 7
  const goalScalableLoop: ApprovalTechniques = {
    realNumberTechnique: TechniqueNumber.SCALABLE_LOOP,
    isApproved:
      checkActivitiesHaveFallback(activities) &&
      checkPreviousMotivationBooks(bigGoal?.motivationBooks)
  }

  // GOAL_VISUAL_PROSPECTY (3):
  // The visual prospective related to this bigGoal must exists
  const goalVisualProspecty: ApprovalTechniques = {
    realNumberTechnique: TechniqueNumber.GOAL_VISUAL_PROSPECTY,
    isApproved: !!bigGoal?.visualProspective
  }

  // GOAL_OPTIMISTIC_LEVEL (4):
  // The optimistic level related to this bigGoal must have at least one improvement
  const goalOptimisticLevel: ApprovalTechniques = {
    realNumberTechnique: TechniqueNumber.GOAL_OPTIMISTIC_LEVEL,
    isApproved: bigGoal?.optimisticLevel?.improvements.length > 0
  }

  // GOAL_WORST_CONTEXT (5):
  // The worst context related to this bigGoal must have at least 10 contingencies
  const goalWorstContext: ApprovalTechniques = {
    realNumberTechnique: TechniqueNumber.GOAL_WORST_CONTEXT,
    isApproved: bigGoal?.worstContext?.contingencies.length >= 10
  }

  // GOAL_OPTIMAL_ACCOUNTABILITY (7):
  // The optimal accountability related to this bigGoal must have at least one trusted person
  const goalOptimalAccountability: ApprovalTechniques = {
    realNumberTechnique: TechniqueNumber.GOAL_OPTIMAL_ACCOUNTABILITY,
    isApproved: bigGoal?.optimalAccountability?.trustedPeople.length > 0
  }

  // TASK_CALIBRATION (8):
  // The calibration related to this bigGoal must have goal difficulty between 4 and 6
  const taskCalibration: ApprovalTechniques = {
    realNumberTechnique: TechniqueNumber.TASK_CALIBRATION,
    isApproved: isDifficultiesApproved(currentGoals)
  }

  // GOAL_PURPOSE_PASSION (9):
  // The purpose and passion related to this bigGoal must have at least 3 daily activities. If the enjoyment of some activities are less than 4, the technique is not approved
  const goalPurposePassion: ApprovalTechniques = {
    realNumberTechnique: TechniqueNumber.GOAL_PURPOSE_PASSION,
    isApproved:
      bigGoal?.purposePassion?.dailyActivities.length >= 3 &&
      !bigGoal?.purposePassion?.dailyActivities.some(
        activity => activity.enjoyment < 4
      )
  }

  // GOAL_TOTAL_STRUCTURE_FOCUS (10):
  // The total structure focus related to this bigGoal must have at least 5 focus ideas
  const goalTotalStructureFocus: ApprovalTechniques = {
    realNumberTechnique: TechniqueNumber.GOAL_TOTAL_STRUCTURE_FOCUS,
    isApproved: bigGoal?.totalStructureFocus?.focusIdeas.length >= 5
  }

  // GOAL_REDI (11):
  // The goal must have REDI aspect greater than 7
  const goalRedi: ApprovalTechniques = {
    realNumberTechnique: TechniqueNumber.GOAL_REDI,
    isApproved: isRediApproved(currentGoals)
  }

  // ENJOYABLE_PRODUCTIVITY (12):
  // All activities must have diversionOrder and at least 1 diversion idea
  const enjoyableProductivity: ApprovalTechniques = {
    realNumberTechnique: TechniqueNumber.ENJOYABLE_PRODUCTIVITY,
    isApproved: activities.every(
      activity =>
        activity?.diversionOrder &&
        (activity?.diversionIdeas?.length as number) > 0
    )
  }

  // GOAL_OPTIMIZED_ENERGY (14):
  // The optimized energy related to this bigGoal must have at least 5 conclusions and energy levels older than 7 days
  const goalOptimizedEnergy: ApprovalTechniques = {
    realNumberTechnique: TechniqueNumber.GOAL_OPTIMIZED_ENERGY,
    isApproved: optimizedEnergyIsPassed(bigGoal?.optimizedEnergy)
  }

  // GOAL_CONTAMINATE_TEMPTATION (19):
  // The contaminate temptation related to this bigGoal must have at least 1 temptation
  const goalContaminateTemptation: ApprovalTechniques = {
    realNumberTechnique: TechniqueNumber.GOAL_CONTAMINATE_TEMPTATION,
    isApproved: bigGoal?.contaminateTemptation?.temptations.length > 0
  }

  // GOAL_INTERRUPTION_STIMULUS (20):
  // The interruption stimulus related to this bigGoal must have at least 1 external stimulus
  const goalInterruptionStimulus: ApprovalTechniques = {
    realNumberTechnique: TechniqueNumber.GOAL_INTERRUPTION_STIMULUS,
    isApproved: bigGoal?.interruptionStimulus?.externalReminders.length > 0
  }

  // GOAL_PRECOMMITMENT (21):
  // The precommitment related to this bigGoal must have at least 1 precommitment
  const goalPrecommitment: ApprovalTechniques = {
    realNumberTechnique: TechniqueNumber.GOAL_PRECOMMITMENT,
    isApproved: bigGoal?.preCommitment?.preCommitments.length > 0
  }

  // GOAL_REDUCE_ALTERNATIVE (22):
  // The big goal must have at least 1 burned ship
  const goalReduceAlternative: ApprovalTechniques = {
    realNumberTechnique: TechniqueNumber.GOAL_REDUCE_ALTERNATIVE,
    isApproved: bigGoal?.reduceAlternative?.burnedShips.length > 0
  }

  // GOAL_AUTOMATIC_HABIT (23):
  // The big goal must have at least 1 automatic habit
  const goalAutomaticHabit: ApprovalTechniques = {
    realNumberTechnique: TechniqueNumber.GOAL_AUTOMATIC_HABIT,
    isApproved: bigGoal?.automaticHabit.utilHabits.length > 0
  }

  // TASK_DISTRIBUTION_MODEL (25):
  // The big goal must have at least 1 task distribution model
  const taskDistributionModel: ApprovalTechniques = {
    realNumberTechnique: TechniqueNumber.TASK_DISTRIBUTION_MODEL,
    isApproved: isTaskDistributionApproved(currentGoals)
  }

  const techniques = [
    goalScalableLoop,
    goalVisualProspecty,
    goalOptimisticLevel,
    goalWorstContext,
    goalOptimalAccountability,
    taskCalibration,
    goalPurposePassion,
    goalTotalStructureFocus,
    goalRedi,
    enjoyableProductivity,
    goalOptimizedEnergy,
    goalContaminateTemptation,
    goalInterruptionStimulus,
    goalPrecommitment,
    goalReduceAlternative,
    goalAutomaticHabit,
    taskDistributionModel
  ]

  return techniques
}
