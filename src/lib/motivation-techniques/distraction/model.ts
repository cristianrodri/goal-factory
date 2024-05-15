import { IDistraction } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

const distractionSchema = new Schema<IDistraction>({
  distractions: [
    {
      type: String,
      trim: true,
      minlength: [2, 'Distraction item must have at least 2 character.'],
      maxlength: [200, 'Distraction item must have at most 200 characters.']
    }
  ],
  impulsivities: [
    {
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
        minlength: [
          2,
          'Time to do impulsivity must have at least 2 character.'
        ],
        maxlength: [
          200,
          'Time to do impulsivity must have at most 200 characters.'
        ]
      }
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is required'],
    ref: 'User'
  }
})

const Distraction =
  (models['Distraction'] as Model<IDistraction>) ||
  model<IDistraction>('Distraction', distractionSchema)

export default Distraction
