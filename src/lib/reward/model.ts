import { IReward } from '@/types'
import { RewardType } from '@/utils/enums'
import { Model, Schema, model, models } from 'mongoose'

const rewardSchema = new Schema<IReward>({
  type: {
    type: String,
    enum: {
      values: Object.values(RewardType),
      message: 'Invalid reward type.'
    },
    required: [true, 'Reward type is required'],
    trim: true,
    maxlength: 100,
    minlength: 2
  },
  rewards: {
    type: [String],
    required: [true, 'Rewards are required'],
    validate: {
      validator: (rewards: string[]) => rewards.length > 0,
      message: 'Rewards are required'
    }
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
