import { IOptimizedEnergy } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

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
    required: true,
    ref: 'User'
  },
  bigGoal: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'BigGoal'
  }
})

const OptimizedEnergy =
  (models['OptimizedEnergy'] as Model<IOptimizedEnergy>) ||
  model<IOptimizedEnergy>('OptimizedEnergy', optimizedEnergySchema)

export default OptimizedEnergy
