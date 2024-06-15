import {
  findOneAndDeleteOrThrow,
  findOneAndUpdateOrThrow,
  findOneOrThrow,
  IBaseDocument,
  IBaseModel
} from '@/lib/baseSchema'
import { IVisualProspective } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Schema, model, models } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

// Define your main visual prospective schema
interface IVisualProspectiveDocument
  extends IVisualProspective,
    IBaseDocument {}

interface IVisualProspectiveModel
  extends IBaseModel<IVisualProspectiveDocument> {}

const visualProspectiveSchema = new Schema<IVisualProspectiveDocument>({
  goalAchievedDescription: {
    type: String,
    trim: true,
    minlength: [
      2,
      'Goal achieved description must be at least 2 characters long'
    ],
    maxlength: [
      2000,
      'Goal achieved description must be at most 2000 characters long'
    ]
  },
  specificDeadline: {
    type: Date,
    validate: {
      validator(date: Date) {
        // Validate that the date is not before the current day
        const currentDate = new Date()
        return date > currentDate
      },
      message: 'Specific deadline cannot be before the current day'
    }
  },
  thingTodoGoal: {
    type: String,
    trim: true,
    minlength: [2, 'Thing to do goal must be at least 2 characters long'],
    maxlength: [2000, 'Thing to do goal must be at most 2000 characters long']
  },
  timeReduceIdeas: [
    {
      type: String,
      trim: true,
      minlength: [2, 'Time reduce idea must be at least 2 characters long'],
      maxlength: [1000, 'Time reduce idea must be at most 1000 characters long']
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
visualProspectiveSchema.index({ user: 1, bigGoal: 1 }, { unique: true })

// Use the unique validator plugin
visualProspectiveSchema.plugin(uniqueValidator, {
  message: 'Visual prospective already exists for this big goal'
})

// Use the transformation function within the toJSON method
visualProspectiveSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

// Add static method directly to schema
visualProspectiveSchema.statics.findOneOrThrow =
  findOneOrThrow as IBaseModel<IVisualProspectiveDocument>['findOneOrThrow']

visualProspectiveSchema.statics.findOneAndUpdateOrThrow =
  findOneAndUpdateOrThrow as IBaseModel<IVisualProspectiveDocument>['findOneAndUpdateOrThrow']

visualProspectiveSchema.statics.findOneAndDeleteOrThrow =
  findOneAndDeleteOrThrow as IBaseModel<IVisualProspectiveDocument>['findOneAndDeleteOrThrow']

const VisualProspective =
  (models['VisualProspective'] as IVisualProspectiveModel) ||
  model<IVisualProspectiveDocument, IVisualProspectiveModel>(
    'VisualProspective',
    visualProspectiveSchema
  )

export default VisualProspective
