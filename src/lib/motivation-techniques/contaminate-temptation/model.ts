import { IContaminateTemptation, ITemptation } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Model, Schema, model, models } from 'mongoose'

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

const contaminateTemptationSchema = new Schema<IContaminateTemptation>({
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

const ContaminateTemptation =
  (models['ContaminateTemptation'] as Model<IContaminateTemptation>) ||
  model<IContaminateTemptation>(
    'ContaminateTemptation',
    contaminateTemptationSchema
  )

export default ContaminateTemptation
