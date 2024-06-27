import { IMediatingFactor } from '@/types'
import { Schema } from 'mongoose'
import { factorSchema } from '../factor/model'

export const mediatingFactorSchema = new Schema<IMediatingFactor>(
  {
    facilitators: [factorSchema],
    num: {
      type: Number,
      required: [true, 'Facilitator number is required'],
      enum: {
        values: [1, 2, 3, 4],
        message: 'Facilitator number must be 1, 2, 3, or 4'
      }
    }
  },
  { _id: false }
)
