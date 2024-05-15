import { IGoalWeekly } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

const goalWeeklySchema = new Schema<IGoalWeekly>({
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  goals: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Goal'
    }
  ],
  weeklyProgress: {
    type: Number,
    default: 0,
    min: [0, 'Weekly progress must be at least 0'],
    max: [100, 'Weekly progress must be at most 100']
  },
  achievements: [
    {
      type: String,
      minlength: [3, 'Achievement must be at least 3 characters long'],
      maxlength: [100, 'Achievement must be at most 100 characters long']
    }
  ],
  reward: {
    type: String,
    minlength: [3, 'Reward must be at least 3 characters long'],
    maxlength: [100, 'Reward must be at most 100 characters long']
  },
  rewardWasTaken: {
    type: Boolean,
    default: false
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

const GoalWeekly =
  (models['GoalWeekly'] as Model<IGoalWeekly>) ||
  model<IGoalWeekly>('GoalWeekly', goalWeeklySchema)

export default GoalWeekly
