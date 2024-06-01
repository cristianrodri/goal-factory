import { IDistraction, IDistractionItem, IImpulsivity } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Model, Schema, model, models } from 'mongoose'

const distractionItemSchema = new Schema<IDistractionItem>({
  distraction: {
    type: String,
    trim: true,
    required: [true, 'Distraction item is required'],
    minlength: [2, 'Distraction item must have at least 2 character.'],
    maxlength: [200, 'Distraction item must have at most 200 characters.']
  }
})

const impulsivitySchema = new Schema<IImpulsivity>({
  impulsivity: {
    type: String,
    trim: true,
    required: [true, 'Impulsivity item is required'],
    minlength: [2, 'Impulsivity item must have at least 2 character.'],
    maxlength: [200, 'Impulsivity item must have at most 200 characters.']
  },
  timeToDo: {
    type: String,
    required: [true, 'Time to do impulsivity is required'],
    trim: true,
    minlength: [2, 'Time to do impulsivity must have at least 2 character.'],
    maxlength: [200, 'Time to do impulsivity must have at most 200 characters.']
  }
})

const distractionSchema = new Schema<IDistraction>({
  distractions: [distractionItemSchema],
  impulsivities: [impulsivitySchema],
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is required'],
    ref: 'User',
    unique: true
  }
})

// Use the transformation function within the toJSON method
distractionSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

const Distraction =
  (models['Distraction'] as Model<IDistraction>) ||
  model<IDistraction>('Distraction', distractionSchema)

export default Distraction
