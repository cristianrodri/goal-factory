import { IActivity } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Model, Schema, model, models } from 'mongoose'

const activitySchema = new Schema<IActivity>({
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [3, 'Description must be at least 3 characters long'],
    maxlength: [100, 'Description must be at most 100 characters long']
  },
  order: {
    type: Number,
    required: [true, 'Order is required'],
    min: [1, 'Order must be at least 1']
  },
  days: {
    type: {
      monday: {
        type: Boolean,
        default: false
      },
      tuesday: {
        type: Boolean,
        default: false
      },
      wednesday: {
        type: Boolean,
        default: false
      },
      thursday: {
        type: Boolean,
        default: false
      },
      friday: {
        type: Boolean,
        default: false
      },
      saturday: {
        type: Boolean,
        default: false
      },
      sunday: {
        type: Boolean,
        default: false
      }
    }
  },
  fallback: {
    type: String,
    minlength: [3, 'Fallback must be at least 3 characters long'],
    maxlength: [100, 'Fallback must be at most 100 characters long']
  },
  contingencies: [
    {
      badScenario: {
        type: String,
        required: [true, 'Bad scenario is required'],
        minlength: [3, 'Bad scenario must be at least 3 characters long'],
        maxlength: [100, 'Bad scenario must be at most 100 characters long']
      },
      alternative: {
        type: String,
        required: [true, 'Alternative is required'],
        minlength: [3, 'Alternative must be at least 3 characters long'],
        maxlength: [100, 'Alternative must be at most 100 characters long']
      }
    }
  ],
  diversionOrder: {
    type: Number,
    min: [1, 'Diversion order must be at least 1']
  },
  diversionIdeas: [
    {
      type: String,
      minlength: [3, 'Diversion idea must be at least 3 characters long'],
      maxlength: [100, 'Diversion idea must be at most 100 characters long']
    }
  ],
  goal: {
    type: Schema.Types.ObjectId,
    required: [true, 'Goal is required'],
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
activitySchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

const Activity =
  (models['Activity'] as Model<IActivity>) ||
  model<IActivity>('Activity', activitySchema)

export default Activity
