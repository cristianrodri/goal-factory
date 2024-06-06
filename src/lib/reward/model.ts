import { IReward, IRewardDescription } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Schema, model, models } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import {
  findOneAndDeleteOrThrow,
  findOneAndUpdateOrThrow,
  findOneOrThrow,
  IBaseDocument,
  IBaseModel
} from '@/lib/baseSchema'

// Define your main reward schema
interface IRewardDocument extends IReward, IBaseDocument {}

interface IRewardModel extends IBaseModel<IRewardDocument> {}

const rewardsSchema = new Schema<IRewardDescription>({
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [2, 'Description is too short'],
    maxlength: [100, 'Description is too long. Max 100 characters.']
  }
})

const rewardSchema = new Schema<IRewardDocument>({
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

rewardSchema.plugin(uniqueValidator, {
  message: 'Reward already exists for this user'
})

// Use the transformation function within the toJSON method
rewardSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

// Add static method directly to schema
rewardSchema.statics.findOneOrThrow =
  findOneOrThrow as IBaseModel<IRewardDocument>['findOneOrThrow']

rewardSchema.statics.findOneAndUpdateOrThrow =
  findOneAndUpdateOrThrow as IBaseModel<IRewardDocument>['findOneAndUpdateOrThrow']

rewardSchema.statics.findOneAndDeleteOrThrow =
  findOneAndDeleteOrThrow as IBaseModel<IRewardDocument>['findOneAndDeleteOrThrow']

const Reward =
  (models['Reward'] as IRewardModel) ||
  model<IRewardDocument, IRewardModel>('Reward', rewardSchema)

export default Reward
