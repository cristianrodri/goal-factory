import { IInterruptionStimulus } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

const interruptionStimulusSchema = new Schema<IInterruptionStimulus>({
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
            min: 1,
            max: 10
          },
          date: {
            type: Date,
            required: [true, 'Date is required']
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

const InterruptionStimulus =
  (models['InterruptionStimulus'] as Model<IInterruptionStimulus>) ||
  model<IInterruptionStimulus>(
    'InterruptionStimulus',
    interruptionStimulusSchema
  )

export default InterruptionStimulus
