import { ITaskSamurai } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

const taskSamuraiSchema = new Schema<ITaskSamurai>({
  boredTasks: [
    {
      task: {
        type: String,
        required: [true, 'Task is required'],
        trim: true,
        minlength: [2, 'Task must be at least 2 characters long'],
        maxlength: [500, 'Task must be at most 500 characters long']
      },
      optimazing: {
        type: String,
        required: [true, 'Optimazing is required'],
        trim: true,
        minlength: [2, 'Optimazing must be at least 2 characters long'],
        maxlength: [1500, 'Optimazing must be at most 1500 characters long']
      }
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is required'],
    ref: 'User'
  }
})

const TaskSamurai =
  (models['TaskSamurai'] as Model<ITaskSamurai>) ||
  model<ITaskSamurai>('TaskSamurai', taskSamuraiSchema)

export default TaskSamurai
