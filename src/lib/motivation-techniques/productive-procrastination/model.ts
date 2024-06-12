import {
  findOneAndDeleteOrThrow,
  findOneAndUpdateOrThrow,
  findOneOrThrow,
  IBaseDocument,
  IBaseModel
} from '@/lib/baseSchema'
import { IProductiveProcrastination } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Schema, model, models } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

// Define your main productive procrastination schema
interface IProductiveProcrastinationDocument
  extends IProductiveProcrastination,
    IBaseDocument {}

interface IProductiveProcrastinationModel
  extends IBaseModel<IProductiveProcrastinationDocument> {}

const productiveProcrastinationSchema =
  new Schema<IProductiveProcrastinationDocument>({
    productiveList: [
      {
        list: {
          type: String,
          trim: true,
          minlength: [
            2,
            'Productive list item must have at least 2 character.'
          ],
          maxlength: [
            200,
            'Productive list item must have at most 200 characters.'
          ]
        }
      }
    ],
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User is required'],
      ref: 'User',
      unique: true
    }
  })

// Use the unique validator plugin
productiveProcrastinationSchema.plugin(uniqueValidator, {
  message: 'Productive procrastination already exists for this big goal.'
})

// Use the transformation function within the toJSON method
productiveProcrastinationSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

// Add static method directly to schema
productiveProcrastinationSchema.statics.findOneOrThrow =
  findOneOrThrow as IBaseModel<IProductiveProcrastinationDocument>['findOneOrThrow']

productiveProcrastinationSchema.statics.findOneAndUpdateOrThrow =
  findOneAndUpdateOrThrow as IBaseModel<IProductiveProcrastinationDocument>['findOneAndUpdateOrThrow']

productiveProcrastinationSchema.statics.findOneAndDeleteOrThrow =
  findOneAndDeleteOrThrow as IBaseModel<IProductiveProcrastinationDocument>['findOneAndDeleteOrThrow']

const ProductiveProcrastination =
  (models['ProductiveProcrastination'] as IProductiveProcrastinationModel) ||
  model<IProductiveProcrastinationDocument, IProductiveProcrastinationModel>(
    'ProductiveProcrastination',
    productiveProcrastinationSchema
  )

export default ProductiveProcrastination
