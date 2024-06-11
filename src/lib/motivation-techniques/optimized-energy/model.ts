import {
  findOneAndDeleteOrThrow,
  findOneAndUpdateOrThrow,
  findOneOrThrow,
  IBaseDocument,
  IBaseModel
} from '@/lib/baseSchema'
import { IOptimizedEnergy } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Schema, model, models } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

// Define your main optimized energy schema
interface IOptimizedEnergyDocument extends IOptimizedEnergy, IBaseDocument {}

interface IOptimizedEnergyModel extends IBaseModel<IOptimizedEnergyDocument> {}

const optimizedEnergySchema = new Schema<IOptimizedEnergyDocument>({
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

// Index the user and big goal fields
optimizedEnergySchema.index({ user: 1, bigGoal: 1 }, { unique: true })

optimizedEnergySchema.plugin(uniqueValidator, {
  message: 'Optimized energy already exists for this big goal.'
})

// Use the transformation function within the toJSON method
optimizedEnergySchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

// Add static method directly to schema
optimizedEnergySchema.statics.findOneOrThrow =
  findOneOrThrow as IBaseModel<IOptimizedEnergyDocument>['findOneOrThrow']

optimizedEnergySchema.statics.findOneAndUpdateOrThrow =
  findOneAndUpdateOrThrow as IBaseModel<IOptimizedEnergyDocument>['findOneAndUpdateOrThrow']

optimizedEnergySchema.statics.findOneAndDeleteOrThrow =
  findOneAndDeleteOrThrow as IBaseModel<IOptimizedEnergyDocument>['findOneAndDeleteOrThrow']

const OptimizedEnergy =
  (models['OptimizedEnergy'] as IOptimizedEnergyModel) ||
  model<IOptimizedEnergyDocument, IOptimizedEnergyModel>(
    'OptimizedEnergy',
    optimizedEnergySchema
  )

export default OptimizedEnergy
