import { IDependency, IDependencyItem } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Model, Schema, model, models } from 'mongoose'

const dependencyItemSchema = new Schema<IDependencyItem>({
  dependency: {
    type: String,
    trim: true,
    minlength: [2, 'Dependency must be at least 2 characters long'],
    maxlength: [200, 'Dependency must be at most 200 characters long']
  }
})

const dependencySchema = new Schema<IDependency>({
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

const Dependency =
  (models['Dependency'] as Model<IDependency>) ||
  model<IDependency>('Dependency', dependencySchema)

export default Dependency
