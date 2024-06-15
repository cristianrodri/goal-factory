import {
  findOneAndDeleteOrThrow,
  findOneAndUpdateOrThrow,
  findOneOrThrow,
  IBaseDocument,
  IBaseModel
} from '@/lib/baseSchema'
import { ITotalStructureFocus } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Schema, model, models } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

// Define your main task samurai schema
interface ITotalStructureFocusDocument
  extends ITotalStructureFocus,
    IBaseDocument {}

interface ITotalStructureFocusModel
  extends IBaseModel<ITotalStructureFocusDocument> {}

const totalStructureFocusSchema = new Schema<ITotalStructureFocusDocument>({
  focusIdeas: [
    {
      idea: {
        type: String,
        trim: true,
        minlength: [2, 'Focus idea must be at least 2 characters long'],
        maxlength: [200, 'Focus idea must be at most 200 characters long']
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

// Index the user and big goal fields
totalStructureFocusSchema.index({ user: 1, bigGoal: 1 }, { unique: true })

// Use the unique validator plugin
totalStructureFocusSchema.plugin(uniqueValidator, {
  message: 'Total structure focus already exists for this big goal'
})

// Use the transformation function within the toJSON method
totalStructureFocusSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

// Add static method directly to schema
totalStructureFocusSchema.statics.findOneOrThrow =
  findOneOrThrow as IBaseModel<ITotalStructureFocusDocument>['findOneOrThrow']

totalStructureFocusSchema.statics.findOneAndUpdateOrThrow =
  findOneAndUpdateOrThrow as IBaseModel<ITotalStructureFocusDocument>['findOneAndUpdateOrThrow']

totalStructureFocusSchema.statics.findOneAndDeleteOrThrow =
  findOneAndDeleteOrThrow as IBaseModel<ITotalStructureFocusDocument>['findOneAndDeleteOrThrow']

const TotalStructureFocus =
  (models['TotalStructureFocus'] as ITotalStructureFocusModel) ||
  model<ITotalStructureFocusDocument, ITotalStructureFocusModel>(
    'TotalStructureFocus',
    totalStructureFocusSchema
  )

export default TotalStructureFocus
