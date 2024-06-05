import { IMotivationCalculation } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Schema, model, models } from 'mongoose'
import {
  findOneAndDeleteOrThrow,
  findOneAndUpdateOrThrow,
  findOneOrThrow,
  IBaseDocument,
  IBaseModel
} from '@/lib/baseSchema'

// Define your main motivation calculation schema
interface IMotivationCalculationDocument
  extends IMotivationCalculation,
    IBaseDocument {}

interface IMotivationCalculationModel
  extends IBaseModel<IMotivationCalculationDocument> {}

const motivationCalculationSchema = new Schema<IMotivationCalculationDocument>({
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

motivationCalculationSchema.index({ user: 1, bigGoal: 1 }, { unique: true })

// Use the transformation function within the toJSON method
motivationCalculationSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

// Add static method directly to schema
motivationCalculationSchema.statics.findOneOrThrow =
  findOneOrThrow as IBaseModel<IMotivationCalculationDocument>['findOneOrThrow']

motivationCalculationSchema.statics.findOneAndUpdateOrThrow =
  findOneAndUpdateOrThrow as IBaseModel<IMotivationCalculationDocument>['findOneAndUpdateOrThrow']

motivationCalculationSchema.statics.findOneAndDeleteOrThrow =
  findOneAndDeleteOrThrow as IBaseModel<IMotivationCalculationDocument>['findOneAndDeleteOrThrow']

const MotivationCalculation =
  (models['MotivationCalculation'] as IMotivationCalculationModel) ||
  model<IMotivationCalculationDocument, IMotivationCalculationModel>(
    'MotivationCalculation',
    motivationCalculationSchema
  )

export default MotivationCalculation
