import { IGoal } from '@/types'
import { GoalType } from '@/utils/enums'
import moment from 'moment'

export const isDifficultiesApproved = (goals: IGoal[]) => {
  // If goal is not achieved yet and the difficulty is less than 4 or greater than 6
  return !goals.some(
    goal => (goal?.difficulty as number) < 4 || (goal?.difficulty as number) > 6
  )
}

export const isRediApproved = (goals: IGoal[]) => {
  // Every goal should have at least challenge, specific, directed, and immediate aspects greater than 7
  return !goals.some(
    goal =>
      (goal?.redi?.challenge as number) < 7 ||
      (goal?.redi?.specific as number) < 7 ||
      (goal?.redi?.directed as number) < 7 ||
      (goal?.redi?.immediate as number) < 7
  )
}

export const isTaskDistributionApproved = (goals: IGoal[]) => {
  if (goals.length === 0) {
    return false
  }

  const resultGoals = goals.filter(goal => goal.type === GoalType.RESULT)

  // If there are no result goals, return true
  if (resultGoals.length === 0) {
    return true
  }

  // If there are result goals, check if the difference between specificDeadline and startsOn date is greater than 2 days
  const checkOptimisticDeadline = resultGoals.some(goal => {
    const optimisticDeadline = moment(goal.optimisticDeadline)
    const startsOn = moment(goal.startsOn)

    const daysDiff = optimisticDeadline.diff(startsOn, 'days')

    if (daysDiff > 2) {
      // Check realDeadline days diff

      const realDeadline = moment(goal.realDeadline)

      const realDaysDiff = realDeadline.diff(startsOn, 'days')

      if (realDaysDiff > 2) {
        return false
      }

      return true
    }

    return true
  })

  return checkOptimisticDeadline
}
