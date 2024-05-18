import { IProductiveProcrastination } from '@/types'
import { toJSONTransform } from '@/utils/db'
import { Document, Model, Schema, model, models } from 'mongoose'

const productiveProcrastinationSchema = new Schema<IProductiveProcrastination>({
  productiveList: {
    type: [
      {
        type: String,
        trim: true,
        minlength: [
          2,
          'Productive procrastination item must have at least 2 character.'
        ],
        maxlength: [
          200,
          'Productive procrastination item must have at most 200 characters.'
        ]
      }
    ]
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is required'],
    ref: 'User'
  }
})

// Use the transformation function within the toJSON method
productiveProcrastinationSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

const ProductiveProcrastination =
  (models['ProductiveProcrastination'] as Model<IProductiveProcrastination>) ||
  model<IProductiveProcrastination>(
    'ProductiveProcrastination',
    productiveProcrastinationSchema
  )

export default ProductiveProcrastination
