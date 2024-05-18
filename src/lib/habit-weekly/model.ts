import { IHabitWeekly } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Model, Schema, model, models } from 'mongoose'

const habitWeeklySchema = new Schema<IHabitWeekly>({
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  weeklyProgress: {
    type: Number,
    required: [true, 'Weekly progress is required'],
    min: 0,
    max: 100
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is required'],
    ref: 'User'
  }
})

// Use the transformation function within the toJSON method
habitWeeklySchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

const HabitWeekly =
  (models['HabitWeekly'] as Model<IHabitWeekly>) ||
  model<IHabitWeekly>('HabitWeekly', habitWeeklySchema)

export default HabitWeekly
