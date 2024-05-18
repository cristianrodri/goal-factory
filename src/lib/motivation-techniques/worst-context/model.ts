import { IWorstContext } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Model, Schema, model, models } from 'mongoose'

const worstContextSchema = new Schema<IWorstContext>({
  contingencies: [
    {
      badScenario: {
        type: String,
        required: [true, 'Bad scenario is required'],
        trim: true,
        minlength: [2, 'Bad scenario must be at least 2 characters long'],
        maxlength: [200, 'Bad scenario must be at most 200 characters long']
      },
      alternative: {
        type: String,
        required: [true, 'Alternative is required'],
        trim: true,
        minlength: [2, 'Alternative must be at least 2 characters long'],
        maxlength: [1000, 'Alternative must be at most 200 characters long']
      }
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is required'],
    ref: 'User'
  },
  bigGoal: {
    type: Schema.Types.ObjectId,
    required: [true, 'Big goal is required'],
    ref: 'BigGoal'
  }
})

// Use the transformation function within the toJSON method
worstContextSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

const WorstContext =
  (models['WorstContext'] as Model<IWorstContext>) ||
  model<IWorstContext>('WorstContext', worstContextSchema)

export default WorstContext
