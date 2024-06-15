import {
  findOneAndDeleteOrThrow,
  findOneAndUpdateOrThrow,
  findOneOrThrow,
  IBaseDocument,
  IBaseModel
} from '@/lib/baseSchema'
import { ITaskSamurai } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Schema, model, models } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

// Define your main task samurai schema
interface ITaskSamuraiDocument extends ITaskSamurai, IBaseDocument {}

interface ITaskSamuraiModel extends IBaseModel<ITaskSamuraiDocument> {}

const taskSamuraiSchema = new Schema<ITaskSamuraiDocument>({
  boredTasks: [
    {
      task: {
        type: String,
        required: [true, 'Task is required'],
        trim: true,
        minlength: [2, 'Task must be at least 2 characters long'],
        maxlength: [500, 'Task must be at most 500 characters long']
      },
      optimizing: {
        type: String,
        required: [true, 'Optimizing is required'],
        trim: true,
        minlength: [2, 'Optimizing must be at least 2 characters long'],
        maxlength: [1500, 'Optimizing must be at most 1500 characters long']
      }
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is required'],
    ref: 'User',
    unique: true
  }
})

// Use the unique validator plugin
taskSamuraiSchema.plugin(uniqueValidator, {
  message: 'Task samurai already exists for this user'
})

// Use the transformation function within the toJSON method
taskSamuraiSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

// Add static method directly to schema
taskSamuraiSchema.statics.findOneOrThrow =
  findOneOrThrow as IBaseModel<ITaskSamuraiDocument>['findOneOrThrow']

taskSamuraiSchema.statics.findOneAndUpdateOrThrow =
  findOneAndUpdateOrThrow as IBaseModel<ITaskSamuraiDocument>['findOneAndUpdateOrThrow']

taskSamuraiSchema.statics.findOneAndDeleteOrThrow =
  findOneAndDeleteOrThrow as IBaseModel<ITaskSamuraiDocument>['findOneAndDeleteOrThrow']

const TaskSamurai =
  (models['TaskSamurai'] as ITaskSamuraiModel) ||
  model<ITaskSamuraiDocument, ITaskSamuraiModel>(
    'TaskSamurai',
    taskSamuraiSchema
  )

export default TaskSamurai
