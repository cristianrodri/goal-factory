import {
  findOneAndDeleteOrThrow,
  findOneAndUpdateOrThrow,
  findOneOrThrow,
  IBaseDocument,
  IBaseModel
} from '@/lib/baseSchema'
import { IPreCommitment } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Schema, model, models } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

// Define your main pre-commitment schema
interface IPreCommitmentDocument extends IPreCommitment, IBaseDocument {}

interface IPreCommitmentModel extends IBaseModel<IPreCommitmentDocument> {}

const preCommitmentSchema = new Schema<IPreCommitmentDocument>({
  preCommitments: [
    {
      commitment: {
        type: String,
        trim: true,
        minlength: [2, 'Pre-commitment must be at least 2 character long'],
        maxlength: [1000, 'Pre-commitment must be at most 1000 character long']
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
preCommitmentSchema.index({ user: 1, bigGoal: 1 }, { unique: true })

// Use the unique validator plugin
preCommitmentSchema.plugin(uniqueValidator, {
  message: 'Pre-commitment already exists for this big goal.'
})

// Use the transformation function within the toJSON method
preCommitmentSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

// Add static method directly to schema
preCommitmentSchema.statics.findOneOrThrow =
  findOneOrThrow as IBaseModel<IPreCommitmentDocument>['findOneOrThrow']

preCommitmentSchema.statics.findOneAndUpdateOrThrow =
  findOneAndUpdateOrThrow as IBaseModel<IPreCommitmentDocument>['findOneAndUpdateOrThrow']

preCommitmentSchema.statics.findOneAndDeleteOrThrow =
  findOneAndDeleteOrThrow as IBaseModel<IPreCommitmentDocument>['findOneAndDeleteOrThrow']

const PreCommitment =
  (models['PreCommitment'] as IPreCommitmentModel) ||
  model<IPreCommitmentDocument, IPreCommitmentModel>(
    'PreCommitment',
    preCommitmentSchema
  )

export default PreCommitment
