import { IPurposePassion } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Model, Schema, model, models } from 'mongoose'

const purposePassionSchema = new Schema<IPurposePassion>({
  dailyActivities: [
    {
      activity: {
        type: String,
        required: [true, 'Activity is required'],
        trim: true
      },
      enjoyment: {
        type: Number,
        required: [true, 'Enjoyment is required'],
        min: [1, 'Enjoyment must be at least 1'],
        max: [10, 'Enjoyment must be at most 10']
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
purposePassionSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

const PurposePassion =
  (models['PurposePassion'] as Model<IPurposePassion>) ||
  model<IPurposePassion>('PurposePassion', purposePassionSchema)

export default PurposePassion
