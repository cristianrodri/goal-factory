import { getBigGoal } from '@/lib/big-goal/get'
import Goal from '@/lib/goal/model'
import { IGoal } from '@/types'
import { privateApi } from '@/utils/api'
import { GoalType, Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'
import moment from 'moment'

type RequestBody = Omit<IGoal, 'user' | 'bigGoal'> & {
  bigGoal: string
}

export const POST = privateApi<RequestBody>(async (user, { body }) => {
  const { optimisticDeadline, parentGoal } = body
  // Get the related big goal
  const bigGoal = await getBigGoal(body.bigGoal, user)

  if (bigGoal.achieved) {
    return errorResponse('Big goal is already achieved', Status.BAD_REQUEST)
  }

  // Created goal date must not be greater than the big goal date
  const bigGoalDate = moment(bigGoal.optimisticDeadline).startOf('day')
  const goalDate = moment(optimisticDeadline).startOf('day')

  if (goalDate.isAfter(bigGoalDate)) {
    return errorResponse(
      'Goal date must not be greater than the big goal date',
      Status.BAD_REQUEST
    )
  }

  // If parent goal is provided, check if it exists by searching for it in the big goal and verify that it is not a "performance" type
  if (parentGoal) {
    const parentGoalFound = bigGoal.goals.find(
      goal => goal._id.toString() === parentGoal
    )

    if (!parentGoalFound) {
      return errorResponse('Parent goal not found', Status.BAD_REQUEST)
    }

    if (parentGoalFound.type === GoalType.PERFORMANCE) {
      return errorResponse(
        `Parent goal cannot be of type ${GoalType.PERFORMANCE}`,
        Status.BAD_REQUEST
      )
    }

    const parentGoalDate = moment(parentGoalFound.optimisticDeadline)
    const goalDate = moment(optimisticDeadline)

    // Created goal date must not be greater than the parent goal date
    if (goalDate.isAfter(parentGoalDate)) {
      return errorResponse(
        'Goal date must not be greater than the parent goal date',
        Status.BAD_REQUEST
      )
    }
  }

  const goal = await Goal.create({ ...body, user })

  return successResponse(goal, Status.CREATED)
})
