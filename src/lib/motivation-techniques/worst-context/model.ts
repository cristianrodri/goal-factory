import {
  findOneAndDeleteOrThrow,
  findOneAndUpdateOrThrow,
  findOneOrThrow,
  IBaseDocument,
  IBaseModel
} from '@/lib/baseSchema'
import { IWorstContext } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Schema, model, models } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

// Define your main worst context schema
interface IWorstContextDocument extends IWorstContext, IBaseDocument {}

interface IWorstContextModel extends IBaseModel<IWorstContextDocument> {}

const worstContextSchema = new Schema<IWorstContextDocument>({
  contingencies: [
    {
      badScenario: {
        type: String,
        required: [true, 'Bad scenario is required'],
        trim: true,
        minlength: [2, 'Bad scenario must be at least 2 characters long'],
        maxlength: [200, 'Bad scenario must be at most 200 characters long']
      },
      alternative: {
        type: String,
        required: [true, 'Alternative is required'],
        trim: true,
        minlength: [2, 'Alternative must be at least 2 characters long'],
        maxlength: [1000, 'Alternative must be at most 200 characters long']
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

// Index the user big goal fields
worstContextSchema.index({ user: 1, bigGoal: 1 }, { unique: true })

// Use the unique validator plugin
worstContextSchema.plugin(uniqueValidator, {
  message: 'Worst context already exists for this big goal'
})

// Use the transformation function within the toJSON method
worstContextSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

// Add static method directly to schema
worstContextSchema.statics.findOneOrThrow =
  findOneOrThrow as IBaseModel<IWorstContextDocument>['findOneOrThrow']

worstContextSchema.statics.findOneAndUpdateOrThrow =
  findOneAndUpdateOrThrow as IBaseModel<IWorstContextDocument>['findOneAndUpdateOrThrow']

worstContextSchema.statics.findOneAndDeleteOrThrow =
  findOneAndDeleteOrThrow as IBaseModel<IWorstContextDocument>['findOneAndDeleteOrThrow']

const WorstContext =
  (models['WorstContext'] as IWorstContextModel) ||
  model<IWorstContextDocument, IWorstContextModel>(
    'WorstContext',
    worstContextSchema
  )

export default WorstContext
