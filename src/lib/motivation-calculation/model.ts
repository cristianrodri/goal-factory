import { IMotivationCalculation } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

const motivationCalculation = new Schema<IMotivationCalculation>({
  expectation: {
    type: Number,
    required: [true, 'Expectation is required'],
    min: 1,
    max: 10
  },
  value: {
    type: Number,
    required: [true, 'Value is required'],
    min: 1,
    max: 10
  },
  impulsiveness: {
    type: Number,
    required: [true, 'Impulsiveness is required'],
    min: 1,
    max: 10
  },
  time: {
    type: Number,
    required: [true, 'Time is required'],
    min: 1,
    max: 10
  },
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

const MotivationCalculation =
  (models['MotivationCalculation'] as Model<IMotivationCalculation>) ||
  model<IMotivationCalculation>('MotivationCalculation', motivationCalculation)

export default MotivationCalculation
