import { IFutureGoal } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Schema } from 'mongoose'

export const futureGoalsSchema = new Schema<IFutureGoal>({
  goal: {
    type: String,
    trim: true,
    maxlength: [300, 'Future goals can not be more than 300 characters'],
    minlength: [2, 'Future goals can not be less than 2 characters']
  }
})

// Use the transformation function within the toJSON method
futureGoalsSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}
