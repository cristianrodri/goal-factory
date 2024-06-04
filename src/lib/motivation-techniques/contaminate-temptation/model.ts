import {
  findOneAndUpdateOrThrow,
  findOneOrThrow,
  IBaseDocument,
  IBaseModel
} from '@/lib/baseSchema'
import { IContaminateTemptation, ITemptation } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Schema, model, models } from 'mongoose'

const temptationSchema = new Schema<ITemptation>({
  temptation: {
    type: String,
    required: [true, 'Temptation is required'],
    trim: true,
    minlength: [2, 'Temptation must be at least 2 character long'],
    maxlength: [500, 'Temptation must be at most 500 character long']
  },
  catastrophe: {
    type: String,
    required: [true, 'Catastrophe is required'],
    trim: true,
    minlength: [2, 'Catastrophe must be at least 2 character long'],
    maxlength: [1000, 'Catastrophe must be at most 1000 character long']
  }
})

// Define your main contaminate temptation schema
interface IContaminateTemptationDocument
  extends IContaminateTemptation,
    IBaseDocument {}

interface IContaminateTemptationModel
  extends IBaseModel<IContaminateTemptationDocument> {}

const contaminateTemptationSchema = new Schema<IContaminateTemptationDocument>({
  temptations: [
    {
      type: temptationSchema,
      required: [true, 'Temptations are required']
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

contaminateTemptationSchema.index({ user: 1, bigGoal: 1 }, { unique: true })

// Use the transformation function within the toJSON method
contaminateTemptationSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

// Add static method directly to schema
contaminateTemptationSchema.statics.findOneOrThrow =
  findOneOrThrow as IBaseModel<IContaminateTemptationDocument>['findOneOrThrow']

contaminateTemptationSchema.statics.findOneAndUpdateOrThrow =
  findOneAndUpdateOrThrow as IBaseModel<IContaminateTemptationDocument>['findOneAndUpdateOrThrow']

const ContaminateTemptation =
  (models['ContaminateTemptation'] as IContaminateTemptationModel) ||
  model<IContaminateTemptationDocument, IContaminateTemptationModel>(
    'ContaminateTemptation',
    contaminateTemptationSchema
  )

export default ContaminateTemptation
