import { IModerationFactor } from '@/types'
import { Schema } from 'mongoose'
import { factorSchema } from '../factor/model'

export const moderatingFactorSchema = new Schema<IModerationFactor>(
  {
    obstacles: [factorSchema],
    num: {
      type: Number,
      required: [true, 'Moderating factor number is required'],
      enum: {
        values: [1, 2, 3, 4, 5, 6],
        message: 'Moderating factor number must be 1, 2, 3, 4, 5 or 6 '
      }
    }
  },
  { _id: false }
)
