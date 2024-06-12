import {
  findOneAndDeleteOrThrow,
  findOneAndUpdateOrThrow,
  findOneOrThrow,
  IBaseDocument,
  IBaseModel
} from '@/lib/baseSchema'
import { IPurposePassion } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Schema, model, models } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

// Define your main purpose passion schema
interface IPurposePassionDocument extends IPurposePassion, IBaseDocument {}

interface IPurposePassionModel extends IBaseModel<IPurposePassionDocument> {}

const purposePassionSchema = new Schema<IPurposePassionDocument>({
  dailyActivities: [
    {
      activity: {
        type: String,
        required: [true, 'Activity is required'],
        trim: true
      },
      enjoyment: {
        type: Number,
        required: [true, 'Enjoyment is required'],
        min: [1, 'Enjoyment must be at least 1'],
        max: [10, 'Enjoyment must be at most 10']
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
purposePassionSchema.index({ user: 1, bigGoal: 1 }, { unique: true })

// Use the unique validator plugin
purposePassionSchema.plugin(uniqueValidator, {
  message: 'Purpose passion already exists for this big goal'
})

// Use the transformation function within the toJSON method
purposePassionSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

// Add static method directly to schema
purposePassionSchema.statics.findOneOrThrow =
  findOneOrThrow as IBaseModel<IPurposePassionDocument>['findOneOrThrow']

purposePassionSchema.statics.findOneAndUpdateOrThrow =
  findOneAndUpdateOrThrow as IBaseModel<IPurposePassionDocument>['findOneAndUpdateOrThrow']

purposePassionSchema.statics.findOneAndDeleteOrThrow =
  findOneAndDeleteOrThrow as IBaseModel<IPurposePassionDocument>['findOneAndDeleteOrThrow']

const PurposePassion =
  (models['PurposePassion'] as IPurposePassionModel) ||
  model<IPurposePassionDocument, IPurposePassionModel>(
    'PurposePassion',
    purposePassionSchema
  )

export default PurposePassion
