import { IMotivation } from '@/types'
import { MotivationType } from '@/utils/enums'
import { Model, Schema, model, models } from 'mongoose'

const motivationSchema = new Schema<IMotivation>({
  realNumberTechnique: {
    type: Number,
    required: true,
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
    required: true,
    ref: 'User'
  }
})

const Motivation =
  (models['Motivation'] as Model<IMotivation>) ||
  model<IMotivation>('Motivation', motivationSchema)

export default Motivation
