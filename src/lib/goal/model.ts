import { IGoal } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { GoalType } from '@/utils/enums'
import { Document, Model, Schema, model, models } from 'mongoose'
import {
  basicAspectsSchema,
  optimizingAspectsSchema
} from '@/lib/inner-schemas/basic-aspects/model'
import { rediSchema } from '@/lib/inner-schemas/redi/model'
import moment from 'moment'

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
        return moment(value) > moment().startOf('day')
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
    type: basicAspectsSchema,
    default: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false
    }
  },
  optimizingAspects: {
    type: optimizingAspectsSchema,
    default: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
      10: false
    }
  },
  difficulty: {
    type: Number,
    min: [1, 'Difficulty must be at least 1'],
    max: [10, 'Difficulty must not exceed 10']
  },
  redi: rediSchema,
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
