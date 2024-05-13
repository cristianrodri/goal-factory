import { Document, Model, Schema, model, models } from 'mongoose'
import Goal from '../goal/model'
import Activity from '../activity/model'
import GoalDairy from '../goal-dairy/model'
import GoalWeekly from '../goal-weekly/model'
import { IBigGoal } from '@/types'

const bigGoalSchema = new Schema<IBigGoal>({
  generalResult: {
    type: String,
    required: [true, 'General result is required'],
    trim: true,
    maxlength: 100,
    minlength: 2
  },
  specificResult: {
    type: String,
    required: [true, 'Specific result is required'],
    trim: true,
    maxlength: 100,
    minlength: 2
  },
  // deadline: {
  //   type: Date,
  //   required: [true, 'Deadline is required'],
  //   validate: {
  //     validator: function (value: Date) {
  //       // Check if the provided date is greater than or equal to the current day
  //       return value >= new Date()
  //     },
  //     message: 'Deadline must be greater than or equal to the current day'
  //   }
  // },
  // reached: {
  //   type: Boolean,
  //   default: false
  // },
  bigReward: {
    type: String,
    required: [true, 'Big reward is required'],
    trim: true,
    maxlength: 100,
    minlength: 2
  },
  // progress: {
  //   type: Number,
  //   default: 0
  // },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

// Define a virtual property to populate the associated goal
bigGoalSchema.virtual('goals', {
  ref: 'Goal', // Reference the Goal model
  localField: '_id', // Field from the Aspiration model
  foreignField: 'aspiration' // Field from the Goal model
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
