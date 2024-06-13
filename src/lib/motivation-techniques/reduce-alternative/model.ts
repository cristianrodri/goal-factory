import {
  findOneAndDeleteOrThrow,
  findOneAndUpdateOrThrow,
  findOneOrThrow,
  IBaseDocument,
  IBaseModel
} from '@/lib/baseSchema'
import { IReduceAlternative } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Schema, model, models } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

// Define your main burned ship schema
interface IReduceAlternativeDocument
  extends IReduceAlternative,
    IBaseDocument {}

interface IReduceAlternativeModel
  extends IBaseModel<IReduceAlternativeDocument> {}

const reduceAlternativeSchema = new Schema<IReduceAlternativeDocument>({
  burnedShips: [
    {
      burnedShip: {
        type: String,
        trim: true,
        minlength: [2, 'Burned ship must be at least 2 character long'],
        maxlength: [500, 'Burned ship must be at most 500 character long']
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
reduceAlternativeSchema.index({ user: 1, bigGoal: 1 }, { unique: true })

// Use the unique validator plugin
reduceAlternativeSchema.plugin(uniqueValidator, {
  message: 'Reduce alternative already exists for this big goal'
})

// Use the transformation function within the toJSON method
reduceAlternativeSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

// Add static method directly to schema
reduceAlternativeSchema.statics.findOneOrThrow =
  findOneOrThrow as IBaseModel<IReduceAlternativeDocument>['findOneOrThrow']

reduceAlternativeSchema.statics.findOneAndUpdateOrThrow =
  findOneAndUpdateOrThrow as IBaseModel<IReduceAlternativeDocument>['findOneAndUpdateOrThrow']

reduceAlternativeSchema.statics.findOneAndDeleteOrThrow =
  findOneAndDeleteOrThrow as IBaseModel<IReduceAlternativeDocument>['findOneAndDeleteOrThrow']

const ReduceAlternative =
  (models['ReduceAlternative'] as IReduceAlternativeModel) ||
  model<IReduceAlternativeDocument, IReduceAlternativeModel>(
    'ReduceAlternative',
    reduceAlternativeSchema
  )

export default ReduceAlternative
