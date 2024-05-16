import { IGame } from '@/types'
import { model, Model, models, Schema } from 'mongoose'

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

const Game =
  (models['Game'] as Model<IGame>) || model<IGame>('Game', gamesSchema)

export default Game
