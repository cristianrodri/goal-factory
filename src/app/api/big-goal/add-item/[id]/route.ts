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

type RequestBody = {
  [key in PropertyBigGoalArray]: { data: DataBigGoalArray }
}

export const POST = privateApi<RequestBody, { id: string }>(
  async (user, { body, params }) => {
    const bigGoal = await BigGoal.findOneOrThrow({ user, _id: params.id })

    const property = Object.keys(body)[0] as PropertyBigGoalArray
    const data = body[property].data

    checkExistingItem(bigGoal, property, data)

    addItem(bigGoal, property, data)

    await bigGoal.save()

    return successResponse({ [property]: bigGoal[property] }, Status.CREATED)
  }
)
