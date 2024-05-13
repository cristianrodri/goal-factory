import { IWorstContext } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

const worstContextSchema = new Schema<IWorstContext>({
  contingences: [
    {
      badScenario: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'Bad scenario must be at least 2 characters long'],
        maxlength: [200, 'Bad scenario must be at most 200 characters long']
      },
      alternative: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'Alternative must be at least 2 characters long'],
        maxlength: [1000, 'Alternative must be at most 200 characters long']
      }
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  bigGoal: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'BigGoal'
  }
})

const WorstContext =
  (models['WorstContext'] as Model<IWorstContext>) ||
  model<IWorstContext>('WorstContext', worstContextSchema)

export default WorstContext
