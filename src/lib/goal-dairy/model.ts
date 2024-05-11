import { IGoalDairy } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

const goalDairySchema = new Schema<IGoalDairy>({
  activities: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Activity'
    }
  ],
  contingences: [
    {
      type: String,
      minlength: [3, 'Contingence must be at least 3 characters long'],
      maxlength: [100, 'Contingence must be at most 100 characters long']
    }
  ],
  alternativeStrategies: [
    {
      type: String,
      minlength: [3, 'Alternative strategy must be at least 3 characters long'],
      maxlength: [
        100,
        'Alternative strategy must be at most 100 characters long'
      ]
    }
  ],
  conclusions: [
    {
      type: String,
      minlength: [3, 'Conclusion must be at least 3 characters long'],
      maxlength: [100, 'Conclusion must be at most 100 characters long']
    }
  ],
  improvements: [
    {
      type: String,
      minlength: [3, 'Improvement must be at least 3 characters long'],
      maxlength: [100, 'Improvement must be at most 100 characters long']
    }
  ],
  reward: {
    type: String,
    required: [true, 'Reward is required'],
    minlength: [3, 'Reward must be at least 3 characters long'],
    maxlength: [50, 'Reward must be at most 100 characters long']
  },
  date: {
    type: Date,
    default: Date.now
  },
  goal: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Goal'
  },
  bigGoal: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Big Goal'
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

const GoalDairy =
  (models['GoalDairy'] as Model<IGoalDairy>) ||
  model<IGoalDairy>('GoalDairy', goalDairySchema)

export default GoalDairy
