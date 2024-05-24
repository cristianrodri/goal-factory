import { IHabit } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Model, Schema, model, models } from 'mongoose'

const habitSchema = new Schema<IHabit>({
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [2, 'Description is too short. Min length is 2 characters'],
    maxlength: [100, 'Description is too long. Max length is 100 characters']
  },
  days: {
    type: {
      monday: {
        type: Boolean,
        default: false
      },
      tuesday: {
        type: Boolean,
        default: false
      },
      wednesday: {
        type: Boolean,
        default: false
      },
      thursday: {
        type: Boolean,
        default: false
      },
      friday: {
        type: Boolean,
        default: false
      },
      saturday: {
        type: Boolean,
        default: false
      },
      sunday: {
        type: Boolean,
        default: false
      }
    },
    _id: false
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is required'],
    ref: 'User'
  }
})

habitSchema.index({ user: 1, description: 1 }, { unique: true })

// Use the transformation function within the toJSON method
habitSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

const Habit =
  (models['Habit'] as Model<IHabit>) || model<IHabit>('Habit', habitSchema)

export default Habit
