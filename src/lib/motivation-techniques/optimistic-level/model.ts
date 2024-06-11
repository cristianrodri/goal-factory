import {
  findOneAndDeleteOrThrow,
  findOneAndUpdateOrThrow,
  findOneOrThrow,
  IBaseDocument,
  IBaseModel
} from '@/lib/baseSchema'
import { IOptimisticLevel } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Schema, model, models } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

// Define your main optimistic level schema
interface IOptimisticLevelDocument extends IOptimisticLevel, IBaseDocument {}

interface IOptimisticLevelModel extends IBaseModel<IOptimisticLevelDocument> {}

const optimisticLevelSchema = new Schema<IOptimisticLevelDocument>({
  improvements: [
    {
      description: {
        type: String,
        trim: true,
        minlength: [2, 'Improvement must be at least 2 characters long'],
        maxlength: [200, 'Improvement must be at most 200 characters long']
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
optimisticLevelSchema.index({ user: 1, bigGoal: 1 }, { unique: true })

optimisticLevelSchema.plugin(uniqueValidator, {
  message: 'Optimistic level already exists for this big goal.'
})

// Add static method directly to schema
optimisticLevelSchema.statics.findOneOrThrow =
  findOneOrThrow as IBaseModel<IOptimisticLevelDocument>['findOneOrThrow']

optimisticLevelSchema.statics.findOneAndUpdateOrThrow =
  findOneAndUpdateOrThrow as IBaseModel<IOptimisticLevelDocument>['findOneAndUpdateOrThrow']

optimisticLevelSchema.statics.findOneAndDeleteOrThrow =
  findOneAndDeleteOrThrow as IBaseModel<IOptimisticLevelDocument>['findOneAndDeleteOrThrow']

// Use the transformation function within the toJSON method
optimisticLevelSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

const OptimisticLevel =
  (models['OptimisticLevel'] as IOptimisticLevelModel) ||
  model<IOptimisticLevelDocument, IOptimisticLevelModel>(
    'OptimisticLevel',
    optimisticLevelSchema
  )

export default OptimisticLevel
