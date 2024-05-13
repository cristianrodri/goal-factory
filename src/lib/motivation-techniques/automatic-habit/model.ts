import { IAutomaticHabit } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

const automaticHabitSchema = new Schema<IAutomaticHabit>({
  utilHabits: [
    {
      habit: {
        type: String,
        required: [true, 'Habit is required'],
        trim: true,
        minlength: [2, 'Habit must be at least 2 characters long'],
        maxlength: [500, 'Habit must be at most 500 characters long']
      },
      impact: {
        type: Number,
        trim: true,
        required: [true, 'Impact is required'],
        min: [1, 'Impact must be at least 1'],
        max: [10, 'Impact must be at most 10']
      }
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  bigGoal: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'BigGoal'
  }
})

const AutomaticHabit =
  (models['AutomaticHabit'] as Model<IAutomaticHabit>) ||
  model<IAutomaticHabit>('AutomaticHabit', automaticHabitSchema)

export default AutomaticHabit
