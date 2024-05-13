import { ITotalStructureFocus } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

const totalStructureFocusSchema = new Schema<ITotalStructureFocus>({
  focusIdeas: {
    type: [
      {
        type: String,
        trim: true,
        minlength: [2, 'Focus idea must be at least 2 characters long'],
        maxlength: [200, 'Focus idea must be at most 200 characters long']
      }
    ]
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  bigGoal: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'BigGoal'
  }
})

const TotalStructureFocus =
  (models['TotalStructureFocus'] as Model<ITotalStructureFocus>) ||
  model<ITotalStructureFocus>('TotalStructureFocus', totalStructureFocusSchema)

export default TotalStructureFocus
