import { IActivity } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

const activitySchema = new Schema<IActivity>({
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [3, 'Description must be at least 3 characters long'],
    maxlength: [100, 'Description must be at most 100 characters long']
  },
  order: {
    type: Number,
    required: [true, 'Order is required']
  },
  done: {
    type: Boolean,
    default: false
  },
  repeat: {
    type: Boolean
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
  goal: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Goal'
  },
  aspiration: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Aspiration'
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

// Pre-save hook to set all days to false if repeat is false
activitySchema.pre('save', function (next) {
  if (!this.repeat) {
    this.days = {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    }
  }
  next()
})

const Activity =
  (models['Activity'] as Model<IActivity>) ||
  model<IActivity>('Activity', activitySchema)

export default Activity
