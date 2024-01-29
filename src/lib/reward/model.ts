import { IReward } from '@/types'
import { REWARD } from '@/utils/enums'
import { Model, Schema, model, models } from 'mongoose'

const rewardSchema = new Schema<IReward>({
  type: {
    type: String,
    enum: {
      values: Object.values(REWARD),
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
    required: true,
    ref: 'User'
  }
})

const Reward =
  (models['Reward'] as Model<IReward>) || model<IReward>('Reward', rewardSchema)

export default Reward
