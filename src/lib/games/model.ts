import { IGame } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, model, Model, models, Schema } from 'mongoose'

const gamesSchema = new Schema<IGame>({
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

// Use the transformation function within the toJSON method
gamesSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

const Game =
  (models['Game'] as Model<IGame>) || model<IGame>('Game', gamesSchema)

export default Game
