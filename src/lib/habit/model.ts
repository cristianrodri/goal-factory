import { IHabit } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Schema, model, models } from 'mongoose'
import {
  findOneAndDeleteOrThrow,
  findOneAndUpdateOrThrow,
  findOneOrThrow,
  IBaseDocument,
  IBaseModel
} from '@/lib/baseSchema'

// Define your main habit schema
interface IHabitDocument extends IHabit, IBaseDocument {}

interface IHabitModel extends IBaseModel<IHabitDocument> {}

const habitSchema = new Schema<IHabitDocument>({
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [2, 'Description is too short. Min length is 2 characters'],
    maxlength: [100, 'Description is too long. Max length is 100 characters']
  },
  days: {
    type: {
      monday: {
        type: Boolean,
        default: false
      },
      tuesday: {
        type: Boolean,
        default: false
      },
      wednesday: {
        type: Boolean,
        default: false
      },
      thursday: {
        type: Boolean,
        default: false
      },
      friday: {
        type: Boolean,
        default: false
      },
      saturday: {
        type: Boolean,
        default: false
      },
      sunday: {
        type: Boolean,
        default: false
      }
    },
    _id: false
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is required'],
    ref: 'User'
  }
})

habitSchema.index({ user: 1, description: 1 }, { unique: true })

// Use the transformation function within the toJSON method
habitSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

// Add static method directly to schema
habitSchema.statics.findOneOrThrow =
  findOneOrThrow as IBaseModel<IHabitDocument>['findOneOrThrow']

habitSchema.statics.findOneAndUpdateOrThrow =
  findOneAndUpdateOrThrow as IBaseModel<IHabitDocument>['findOneAndUpdateOrThrow']

habitSchema.statics.findOneAndDeleteOrThrow =
  findOneAndDeleteOrThrow as IBaseModel<IHabitDocument>['findOneAndDeleteOrThrow']

const Habit =
  (models['Habit'] as IHabitModel) ||
  model<IHabitDocument, IHabitModel>('Habit', habitSchema)

export default Habit
