import { IMotivationTechnique } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { MotivationType } from '@/utils/enums'
import { Document, Model, Schema, model, models } from 'mongoose'

const motivationTechniqueSchema = new Schema<IMotivationTechnique>({
  realNumberTechnique: {
    type: Number,
    required: [true, 'Real number technique is required'],
    min: 1,
    max: 27
  },
  type: {
    type: String,
    enum: {
      values: Object.values(MotivationType),
      message: 'Invalid motivation type.'
    },
    required: [true, 'Motivation type (per user or per goal) is required'],
    trim: true
  },
  isUsed: {
    type: Boolean,
    default: false
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is required'],
    ref: 'User'
  }
})

motivationTechniqueSchema.index(
  { user: 1, realNumberTechnique: 1 },
  { unique: true }
)

// Use the transformation function within the toJSON method
motivationTechniqueSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

const MotivationTechnique =
  (models['MotivationTechnique'] as Model<IMotivationTechnique>) ||
  model<IMotivationTechnique>('MotivationTechnique', motivationTechniqueSchema)

export default MotivationTechnique
