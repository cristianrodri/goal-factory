import { IMotivationCalculation } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

const motivationCalculation = new Schema<IMotivationCalculation>({
  expectation: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  value: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  impulsiveness: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  time: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
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

const MotivationCalculation =
  (models['MotivationCalculation'] as Model<IMotivationCalculation>) ||
  model<IMotivationCalculation>('MotivationCalculation', motivationCalculation)

export default MotivationCalculation
