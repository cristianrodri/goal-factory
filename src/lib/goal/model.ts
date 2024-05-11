import { IGoal } from '@/types'
import { GOALTYPE } from '@/utils/enums'
import { Model, Schema, model, models } from 'mongoose'

const goalSchema = new Schema<IGoal>({
  type: {
    type: String,
    enum: {
      values: Object.values(GOALTYPE),
      message: 'Invalid goal type.'
    },
    required: [true, 'Goal type is required'],
    trim: true,
    maxlength: 100,
    minlength: 2
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: 100,
    minlength: 2
  },
  deadline: {
    type: Date,
    required: [true, 'Deadline is required'],
    validate: {
      validator: function (value: Date) {
        // Check if the provided date is greater than or equal to the current day
        return value >= new Date()
      },
      message: 'Deadline must be greater than or equal to the current day'
    }
  },
  active: {
    type: Boolean,
    default: false
  },
  reached: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    default: 0
  },
  order: {
    type: Number,
    required: [true, 'Order is required']
  },
  goal: {
    type: Schema.Types.ObjectId,
    ref: 'Goal'
  },
  bigGoal: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Big Goal'
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

// Define a virtual property to populate the associated activity
goalSchema.virtual('activities', {
  ref: 'Activity', // Reference the Activity model
  localField: '_id', // Field from the Goal model
  foreignField: 'goal' // Field from the Activity model
})

// Define a virtual schema for inner goals
goalSchema.virtual('innerGoals', {
  ref: 'Goal', // reference the same model
  localField: '_id', // the local field that contains the ID of the document
  foreignField: 'goal' // the field in the referenced model that matches the localField
})

const Goal =
  (models['Goal'] as Model<IGoal>) || model<IGoal>('Goal', goalSchema)

export default Goal
