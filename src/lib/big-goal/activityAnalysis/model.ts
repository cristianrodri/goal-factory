import { IActivityAnalisys } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Schema } from 'mongoose'

export const activityAnalysisSchema = new Schema<IActivityAnalisys>({
  activity: {
    type: String,
    trim: true,
    maxlength: [300, 'Activity analysis can not be more than 300 characters'],
    minlength: [2, 'Activity analysis can not be less than 2 characters']
  }
})

// Use the transformation function within the toJSON method
activityAnalysisSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}
