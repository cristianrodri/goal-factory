import {
  DataBigGoalArray,
  PropertyBigGoalArray
} from '@/lib/big-goal/addArrayItem'
import BigGoal from '@/lib/big-goal/model'
import { updateItem } from '@/lib/big-goal/updateArrayItem'
import { IBigGoal } from '@/types'
import { privateApi } from '@/utils/api'
import { Param, Status } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'
import { getParam } from '@/utils/url'
import { FilterQuery } from 'mongoose'

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

    const filterData: FilterQuery<IBigGoal> = {}

    if (property === 'moderatingFactors') {
      filterData[property] = {
        $elemMatch: {
          'obstacles._id': itemId
        }
      }
    } else if (property === 'mediatingFactors') {
      filterData[property] = {
        $elemMatch: {
          'facilitators._id': itemId
        }
      }
    } else {
      filterData[property] = {
        $elemMatch: {
          _id: itemId
        }
      }
    }

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
