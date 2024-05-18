import { IReduceAlternative } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Model, Schema, model, models } from 'mongoose'

const reduceAlternativeSchema = new Schema<IReduceAlternative>({
  burnedShips: [
    {
      type: String,
      trim: true,
      minlength: [2, 'Burned ship must be at least 2 character long'],
      maxlength: [500, 'Burned ship must be at most 500 character long']
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
reduceAlternativeSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

const ReduceAlternative =
  (models['ReduceAlternative'] as Model<IReduceAlternative>) ||
  model<IReduceAlternative>('ReduceAlternative', reduceAlternativeSchema)

export default ReduceAlternative
