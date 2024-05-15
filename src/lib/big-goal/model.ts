import { Document, Model, Schema, model, models } from 'mongoose'
import Goal from '../goal/model'
import Activity from '../activity/model'
import GoalDairy from '../goal-dairy/model'
import GoalWeekly from '../goal-weekly/model'
import { IBigGoal } from '@/types'
import { WeekDay } from '@/utils/enums'

const bigGoalSchema = new Schema<IBigGoal>({
  generalResult: {
    type: String,
    required: [true, 'General result is required'],
    trim: true,
    maxlength: [500, 'General result can not be more than 500 characters'],
    minlength: [2, 'General result can not be less than 2 characters']
  },
  specificResult: {
    type: String,
    required: [true, 'Specific result is required'],
    trim: true,
    maxlength: [500, 'Specific result can not be more than 500 characters'],
    minlength: [2, 'Specific result can not be less than 2 characters']
  },
  realDeadline: {
    type: Date,
    validate: {
      validator: function (value: Date) {
        // Check if the provided date is greater than or equal to the current day
        return value >= new Date()
      },
      message: 'Real Deadline must be greater than or equal to the current day'
    }
  },
  optimisticDeadline: {
    type: Date,
    required: [true, 'Deadline is required'],
    validate: {
      validator: function (value: Date) {
        // Check if the provided date is greater than or equal to the current day
        return value >= new Date()
      },
      message: 'Deadline must be greater than or equal to the current day'
    }
  },
  activityAnalysis: [
    {
      type: String,
      trim: true,
      maxlength: [300, 'Activity analysis can not be more than 300 characters'],
      minlength: [2, 'Activity analysis can not be less than 2 characters']
    }
  ],
  activitiesFrecuency: {
    type: String,
    trim: true,
    maxlength: [
      1000,
      'Activities frecuency can not be more than 1000 characters'
    ],
    minlength: [2, 'Activities frecuency can not be less than 2 characters']
  },
  bigWhy: {
    type: String,
    trim: true,
    maxlength: [700, 'Big why can not be more than 700 characters'],
    minlength: [2, 'Big why can not be less than 2 characters']
  },
  expectation: {
    type: String,
    trim: true,
    maxlength: [700, 'Expectation can not be more than 700 characters'],
    minlength: [2, 'Expectation can not be less than 2 characters']
  },
  compromises: {
    type: Map,
    of: Boolean
  },
  moderatingFactors: {
    type: Map,
    of: [String]
  },
  moderationFactorAlternatives: [
    {
      type: String,
      trim: true,
      maxlength: [
        300,
        'Moderation factor alternatives can not be more than 300 characters'
      ],
      minlength: [
        2,
        'Moderation factor alternatives can not be less than 2 characters'
      ]
    }
  ],
  facilitators: {
    type: Map,
    of: [String]
  },
  goalWeeklyDay: {
    type: String,
    enum: {
      values: Object.values(WeekDay),
      message: 'Invalid goal type.'
    },
    required: [true, 'Week day is required']
  },
  basicAspects: {
    type: Map,
    of: Boolean
  },
  optimizingAspects: {
    type: Map,
    of: Boolean
  },
  futureGoals: [
    {
      type: String,
      trim: true,
      maxlength: [300, 'Future goals can not be more than 300 characters'],
      minlength: [2, 'Future goals can not be less than 2 characters']
    }
  ],
  bigReward: {
    type: String,
    trim: true,
    maxlength: [200, 'Big reward can not be more than 200 characters'],
    minlength: [2, 'Big reward can not be less than 2 characters']
  },
  rewardWasTaken: {
    type: Boolean,
    default: false
  },
  achieved: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

// Define a virtual property to populate the associated goal
bigGoalSchema.virtual('goals', {
  ref: 'Goal', // Reference the Goal model
  localField: '_id', // Field from the BigGoal model
  foreignField: 'bigGoal' // Field from the Goal model
})

bigGoalSchema.pre('findOneAndDelete', async function () {
  // Remove all the associated goals
  const id = (this as unknown as Document)._id

  await Goal.deleteMany({ bigGoal: id })
  await Activity.deleteMany({ bigGoal: id })
  await GoalDairy.deleteMany({ bigGoal: id })
  await GoalWeekly.deleteMany({ bigGoal: id })
})

const BigGoal =
  (models['BigGoal'] as Model<IBigGoal>) ||
  model<IBigGoal>('BigGoal', bigGoalSchema)

export default BigGoal
