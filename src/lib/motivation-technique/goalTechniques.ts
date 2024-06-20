import { CustomError } from '@/utils/error'
import BigGoal from '../big-goal/model'
import { Status, TechniqueNumber } from '@/utils/enums'
import { checkActivitiesHaveFallback } from '../activity/motivation'
import { IActivity, IMotivationBook } from '@/types'
import { ApprovalTechniques } from './userTechniques'
import { checkPreviousMotivationBooks } from '../motivation-book/motivation'

export const getGoalMotivationTechniques = async (
  user: string,
  bigGoalId: string
) => {
  const bigGoal = await BigGoal.findOne({ _id: bigGoalId, user })
    .populate<{
      activities: IActivity[]
    }>('activities')
    .populate<{ motivationBooks: IMotivationBook[] }>({
      path: 'motivationBooks',
      options: {
        sort: { date: -1 }, // Sort by date in descending order
        limit: 7 // Limit to the last 7 documents
      }
    })

  if (!bigGoal) {
    throw new CustomError('Big goal not found', Status.NOT_FOUND)
  }

  // SCALABLE_LOOP (1):
  // All activities must have at least one fallback
  // Get the last 7 motivation book and check if the sum of stabilities and the sum of motivation divided by the number of days is greater than 7
  const goalScalableLoop: ApprovalTechniques = {
    realNumberTechnique: TechniqueNumber.SCALABLE_LOOP,
    isApproved:
      checkActivitiesHaveFallback(bigGoal.activities) &&
      checkPreviousMotivationBooks(bigGoal.motivationBooks)
  }

  const techniques = [goalScalableLoop]

  return techniques
}
