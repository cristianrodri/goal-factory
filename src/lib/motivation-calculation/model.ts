import { IMotivationCalculation } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Model, Schema, model, models } from 'mongoose'

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

// Use the transformation function within the toJSON method
motivationCalculation.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

const MotivationCalculation =
  (models['MotivationCalculation'] as Model<IMotivationCalculation>) ||
  model<IMotivationCalculation>('MotivationCalculation', motivationCalculation)

export default MotivationCalculation
