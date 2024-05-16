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
    trim: true
  },
  rewards: {
    type: [String],
    required: [true, 'Rewards are required']
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
