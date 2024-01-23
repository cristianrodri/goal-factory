import { IActivity } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

const activitySchema = new Schema<IActivity>({
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
  }
})

const Activity =
  (models['Activity'] as Model<IActivity>) ||
  model<IActivity>('Activity', activitySchema)

export default Activity
