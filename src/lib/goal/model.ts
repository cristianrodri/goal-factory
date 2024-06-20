import { IGoal } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { GoalType } from '@/utils/enums'
import { Document, Model, Schema, model, models } from 'mongoose'

const goalSchema = new Schema<IGoal>({
  type: {
    type: String,
    enum: {
      values: Object.values(GoalType),
      message: 'Invalid goal type.'
    },
    required: [true, 'Goal type is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [300, 'Description must not exceed 300 characters'],
    minlength: [2, 'Description must be at least 2 characters long']
  },
  startsOn: {
    type: Date,
    default: Date.now,
    validate: {
      validator: function (value: Date) {
        // Check if the provided date is greater than or equal to the current day
        return value >= new Date()
      },
      message: 'Start date must be greater than or equal to the current day'
    }
  },
  optimisticDeadline: {
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
  realDeadline: {
    type: Date,
    validate: {
      validator: function (value: Date) {
        // Check if the provided date is greater than or equal to the current day
        return value >= new Date()
      },
      message: 'Real Deadline must be greater than or equal to the current day'
    }
  },
  progress: {
    type: Number,
    default: 0
  },
  basicAspects: {
    1: Boolean,
    2: Boolean,
    3: Boolean,
    4: Boolean,
    5: Boolean
  },
  optimizingAspects: {
    1: Boolean,
    2: Boolean,
    3: Boolean,
    4: Boolean,
    5: Boolean,
    6: Boolean,
    7: Boolean,
    8: Boolean,
    9: Boolean,
    10: Boolean
  },
  difficulty: {
    type: Number,
    min: 1,
    max: 10
  },
  challenge: {
    type: Number,
    min: 1,
    max: 10
  },
  specific: {
    type: Number,
    min: 1,
    max: 10
  },
  directed: {
    type: Number,
    min: 1,
    max: 10
  },
  immediate: {
    type: Number,
    min: 1,
    max: 10
  },
  achieved: {
    type: Boolean,
    default: false
  },
  parentGoal: {
    type: Schema.Types.ObjectId,
    ref: 'Goal'
  },
  bigGoal: {
    type: Schema.Types.ObjectId,
    required: [true, 'Big goal is required'],
    ref: 'BigGoal'
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is required'],
    ref: 'User'
  }
})

// Use the transformation function within the toJSON method
goalSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

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
  foreignField: 'parentGoal' // the field in the referenced model that matches the localField
})

const Goal =
  (models['Goal'] as Model<IGoal>) || model<IGoal>('Goal', goalSchema)

export default Goal
