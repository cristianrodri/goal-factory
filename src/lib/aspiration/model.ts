import { IAspiration } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

const aspirationSchema = new Schema<IAspiration>({
  generalResult: {
    type: String,
    required: [true, 'General result is required'],
    trim: true,
    maxlength: 100,
    minlength: 2
  },
  specificResult: {
    type: String,
    required: [true, 'Specific result is required'],
    trim: true,
    maxlength: 100,
    minlength: 2
  },
  deadline: {
    type: Date,
    required: [true, 'Deadline is required']
  },
  reached: {
    type: Boolean,
    default: false
  },
  bigReward: {
    type: String,
    required: [true, 'Big reward is required'],
    trim: true,
    maxlength: 100,
    minlength: 2
  },
  progress: {
    type: Number,
    default: 0
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

// Define a virtual property to populate the associated goal
aspirationSchema.virtual('goal', {
  ref: 'Goal', // Reference the Goal model
  localField: '_id', // Field from the Aspiration model
  foreignField: 'aspiration' // Field from the Goal model
})

const Aspiration =
  (models['Aspiration'] as Model<IAspiration>) ||
  model<IAspiration>('Aspiration', aspirationSchema)

export default Aspiration
