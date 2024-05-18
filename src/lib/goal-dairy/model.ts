import { IGoalDairy } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Model, Schema, model, models } from 'mongoose'

const goalDairySchema = new Schema<IGoalDairy>({
  date: {
    type: Date
  },
  activities: [
    {
      activity: {
        type: Schema.Types.ObjectId,
        ref: 'Activity'
      },
      description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [3, 'Description must be at least 3 characters long'],
        maxlength: [100, 'Description must be at most 100 characters long']
      },
      done: {
        type: Boolean,
        default: false
      }
    }
  ],
  conclusions: [
    {
      type: String,
      minlength: [2, 'Conclusion must be at least 2 characters long'],
      maxlength: [200, 'Conclusion must be at most 200 characters long']
    }
  ],
  improvements: [
    {
      type: String,
      minlength: [2, 'Improvement must be at least 2 characters long'],
      maxlength: [200, 'Improvement must be at most 200 characters long']
    }
  ],
  achievements: [
    {
      type: String,
      minlength: [2, 'Achievement must be at least 2 characters long'],
      maxlength: [200, 'Achievement must be at most 200 characters long']
    }
  ],
  reward: {
    type: String,
    minlength: [2, 'Reward must be at least 2 characters long'],
    maxlength: [50, 'Reward must be at most 100 characters long']
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

// Use the transformation function within the toJSON method
goalDairySchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

const GoalDairy =
  (models['GoalDairy'] as Model<IGoalDairy>) ||
  model<IGoalDairy>('GoalDairy', goalDairySchema)

export default GoalDairy
