import { IGoal } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

const goalSchema = new Schema<IGoal>({
  type: {
    type: String,
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
    required: [true, 'Deadline is required']
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
  aspiration: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Aspiration'
  }
})

const Goal =
  (models['Goal'] as Model<IGoal>) || model<IGoal>('Goal', goalSchema)

export default Goal
