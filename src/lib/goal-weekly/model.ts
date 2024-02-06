import { IGoalWeekly } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

const goalWeeklySchema = new Schema<IGoalWeekly>({
  goals: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Goal'
    }
  ],
  weeklyProgress: {
    type: Number,
    default: 0
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
    required: [true, 'Reward is required'],
    minlength: [3, 'Reward must be at least 3 characters long'],
    maxlength: [50, 'Reward must be at most 100 characters long']
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

const GoalWeekly =
  (models['GoalWeekly'] as Model<IGoalWeekly>) ||
  model<IGoalWeekly>('GoalWeekly', goalWeeklySchema)

export default GoalWeekly
