import { ITotalStructureFocus } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Model, Schema, model, models } from 'mongoose'

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
    required: [true, 'User is required'],
    ref: 'User'
  },
  bigGoal: {
    type: Schema.Types.ObjectId,
    required: [true, 'Big goal is required'],
    ref: 'BigGoal'
  }
})

// Use the transformation function within the toJSON method
totalStructureFocusSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

const TotalStructureFocus =
  (models['TotalStructureFocus'] as Model<ITotalStructureFocus>) ||
  model<ITotalStructureFocus>('TotalStructureFocus', totalStructureFocusSchema)

export default TotalStructureFocus
