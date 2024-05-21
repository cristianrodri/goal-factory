import { IReward, IRewardDescription } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Model, Schema, model, models } from 'mongoose'

const rewardsSchema = new Schema<IRewardDescription>({
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [2, 'Description is too short'],
    maxlength: [100, 'Description is too long. Max 100 characters.']
  }
})

const rewardSchema = new Schema<IReward>({
  small: {
    type: [rewardsSchema]
  },
  medium: {
    type: [rewardsSchema]
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is required'],
    ref: 'User',
    unique: true
  }
})

// Use the transformation function within the toJSON method
rewardSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

const Reward =
  (models['Reward'] as Model<IReward>) || model<IReward>('Reward', rewardSchema)

export default Reward
