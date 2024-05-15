import { IOptimisticLevel } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

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

const OptimisticLevel =
  (models['OptimisticLevel'] as Model<IOptimisticLevel>) ||
  model<IOptimisticLevel>('OptimisticLevel', optimisticLevelSchema)

export default OptimisticLevel
