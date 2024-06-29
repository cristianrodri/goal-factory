import {
  DataBigGoalArray,
  PropertyBigGoalArray
} from '@/lib/big-goal/addArrayItem'
import { filterQuery } from '@/lib/big-goal/filter-query'
import BigGoal from '@/lib/big-goal/model'
import { updateItem } from '@/lib/big-goal/updateArrayItem'
import { privateApi } from '@/utils/api'
import { Param, Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'
import { getParam } from '@/utils/url'

type RequestBody = {
  [key in PropertyBigGoalArray]: { data: DataBigGoalArray }
}

export const PUT = privateApi<RequestBody, { id: string }>(
  async (user, { body, params, req }) => {
    const itemId = getParam(req, Param.ID)

    if (!itemId) {
      return errorResponse('Item ID is required', Status.BAD_REQUEST)
    }

    const property = Object.keys(body)[0] as PropertyBigGoalArray

    const filterData = filterQuery(property, itemId)

    // Get the big goal
    const bigGoal = await BigGoal.findOneOrThrow({
      user,
      _id: params.id,
      ...filterData
    })

    const data = body[property].data

    updateItem(itemId, bigGoal, property, data)

    await bigGoal.save()

    return successResponse({ [property]: bigGoal[property] })
  }
)
