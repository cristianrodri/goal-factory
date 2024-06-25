import {
  addItem,
  checkExistingItem,
  DataBigGoalArray,
  PropertyBigGoalArray
} from '@/lib/big-goal/addArrayItem'
import BigGoal from '@/lib/big-goal/model'
import { privateApi } from '@/utils/api'
import { Status } from '@/utils/enums'
import { successResponse } from '@/utils/response'

interface RequestBody {
  data: DataBigGoalArray
  property: PropertyBigGoalArray
}

export const POST = privateApi<RequestBody, { id: string }>(
  async (user, { body, params }) => {
    const bigGoal = await BigGoal.findOneOrThrow({ user, _id: params.id })

    const { data, property } = body
    checkExistingItem(bigGoal, property, data)

    addItem(bigGoal, property, data)

    await bigGoal.save()

    return successResponse(bigGoal, Status.CREATED)
  }
)
