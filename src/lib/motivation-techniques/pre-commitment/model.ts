import { IPreCommitment } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Model, Schema, model, models } from 'mongoose'

const preCommitmentSchema = new Schema<IPreCommitment>({
  preCommitments: [
    {
      type: String,
      trim: true,
      minlength: [2, 'Pre-commitment must be at least 2 character long'],
      maxlength: [1000, 'Pre-commitment must be at most 1000 character long']
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

// Use the transformation function within the toJSON method
preCommitmentSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

const PreCommitment =
  (models['PreCommitment'] as Model<IPreCommitment>) ||
  model<IPreCommitment>('PreCommitment', preCommitmentSchema)

export default PreCommitment
