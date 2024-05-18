import { IOptimizedEnergy } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Model, Schema, model, models } from 'mongoose'

const optimizedEnergySchema = new Schema<IOptimizedEnergy>({
  energyLevels: [
    {
      time: {
        type: Date,
        required: [true, 'Time is required']
      },
      level: {
        type: Number,
        required: [true, 'Level is required'],
        min: [1, 'Level must be at least 1'],
        max: [10, 'Level must be at most 10']
      }
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
optimizedEnergySchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

const OptimizedEnergy =
  (models['OptimizedEnergy'] as Model<IOptimizedEnergy>) ||
  model<IOptimizedEnergy>('OptimizedEnergy', optimizedEnergySchema)

export default OptimizedEnergy
