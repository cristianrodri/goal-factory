import { IHabitWeekly } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

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

const HabitWeekly =
  (models['HabitWeekly'] as Model<IHabitWeekly>) ||
  model<IHabitWeekly>('HabitWeekly', habitWeeklySchema)

export default HabitWeekly
