import { IOptimisticLevel } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Model, Schema, model, models } from 'mongoose'

const optimisticLevelSchema = new Schema<IOptimisticLevel>({
  improvements: [
    {
      type: String,
      trim: true,
      minlength: [2, 'Improvement must be at least 2 characters long'],
      maxlength: [200, 'Improvement must be at most 200 characters long']
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is required'],
    ref: 'User'
  },
  bigGoal: {
    type: Schema.Types.ObjectId,
    required: [true, 'Big goal is required'],
    ref: 'BigGoal'
  }
})

// Use the transformation function within the toJSON method
optimisticLevelSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

const OptimisticLevel =
  (models['OptimisticLevel'] as Model<IOptimisticLevel>) ||
  model<IOptimisticLevel>('OptimisticLevel', optimisticLevelSchema)

export default OptimisticLevel
