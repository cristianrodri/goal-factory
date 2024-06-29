import { PropertyBigGoalArray } from '@/lib/big-goal/addArrayItem'
import { filterQuery } from '@/lib/big-goal/filter-query'
import BigGoal from '@/lib/big-goal/model'
import { privateApi } from '@/utils/api'
import { Param } from '@/utils/enums'
import { errorResponse, successResponse } from '@/utils/response'
import { getParam } from '@/utils/url'

export const DELETE = privateApi<unknown, { id: string }>(
  async (user, { params, req }) => {
    const property = getParam(req, 'property') as PropertyBigGoalArray
    const itemId = getParam(req, Param.ID)

    if (!itemId) {
      return errorResponse('Item ID is required')
    }

    if (!property) {
      return errorResponse('Property is required')
    }

    const filterData = filterQuery(property, itemId)

    const deletedPropertyItem = `${property}${
      property === 'moderatingFactors' ? '.$.obstacles' : ''
    }${property === 'mediatingFactors' ? '.$.facilitators' : ''}`

    // Delete item with itemId
    const bigGoal = await BigGoal.findOneAndUpdateOrThrow(
      { user, _id: params.id, ...filterData },
      {
        $pull: {
          [deletedPropertyItem]: { _id: itemId }
        }
      }
    )

    return successResponse({ [property]: bigGoal[property] })
  }
)
