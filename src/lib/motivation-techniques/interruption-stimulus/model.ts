import {
  findOneAndDeleteOrThrow,
  findOneAndUpdateOrThrow,
  findOneOrThrow,
  IBaseDocument,
  IBaseModel
} from '@/lib/baseSchema'
import { IInterruptionStimulus } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Schema, model, models } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

// Define your main impulse schema
interface IInterruptionStimulusDocument
  extends IInterruptionStimulus,
    IBaseDocument {}

interface IInterruptionStimulusModel
  extends IBaseModel<IInterruptionStimulusDocument> {}

const interruptionStimulusSchema = new Schema<IInterruptionStimulusDocument>({
  externalReminders: [
    {
      reminder: {
        type: String,
        required: [true, 'Reminder is required'],
        trim: true,
        minlength: [2, 'Reminder must be at least 2 character long'],
        maxlength: [500, 'Reminder must be at most 500 character long']
      },
      impacts: [
        {
          impact: {
            type: Number,
            required: [true, 'Impact is required'],
            min: [1, 'Impact must be at least 1'],
            max: [10, 'Impact must be at most 10']
          },
          date: {
            type: Date,
            default: Date.now
          }
        }
      ]
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

interruptionStimulusSchema.index({ user: 1, bigGoal: 1 }, { unique: true })

interruptionStimulusSchema.plugin(uniqueValidator, {
  message: 'Interruption stimulus already exists for this big goal.'
})

// Use the transformation function within the toJSON method
interruptionStimulusSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

// Add static method directly to schema
interruptionStimulusSchema.statics.findOneOrThrow =
  findOneOrThrow as IBaseModel<IInterruptionStimulusDocument>['findOneOrThrow']

interruptionStimulusSchema.statics.findOneAndUpdateOrThrow =
  findOneAndUpdateOrThrow as IBaseModel<IInterruptionStimulusDocument>['findOneAndUpdateOrThrow']

interruptionStimulusSchema.statics.findOneAndDeleteOrThrow =
  findOneAndDeleteOrThrow as IBaseModel<IInterruptionStimulusDocument>['findOneAndDeleteOrThrow']

const InterruptionStimulus =
  (models['InterruptionStimulus'] as IInterruptionStimulusModel) ||
  model<IInterruptionStimulusDocument, IInterruptionStimulusModel>(
    'InterruptionStimulus',
    interruptionStimulusSchema
  )

export default InterruptionStimulus
