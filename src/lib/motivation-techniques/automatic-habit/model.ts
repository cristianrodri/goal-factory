import { IAutomaticHabit } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Model, Schema, model, models } from 'mongoose'

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
    required: [true, 'User is required'],
    ref: 'User'
  },
  bigGoal: {
    type: Schema.Types.ObjectId,
    required: [true, 'Big goal is required'],
    ref: 'BigGoal'
  }
})

// Use the transformation function within the toJSON method
automaticHabitSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

const AutomaticHabit =
  (models['AutomaticHabit'] as Model<IAutomaticHabit>) ||
  model<IAutomaticHabit>('AutomaticHabit', automaticHabitSchema)

export default AutomaticHabit
