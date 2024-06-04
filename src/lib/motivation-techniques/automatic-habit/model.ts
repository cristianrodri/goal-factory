import {
  findOneAndUpdateOrThrow,
  findOneOrThrow,
  IBaseDocument,
  IBaseModel
} from '@/lib/baseSchema'
import { IAutomaticHabit, IUtilHabit } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Schema, model, models } from 'mongoose'

// Define your main automatic habit schema
interface IAutomaticHabitDocument extends IAutomaticHabit, IBaseDocument {}

interface IAutomaticHabitModel extends IBaseModel<IAutomaticHabitDocument> {}

const utilHabitsSchema = new Schema<IUtilHabit>({
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
})

const automaticHabitSchema = new Schema<IAutomaticHabitDocument>({
  utilHabits: [
    {
      type: utilHabitsSchema,
      required: [true, 'Util habit is required']
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

automaticHabitSchema.index({ user: 1, bigGoal: 1 }, { unique: true })

// Use the transformation function within the toJSON method
automaticHabitSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

// Add static method directly to schema
automaticHabitSchema.statics.findOneOrThrow =
  findOneOrThrow as IBaseModel<IAutomaticHabitDocument>['findOneOrThrow']

automaticHabitSchema.statics.findOneAndUpdateOrThrow =
  findOneAndUpdateOrThrow as IBaseModel<IAutomaticHabitDocument>['findOneAndUpdateOrThrow']

const AutomaticHabit =
  (models['AutomaticHabit'] as IAutomaticHabitModel) ||
  model<IAutomaticHabitDocument, IAutomaticHabitModel>(
    'AutomaticHabit',
    automaticHabitSchema
  )

export default AutomaticHabit
