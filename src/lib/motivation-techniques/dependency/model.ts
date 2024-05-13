import { IDependency } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

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
    required: true,
    ref: 'User'
  }
})

const Dependency =
  (models['Dependency'] as Model<IDependency>) ||
  model<IDependency>('Dependency', dependencySchema)

export default Dependency
