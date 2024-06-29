import { FilterQuery } from 'mongoose'
import { PropertyBigGoalArray } from './addArrayItem'
import { IBigGoal } from '@/types'

export const filterQuery = (property: PropertyBigGoalArray, itemId: string) => {
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

  return filterData
}
