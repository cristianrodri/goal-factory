import { IOptimalAccountability } from '@/types'
import { Document, Schema, model, models } from 'mongoose'
import { toJSONTransform } from '@/utils/db'
import {
  findOneAndDeleteOrThrow,
  findOneAndUpdateOrThrow,
  findOneOrThrow,
  IBaseDocument,
  IBaseModel
} from '@/lib/baseSchema'
import uniqueValidator from 'mongoose-unique-validator'

// Define your main optimal accountability schema
interface IOptimalAccountabilityDocument
  extends IOptimalAccountability,
    IBaseDocument {}

interface IOptimalAccountabilityModel
  extends IBaseModel<IOptimalAccountabilityDocument> {}

const optimalAccountabilitySchema = new Schema<IOptimalAccountabilityDocument>({
  trustedPeople: [
    {
      name: {
        type: String,
        trim: true,
        minlength: [2, 'Trusted person must be at least 2 characters long'],
        maxlength: [200, 'Trusted person must be at most 200 characters long']
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
optimalAccountabilitySchema.index({ user: 1, bigGoal: 1 }, { unique: true })

optimalAccountabilitySchema.plugin(uniqueValidator, {
  message: 'Optimal accountability already exists for this big goal.'
})

// Use the transformation function within the toJSON method
optimalAccountabilitySchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

// Add static method directly to schema
optimalAccountabilitySchema.statics.findOneOrThrow =
  findOneOrThrow as IBaseModel<IOptimalAccountabilityDocument>['findOneOrThrow']

optimalAccountabilitySchema.statics.findOneAndUpdateOrThrow =
  findOneAndUpdateOrThrow as IBaseModel<IOptimalAccountabilityDocument>['findOneAndUpdateOrThrow']

optimalAccountabilitySchema.statics.findOneAndDeleteOrThrow =
  findOneAndDeleteOrThrow as IBaseModel<IOptimalAccountabilityDocument>['findOneAndDeleteOrThrow']

const OptimalAccountability =
  (models['OptimalAccountability'] as IOptimalAccountabilityModel) ||
  model<IOptimalAccountabilityDocument, IOptimalAccountabilityModel>(
    'OptimalAccountability',
    optimalAccountabilitySchema
  )

export default OptimalAccountability
