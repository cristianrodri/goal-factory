import { IHabitDairy } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

const habitDairySchema = new Schema<IHabitDairy>({
  date: {
    type: Date,
    required: true
  },
  habits: [
    {
      habit: {
        type: Schema.Types.ObjectId,
        required: [true, 'Habit is required'],
        ref: 'Habit'
      },
      description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [2, 'Description is too short. Min length is 2 characters'],
        maxlength: [
          100,
          'Description is too long. Max length is 100 characters'
        ]
      },
      done: {
        type: Boolean,
        default: false
      }
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

const HabitDairy =
  (models['HabitDairy'] as Model<IHabitDairy>) ||
  model<IHabitDairy>('HabitDairy', habitDairySchema)

export default HabitDairy
