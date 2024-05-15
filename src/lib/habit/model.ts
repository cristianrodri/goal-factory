import { IHabit } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

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
      monday: Boolean,
      tuesday: Boolean,
      wednesday: Boolean,
      thursday: Boolean,
      friday: Boolean,
      saturday: Boolean,
      sunday: Boolean
    }
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

const Habit =
  (models['Habit'] as Model<IHabit>) || model<IHabit>('Habit', habitSchema)

export default Habit
