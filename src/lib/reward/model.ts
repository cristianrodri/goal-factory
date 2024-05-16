import { IReward, IRewardDescription } from '@/types'
import { RewardType } from '@/utils/enums'
import { Model, Schema, model, models } from 'mongoose'

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
  type: {
    type: String,
    enum: {
      values: Object.values(RewardType),
      message: 'Invalid reward type.'
    },
    required: [true, 'Reward type is required'],
    trim: true
  },
  rewards: {
    type: [rewardsSchema]
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is required'],
    ref: 'User'
  }
})

const Reward =
  (models['Reward'] as Model<IReward>) || model<IReward>('Reward', rewardSchema)

export default Reward
