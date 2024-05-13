import { IMotivationBook } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

const motivationBookSchema = new Schema<IMotivationBook>({
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  activities: [
    {
      activity: {
        type: Schema.Types.ObjectId,
        required: [true, 'Activity is required'],
        ref: 'Activity'
      },
      stability: {
        type: Number,
        required: [true, 'Stability is required'],
        min: [1, 'Stability must be at least 1'],
        max: [10, 'Stability must be at most 10']
      },
      motivation: {
        type: Number,
        required: [true, 'Motivation is required'],
        min: [1, 'Motivation must be at least 1'],
        max: [10, 'Motivation must be at most 10']
      }
    }
  ],
  impulses: [
    {
      impulse: {
        type: Schema.Types.ObjectId,
        required: [true, 'Impulse is required'],
        ref: 'Impulse'
      },
      rate: {
        type: Number,
        required: [true, 'Rate is required'],
        min: [1, 'Rate must be at least 1'],
        max: [10, 'Rate must be at most 10']
      }
    }
  ],
  procrastinations: [
    {
      procrastination: {
        type: String,
        required: [true, 'Procrastination is required'],
        trim: true,
        minlength: [2, 'Procrastination must be at least 2 character'],
        maxlength: [200, 'Procrastination must be at most 200 characters']
      },
      cause: {
        type: String,
        required: [true, 'Cause is required'],
        trim: true,
        minlength: [2, 'Cause must be at least 2 character'],
        maxlength: [200, 'Cause must be at most 200 characters']
      }
    }
  ],
  hasProgress: {
    type: Boolean,
    default: false
  },
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

const MotivationBook =
  (models['MotivationBook'] as Model<IMotivationBook>) ||
  model<IMotivationBook>('MotivationBook', motivationBookSchema)

export default MotivationBook
