import { IImpulse } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

const impulseSchema = new Schema<IImpulse>({
  videoLink: {
    type: String,
    required: [true, 'Video link is required'],
    trim: true,
    maxlength: [300, 'Video link must be less than 300 characters']
  },
  rates: [
    {
      description: {
        type: String,
        trim: true,
        maxlength: [100, 'Description must be less than 100 characters'],
        default: 'No description'
      },
      rate: {
        type: Number,
        required: [true, 'Rate is required'],
        min: 1,
        max: 10
      },
      time: {
        type: Date,
        required: [true, 'Time is required']
      }
    }
  ],
  isShown: {
    type: Boolean,
    default: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is required'],
    ref: 'User'
  }
})

const Impulse =
  (models['Impulse'] as Model<IImpulse>) ||
  model<IImpulse>('Impulse', impulseSchema)

export default Impulse
