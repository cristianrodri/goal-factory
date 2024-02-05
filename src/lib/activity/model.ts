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
    type: Boolean,
    default: false
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
  }
})

const Activity =
  (models['Activity'] as Model<IActivity>) ||
  model<IActivity>('Activity', activitySchema)

export default Activity
