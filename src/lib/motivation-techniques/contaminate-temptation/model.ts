import { IContaminateTemptation } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

const contaminateTemptationSchema = new Schema<IContaminateTemptation>({
  temptations: [
    {
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

const ContaminateTemptation =
  (models['ContaminateTemptation'] as Model<IContaminateTemptation>) ||
  model<IContaminateTemptation>(
    'ContaminateTemptation',
    contaminateTemptationSchema
  )

export default ContaminateTemptation
