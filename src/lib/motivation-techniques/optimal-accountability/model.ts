import { IOptimalAccountability } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

const optimalAccountabilitySchema = new Schema<IOptimalAccountability>({
  trustedPeople: [
    {
      type: String,
      trim: true,
      minlength: [2, 'Trusted person must be at least 2 characters long'],
      maxlength: [200, 'Trusted person must be at most 200 characters long']
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

const OptimalAccountability =
  (models['OptimalAccountability'] as Model<IOptimalAccountability>) ||
  model<IOptimalAccountability>(
    'OptimalAccountability',
    optimalAccountabilitySchema
  )

export default OptimalAccountability
