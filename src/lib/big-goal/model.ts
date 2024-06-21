import { Document, Model, Schema, model, models } from 'mongoose'
import Goal from '@/lib/goal/model'
import Activity from '@/lib/activity/model'
import GoalDairy from '@/lib/goal-dairy/model'
import GoalWeekly from '@/lib/goal-weekly/model'
import '@/lib/motivation-book/model'
import { IBigGoal } from '@/types'
import { WeekDay } from '@/utils/enums'
import { toJSONTransform } from '@/utils/db'
import MotivationBook from '@/lib/motivation-book/model'
import MotivationCalculation from '../motivation-calculation/model'
import VisualProspective from '@/lib/motivation-techniques/visual-prospective/model'
import OptimisticLevel from '@/lib/motivation-techniques/optimistic-level/model'
import WorstContext from '@/lib/motivation-techniques/worst-context/model'
import OptimalAccountability from '@/lib/motivation-techniques/optimal-accountability/model'
import PurposePassion from '@/lib/motivation-techniques/purpose-passion/model'
import TotalStructureFocus from '@/lib/motivation-techniques/total-structure-focus/model'
import OptimizedEnergy from '@/lib/motivation-techniques/optimized-energy/model'
import ContaminateTemptation from '@/lib/motivation-techniques/contaminate-temptation/model'
import InterruptionStimulus from '@/lib/motivation-techniques/interruption-stimulus/model'
import PreCommitment from '@/lib/motivation-techniques/pre-commitment/model'
import ReduceAlternative from '@/lib/motivation-techniques/reduce-alternative/model'
import AutomaticHabit from '@/lib/motivation-techniques/automatic-habit/model'

const MODERATING_FACTOR_MESSAGE_MIN_LENGTH =
  'Moderating factors can not be less than 2 characters'
const MODERATING_FACTOR_MESSAGE_MAX_LENGTH =
  'Moderating factors can not be more than 300 characters'
const FACILITATOR_MESSAGE_MIN_LENGTH =
  'Facilitator can not be less than 2 characters'
const FACILITATOR_MESSAGE_MAX_LENGTH =
  'Facilitator can not be more than 300 characters'

const bigGoalSchema = new Schema<IBigGoal>(
  {
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
    realDeadline: {
      type: Date,
      validate: {
        validator: function (value: Date) {
          // Check if the provided date is greater than or equal to the current day
          return value >= new Date()
        },
        message:
          'Real Deadline must be greater than or equal to the current day'
      }
    },
    activityAnalysis: [
      {
        activity: {
          type: String,
          trim: true,
          maxlength: [
            300,
            'Activity analysis can not be more than 300 characters'
          ],
          minlength: [2, 'Activity analysis can not be less than 2 characters']
        }
      }
    ],
    activitiesFrecuency: {
      type: String,
      trim: true,
      maxlength: [
        1000,
        'Activities frecuency can not be more than 1000 characters'
      ],
      minlength: [2, 'Activities frecuency can not be less than 2 characters'],
      default: ''
    },
    bigWhy: {
      type: String,
      trim: true,
      maxlength: [700, 'Big why can not be more than 700 characters'],
      minlength: [2, 'Big why can not be less than 2 characters'],
      default: ''
    },
    expectation: {
      type: String,
      trim: true,
      maxlength: [700, 'Expectation can not be more than 700 characters'],
      minlength: [2, 'Expectation can not be less than 2 characters'],
      default: ''
    },
    compromises: {
      1: {
        type: Boolean,
        default: false
      },
      2: {
        type: Boolean,
        default: false
      },
      3: {
        type: Boolean,
        default: false
      },
      4: {
        type: Boolean,
        default: false
      },
      5: {
        type: Boolean,
        default: false
      },
      6: {
        type: Boolean,
        default: false
      },
      7: {
        type: Boolean,
        default: false
      }
    },
    moderatingFactors: {
      1: [
        {
          factor: {
            type: String,
            trim: true,
            maxlength: [300, MODERATING_FACTOR_MESSAGE_MAX_LENGTH],
            minlength: [2, MODERATING_FACTOR_MESSAGE_MIN_LENGTH]
          }
        }
      ],
      2: [
        {
          factor: {
            type: String,
            trim: true,
            maxlength: [300, MODERATING_FACTOR_MESSAGE_MAX_LENGTH],
            minlength: [2, MODERATING_FACTOR_MESSAGE_MIN_LENGTH]
          }
        }
      ],
      3: [
        {
          factor: {
            type: String,
            trim: true,
            maxlength: [300, MODERATING_FACTOR_MESSAGE_MAX_LENGTH],
            minlength: [2, MODERATING_FACTOR_MESSAGE_MIN_LENGTH]
          }
        }
      ],
      4: [
        {
          factor: {
            type: String,
            trim: true,
            maxlength: [300, MODERATING_FACTOR_MESSAGE_MAX_LENGTH],
            minlength: [2, MODERATING_FACTOR_MESSAGE_MIN_LENGTH]
          }
        }
      ],
      5: [
        {
          factor: {
            type: String,
            trim: true,
            maxlength: [300, MODERATING_FACTOR_MESSAGE_MAX_LENGTH],
            minlength: [2, MODERATING_FACTOR_MESSAGE_MIN_LENGTH]
          }
        }
      ],
      6: [
        {
          factor: {
            type: String,
            trim: true,
            maxlength: [300, MODERATING_FACTOR_MESSAGE_MAX_LENGTH],
            minlength: [2, MODERATING_FACTOR_MESSAGE_MIN_LENGTH]
          }
        }
      ]
    },
    moderationFactorAlternatives: [
      {
        factor: {
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
      }
    ],
    facilitators: {
      1: [
        {
          facilitator: {
            type: String,
            trim: true,
            maxlength: [300, FACILITATOR_MESSAGE_MAX_LENGTH],
            minlength: [2, FACILITATOR_MESSAGE_MIN_LENGTH]
          }
        }
      ],
      2: [
        {
          facilitator: {
            type: String,
            trim: true,
            maxlength: [300, FACILITATOR_MESSAGE_MAX_LENGTH],
            minlength: [2, FACILITATOR_MESSAGE_MIN_LENGTH]
          }
        }
      ],
      3: [
        {
          facilitator: {
            type: String,
            trim: true,
            maxlength: [300, FACILITATOR_MESSAGE_MAX_LENGTH],
            minlength: [2, FACILITATOR_MESSAGE_MIN_LENGTH]
          }
        }
      ],
      4: [
        {
          facilitator: {
            type: String,
            trim: true,
            maxlength: [300, FACILITATOR_MESSAGE_MAX_LENGTH],
            minlength: [2, FACILITATOR_MESSAGE_MIN_LENGTH]
          }
        }
      ]
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
      1: {
        type: Boolean,
        default: false
      },
      2: {
        type: Boolean,
        default: false
      },
      3: {
        type: Boolean,
        default: false
      },
      4: {
        type: Boolean,
        default: false
      },
      5: {
        type: Boolean,
        default: false
      }
    },
    optimizingAspects: {
      1: {
        type: Boolean,
        default: false
      },
      2: {
        type: Boolean,
        default: false
      },
      3: {
        type: Boolean,
        default: false
      },
      4: {
        type: Boolean,
        default: false
      },
      5: {
        type: Boolean,
        default: false
      },
      6: {
        type: Boolean,
        default: false
      },
      7: {
        type: Boolean,
        default: false
      },
      8: {
        type: Boolean,
        default: false
      },
      9: {
        type: Boolean,
        default: false
      },
      10: {
        type: Boolean,
        default: false
      }
    },
    futureGoals: [
      {
        goal: {
          type: String,
          trim: true,
          maxlength: [300, 'Future goals can not be more than 300 characters'],
          minlength: [2, 'Future goals can not be less than 2 characters']
        }
      }
    ],
    bigReward: {
      type: String,
      trim: true,
      required: [true, 'Big reward is required'],
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
      required: [true, 'User is required'],
      ref: 'User'
    }
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
  }
)

// Define a virtual property to populate the associated goal
bigGoalSchema.virtual('goals', {
  ref: 'Goal', // Reference the Goal model
  localField: '_id', // Field from the BigGoal model
  foreignField: 'bigGoal' // Field from the Goal model
})

// Define a virtual property to populate the associated activity
bigGoalSchema.virtual('activities', {
  ref: 'Activity', // Reference the Activity model
  localField: '_id', // Field from the BigGoal model
  foreignField: 'bigGoal' // Field from the Activity model
})

// Define a virtual property to populate the associated goal dairy
bigGoalSchema.virtual('goalDairies', {
  ref: 'GoalDairy', // Reference the GoalDairy model
  localField: '_id', // Field from the BigGoal model
  foreignField: 'bigGoal' // Field from the GoalDairy model
})

bigGoalSchema.virtual('goalWeeklies', {
  ref: 'GoalWeekly', // Reference the GoalWeekly model
  localField: '_id', // Field from the BigGoal model
  foreignField: 'bigGoal' // Field from the GoalWeekly model
})

// Define a virtual property to populate the associated motivation book
bigGoalSchema.virtual('motivationBooks', {
  ref: 'MotivationBook', // Reference the GoalMotivationBook model
  localField: '_id', // Field from the BigGoal model
  foreignField: 'bigGoal' // Field from the GoalMotivationBook model
})

// Define a virtual property to populate the associated motivation calculation
bigGoalSchema.virtual('motivationCalculation', {
  ref: 'MotivationCalculation', // Reference the GoalMotivationCalculation model
  localField: '_id', // Field from the BigGoal model
  foreignField: 'bigGoal', // Field from the GoalMotivationCalculation model
  justOne: true
})

// Define a virtual property to populate the associated visual prospective
bigGoalSchema.virtual('visualProspective', {
  ref: 'VisualProspective', // Reference the GoalVisualProspective model
  localField: '_id', // Field from the BigGoal model
  foreignField: 'bigGoal', // Field from the GoalVisualProspective model
  justOne: true
})

// Define a virtual property to populate the associated optimistic level
bigGoalSchema.virtual('optimisticLevel', {
  ref: 'OptimisticLevel', // Reference the GoalOptimisticLevel model
  localField: '_id', // Field from the BigGoal model
  foreignField: 'bigGoal', // Field from the GoalOptimisticLevel model
  justOne: true
})

// Define a virtual property to populate the associated worst context
bigGoalSchema.virtual('worstContext', {
  ref: 'WorstContext', // Reference the GoalWorstContext model
  localField: '_id', // Field from the BigGoal model
  foreignField: 'bigGoal', // Field from the GoalWorstContext model
  justOne: true
})

// Define a virtual property to populate the associated optimal accountability
bigGoalSchema.virtual('optimalAccountability', {
  ref: 'OptimalAccountability', // Reference the GoalOptimalAccountability model
  localField: '_id', // Field from the BigGoal model
  foreignField: 'bigGoal', // Field from the GoalOptimalAccountability model
  justOne: true
})

// Define a virtual property to populate the associated purpose passion
bigGoalSchema.virtual('purposePassion', {
  ref: 'PurposePassion', // Reference the GoalPurposePassion model
  localField: '_id', // Field from the BigGoal model
  foreignField: 'bigGoal', // Field from the GoalPurposePassion model
  justOne: true
})

// Define a virtual property to populate the associated total structure focus
bigGoalSchema.virtual('totalStructureFocus', {
  ref: 'TotalStructureFocus', // Reference the GoalTotalStructureFocus model
  localField: '_id', // Field from the BigGoal model
  foreignField: 'bigGoal', // Field from the GoalTotalStructureFocus model
  justOne: true
})

// Define a virtual property to populate the associated optimized energy
bigGoalSchema.virtual('optimizedEnergy', {
  ref: 'OptimizedEnergy', // Reference the GoalOptimizedEnergy model
  localField: '_id', // Field from the BigGoal model
  foreignField: 'bigGoal', // Field from the GoalOptimizedEnergy model
  justOne: true
})

// Define a virtual property to populate the associated contaminate temptation
bigGoalSchema.virtual('contaminateTemptation', {
  ref: 'ContaminateTemptation', // Reference the GoalContaminateTemptation model
  localField: '_id', // Field from the BigGoal model
  foreignField: 'bigGoal', // Field from the GoalContaminateTemptation model
  justOne: true
})

// Define a virtual property to populate the associated interruption stimulus
bigGoalSchema.virtual('interruptionStimulus', {
  ref: 'InterruptionStimulus', // Reference the GoalInterruptionStimulus model
  localField: '_id', // Field from the BigGoal model
  foreignField: 'bigGoal', // Field from the GoalInterruptionStimulus model
  justOne: true
})

// Define a virtual property to populate the associated pre-commitment
bigGoalSchema.virtual('preCommitment', {
  ref: 'PreCommitment', // Reference the GoalPreCommitment model
  localField: '_id', // Field from the BigGoal model
  foreignField: 'bigGoal', // Field from the GoalPreCommitment model
  justOne: true
})

// Define a virtual property to populate the associated reduce alternative
bigGoalSchema.virtual('reduceAlternative', {
  ref: 'ReduceAlternative', // Reference the GoalReduceAlternative model
  localField: '_id', // Field from the BigGoal model
  foreignField: 'bigGoal', // Field from the GoalReduceAlternative model
  justOne: true
})

// Define a virtual property to populate the associated automatic habit
bigGoalSchema.virtual('automaticHabit', {
  ref: 'AutomaticHabit', // Reference the GoalAutomaticHabit model
  localField: '_id', // Field from the BigGoal model
  foreignField: 'bigGoal', // Field from the GoalAutomaticHabit model
  justOne: true
})

// Use the transformation function within the toJSON method
bigGoalSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

bigGoalSchema.pre('findOneAndDelete', async function () {
  // Remove all the associated goals
  const id = (this as unknown as Document)._id

  await Goal.deleteMany({ bigGoal: id })
  await Activity.deleteMany({ bigGoal: id })
  await GoalDairy.deleteMany({ bigGoal: id })
  await GoalWeekly.deleteMany({ bigGoal: id })
  await MotivationBook.deleteMany({ bigGoal: id })
  await MotivationCalculation.deleteOne({ bigGoal: id })
  await VisualProspective.deleteOne({ bigGoal: id })
  await OptimisticLevel.deleteOne({ bigGoal: id })
  await WorstContext.deleteOne({ bigGoal: id })
  await OptimalAccountability.deleteOne({ bigGoal: id })
  await PurposePassion.deleteOne({ bigGoal: id })
  await TotalStructureFocus.deleteOne({ bigGoal: id })
  await OptimizedEnergy.deleteOne({ bigGoal: id })
  await ContaminateTemptation.deleteOne({ bigGoal: id })
  await InterruptionStimulus.deleteOne({ bigGoal: id })
  await PreCommitment.deleteOne({ bigGoal: id })
  await ReduceAlternative.deleteOne({ bigGoal: id })
  await AutomaticHabit.deleteOne({ bigGoal: id })
})

const BigGoal =
  (models['BigGoal'] as Model<IBigGoal>) ||
  model<IBigGoal>('BigGoal', bigGoalSchema)

export default BigGoal
