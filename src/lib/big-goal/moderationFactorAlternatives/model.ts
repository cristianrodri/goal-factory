import { IModeratorFactorAlternative } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Schema } from 'mongoose'

export const moderationFactorAlternativesSchema =
  new Schema<IModeratorFactorAlternative>({
    alternative: {
      type: String,
      trim: true,
      maxlength: [300, 'Alternative can not be more than 300 characters'],
      minlength: [2, 'Alternative can not be less than 2 characters']
    }
  })

// Use the transformation function within the toJSON method
moderationFactorAlternativesSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}
