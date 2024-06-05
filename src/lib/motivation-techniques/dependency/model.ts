import {
  findOneAndDeleteOrThrow,
  findOneAndUpdateOrThrow,
  findOneOrThrow,
  IBaseDocument,
  IBaseModel
} from '@/lib/baseSchema'
import { IDependency, IDependencyItem } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Schema, model, models } from 'mongoose'

const dependencyItemSchema = new Schema<IDependencyItem>({
  dependency: {
    type: String,
    trim: true,
    minlength: [2, 'Dependency must be at least 2 characters long'],
    maxlength: [200, 'Dependency must be at most 200 characters long']
  }
})

// Define your main dependency schema
interface IDependencyDocument extends IDependency, IBaseDocument {}

interface IDependencyModel extends IBaseModel<IDependencyDocument> {}

const dependencySchema = new Schema<IDependencyDocument>({
  dependencies: [
    {
      type: dependencyItemSchema,
      required: [true, 'Dependency is required']
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is required'],
    ref: 'User',
    unique: true
  }
})

// Use the transformation function within the toJSON method
dependencySchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

// Add static method directly to schema
dependencySchema.statics.findOneOrThrow =
  findOneOrThrow as IBaseModel<IDependencyDocument>['findOneOrThrow']

dependencySchema.statics.findOneAndUpdateOrThrow =
  findOneAndUpdateOrThrow as IBaseModel<IDependencyDocument>['findOneAndUpdateOrThrow']

dependencySchema.statics.findOneAndDeleteOrThrow =
  findOneAndDeleteOrThrow as IBaseModel<IDependencyDocument>['findOneAndDeleteOrThrow']

const Dependency =
  (models['Dependency'] as IDependencyModel) ||
  model<IDependencyDocument, IDependencyModel>('Dependency', dependencySchema)

export default Dependency
