import { IGame } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, model, models, Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import {
  findOneAndDeleteOrThrow,
  findOneAndUpdateOrThrow,
  findOneOrThrow,
  IBaseDocument,
  IBaseModel
} from '@/lib/baseSchema'

// Define your main game schema
interface IGameDocument extends IGame, IBaseDocument {}

interface IGameModel extends IBaseModel<IGameDocument> {}

const gameSchema = new Schema<IGameDocument>({
  game: {
    type: String,
    required: [true, 'Game is required'],
    trim: true,
    minlength: [2, 'Game must be at least 2 characters long'],
    maxLength: [100, 'Game must be at most 100 characters long']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  }
})

gameSchema.index({ game: 1, user: 1 }, { unique: true })

gameSchema.plugin(uniqueValidator, { message: 'Game already exists' })

// Use the transformation function within the toJSON method
gameSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

// Add static method directly to schema
gameSchema.statics.findOneOrThrow =
  findOneOrThrow as IBaseModel<IGameDocument>['findOneOrThrow']

gameSchema.statics.findOneAndUpdateOrThrow =
  findOneAndUpdateOrThrow as IBaseModel<IGameDocument>['findOneAndUpdateOrThrow']

gameSchema.statics.findOneAndDeleteOrThrow =
  findOneAndDeleteOrThrow as IBaseModel<IGameDocument>['findOneAndDeleteOrThrow']

const Game =
  (models['Game'] as IGameModel) ||
  model<IGameDocument, IGameModel>('Game', gameSchema)

export default Game
