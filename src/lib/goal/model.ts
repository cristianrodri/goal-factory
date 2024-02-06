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

const Goal =
  (models['Goal'] as Model<IGoal>) || model<IGoal>('Goal', goalSchema)

export default Goal
