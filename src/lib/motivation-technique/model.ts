import { IMotivationTechnique } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { MotivationType } from '@/utils/enums'
import { Document, Schema, model, models } from 'mongoose'
import {
  findOneAndDeleteOrThrow,
  findOneAndUpdateOrThrow,
  findOneOrThrow,
  IBaseDocument,
  IBaseModel
} from '@/lib/baseSchema'

// Define your main motivation technique schema
interface IMotivationTechniqueDocument
  extends IMotivationTechnique,
    IBaseDocument {}

interface IMotivationTechniqueModel
  extends IBaseModel<IMotivationTechniqueDocument> {}

const motivationTechniqueSchema = new Schema<IMotivationTechniqueDocument>({
  realNumberTechnique: {
    type: Number,
    required: [true, 'Real number technique is required'],
    min: 1,
    max: 27
  },
  type: {
    type: String,
    enum: {
      values: Object.values(MotivationType),
      message: 'Invalid motivation type.'
    },
    required: [true, 'Motivation type (per user or per goal) is required'],
    trim: true
  },
  isUsed: {
    type: Boolean,
    default: false
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is required'],
    ref: 'User'
  },
  bigGoal: {
    type: Schema.Types.ObjectId,
    ref: 'BigGoal'
  }
})

// Define a unique compound index for the combination of user and type where type is MotivationType.PER_USER
motivationTechniqueSchema.index(
  { user: 1, type: 1, realNumberTechnique: 1 },
  {
    unique: true,
    partialFilterExpression: { type: MotivationType.PER_USER }
  }
)

// Define a unique compound index for the combination of user, bigGoal, and type where type is MotivationType.PER_GOAL
motivationTechniqueSchema.index(
  { user: 1, bigGoal: 1, type: 1, realNumberTechnique: 1 },
  {
    unique: true,
    partialFilterExpression: { type: MotivationType.PER_GOAL }
  }
)

// Use the transformation function within the toJSON method
motivationTechniqueSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

// Add static method directly to schema
motivationTechniqueSchema.statics.findOneOrThrow =
  findOneOrThrow as IBaseModel<IMotivationTechniqueDocument>['findOneOrThrow']

motivationTechniqueSchema.statics.findOneAndUpdateOrThrow =
  findOneAndUpdateOrThrow as IBaseModel<IMotivationTechniqueDocument>['findOneAndUpdateOrThrow']

motivationTechniqueSchema.statics.findOneAndDeleteOrThrow =
  findOneAndDeleteOrThrow as IBaseModel<IMotivationTechniqueDocument>['findOneAndDeleteOrThrow']

const MotivationTechnique =
  (models['MotivationTechnique'] as IMotivationTechniqueModel) ||
  model<IMotivationTechniqueDocument, IMotivationTechniqueModel>(
    'MotivationTechnique',
    motivationTechniqueSchema
  )

export default MotivationTechnique
