import { IDependency } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Model, Schema, model, models } from 'mongoose'

const dependencySchema = new Schema<IDependency>({
  dependencies: [
    {
      type: String,
      trim: true,
      minlength: [2, 'Dependency must be at least 2 characters long'],
      maxlength: [200, 'Dependency must be at most 200 characters long']
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is required'],
    ref: 'User'
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
