import { IVisualProspective } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

const visualProspectiveSchema = new Schema<IVisualProspective>({
  goalAchievedDescription: {
    type: String,
    trim: true,
    minlength: [
      2,
      'Goal achieved description must be at least 2 characters long'
    ],
    maxlength: [
      2000,
      'Goal achieved description must be at most 2000 characters long'
    ]
  },
  specificDeadline: {
    type: Date,
    validate: {
      validator(date: Date) {
        // Validate that the date is not before the current day
        const currentDate = new Date()
        return date > currentDate
      },
      message: 'Specific deadline cannot be before the current day'
    }
  },
  thingTodoGoal: {
    type: String,
    trim: true,
    minlength: [2, 'Thing to do goal must be at least 2 characters long'],
    maxlength: [2000, 'Thing to do goal must be at most 2000 characters long']
  },
  timeReduceIdeas: [
    {
      type: String,
      trim: true,
      minlength: [2, 'Time reduce idea must be at least 2 characters long'],
      maxlength: [1000, 'Time reduce idea must be at most 1000 characters long']
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

const VisualProspective =
  (models['VisualProspective'] as Model<IVisualProspective>) ||
  model<IVisualProspective>('VisualProspective', visualProspectiveSchema)

export default VisualProspective
