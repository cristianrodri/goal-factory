import { IModerationFactor } from '@/types'
import { Document, Schema } from 'mongoose'
import { factorSchema } from '../factor/model'
import { toJSONTransform } from '@/utils/db'

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

// Use the transformation function within the toJSON method
moderatingFactorSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}
