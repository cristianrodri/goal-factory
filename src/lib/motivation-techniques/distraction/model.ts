import { IDistraction, IDistractionItem, IImpulsivity } from '@/types'
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

// Define your main distraction schema
interface IDistractionDocument extends IDistraction, IBaseDocument {}

interface IDistractionModel extends IBaseModel<IDistractionDocument> {}

const distractionItemSchema = new Schema<IDistractionItem>({
  distraction: {
    type: String,
    trim: true,
    required: [true, 'Distraction item is required'],
    minlength: [2, 'Distraction item must have at least 2 characters.'],
    maxlength: [200, 'Distraction item must have at most 200 characters.']
  }
})

const impulsivitySchema = new Schema<IImpulsivity>({
  impulsivity: {
    type: String,
    trim: true,
    required: [true, 'Impulsivity item is required'],
    minlength: [2, 'Impulsivity item must have at least 2 characters.'],
    maxlength: [200, 'Impulsivity item must have at most 200 characters.']
  },
  timeToDo: {
    type: String,
    required: [true, 'Time to do impulsivity is required'],
    trim: true,
    minlength: [2, 'Time to do impulsivity must have at least 2 characters.'],
    maxlength: [200, 'Time to do impulsivity must have at most 200 characters.']
  }
})

const distractionSchema = new Schema<IDistractionDocument>({
  distractions: [distractionItemSchema],
  impulsivities: [impulsivitySchema],
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is required'],
    ref: 'User',
    unique: true
  }
})

distractionSchema.plugin(uniqueValidator, {
  message: 'Distractions already exists for this user'
})

// Use the transformation function within the toJSON method
distractionSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

// Add static method directly to schema
distractionSchema.statics.findOneOrThrow =
  findOneOrThrow as IBaseModel<IDistractionDocument>['findOneOrThrow']

distractionSchema.statics.findOneAndUpdateOrThrow =
  findOneAndUpdateOrThrow as IBaseModel<IDistractionDocument>['findOneAndUpdateOrThrow']

distractionSchema.statics.findOneAndDeleteOrThrow =
  findOneAndDeleteOrThrow as IBaseModel<IDistractionDocument>['findOneAndDeleteOrThrow']

const Distraction =
  (models['Distraction'] as IDistractionModel) ||
  model<IDistractionDocument, IDistractionModel>(
    'Distraction',
    distractionSchema
  )

export default Distraction
