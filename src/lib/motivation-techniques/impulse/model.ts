import {
  findOneAndDeleteOrThrow,
  findOneAndUpdateOrThrow,
  findOneOrThrow,
  IBaseDocument,
  IBaseModel
} from '@/lib/baseSchema'
import { IImpulse } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Schema, model, models } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

// Define your main impulse schema
interface IImpulseDocument extends IImpulse, IBaseDocument {}

interface IImpulseModel extends IBaseModel<IImpulseDocument> {}

// Custom URL validator function
const urlValidator = (value: string) => {
  const urlRegex =
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/
  return urlRegex.test(value)
}

const impulseSchema = new Schema<IImpulseDocument>({
  videoLink: {
    type: String,
    required: [true, 'Video link is required'],
    trim: true,
    maxlength: [300, 'Video link must be less than 300 characters'],
    validate: {
      validator: urlValidator,
      message: 'Invalid URL format'
    }
  },
  rates: [
    {
      description: {
        type: String,
        trim: true,
        maxlength: [100, 'Description must be less than 100 characters'],
        default: 'No description'
      },
      rate: {
        type: Number,
        required: [true, 'Rate is required'],
        min: [1, 'Rate must be at least 1'],
        max: [10, 'Rate must be at most 10']
      },
      time: {
        type: Date,
        default: Date.now
      }
    }
  ],
  isShown: {
    type: Boolean,
    default: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is required'],
    ref: 'User'
  }
})

impulseSchema.index({ user: 1, videoLink: 1 }, { unique: true })

impulseSchema.plugin(uniqueValidator, { message: 'Impulse already exists' })

// Use the transformation function within the toJSON method
impulseSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

// Add static method directly to schema
impulseSchema.statics.findOneOrThrow =
  findOneOrThrow as IBaseModel<IImpulseDocument>['findOneOrThrow']

impulseSchema.statics.findOneAndUpdateOrThrow =
  findOneAndUpdateOrThrow as IBaseModel<IImpulseDocument>['findOneAndUpdateOrThrow']

impulseSchema.statics.findOneAndDeleteOrThrow =
  findOneAndDeleteOrThrow as IBaseModel<IImpulseDocument>['findOneAndDeleteOrThrow']

const Impulse =
  (models['Impulse'] as IImpulseModel) ||
  model<IImpulseDocument, IImpulseModel>('Impulse', impulseSchema)

export default Impulse
