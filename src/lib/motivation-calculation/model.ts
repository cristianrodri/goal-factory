import { IMotivationCalculation } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Model, Schema, model, models } from 'mongoose'

const motivationCalculation = new Schema<IMotivationCalculation>({
  expectation: {
    type: Number,
    required: [true, 'Expectation is required'],
    min: [1, 'Expectation must be at least 1'],
    max: [10, 'Expectation must be at most 10']
  },
  value: {
    type: Number,
    required: [true, 'Value is required'],
    min: [1, 'Value must be at least 1'],
    max: [10, 'Value must be at most 10']
  },
  impulsiveness: {
    type: Number,
    required: [true, 'Impulsiveness is required'],
    min: [1, 'Impulsiveness must be at least 1'],
    max: [10, 'Impulsiveness must be at most 10']
  },
  time: {
    type: Number,
    required: [true, 'Time is required'],
    min: [1, 'Time must be at least 1'],
    max: [10, 'Time must be at most 10']
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

motivationCalculation.index({ user: 1, bigGoal: 1 }, { unique: true })

// Use the transformation function within the toJSON method
motivationCalculation.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

const MotivationCalculation =
  (models['MotivationCalculation'] as Model<IMotivationCalculation>) ||
  model<IMotivationCalculation>('MotivationCalculation', motivationCalculation)

export default MotivationCalculation
