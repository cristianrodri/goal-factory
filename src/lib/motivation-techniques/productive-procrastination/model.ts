import { IProductiveProcrastination } from '@/types'
import { Model, Schema, model, models } from 'mongoose'

const productiveProcrastinationSchema = new Schema<IProductiveProcrastination>({
  productiveList: {
    type: [
      {
        type: String,
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
    required: true,
    ref: 'User'
  }
})

const ProductiveProcrastination =
  (models['ProductiveProcrastination'] as Model<IProductiveProcrastination>) ||
  model<IProductiveProcrastination>(
    'ProductiveProcrastination',
    productiveProcrastinationSchema
  )

export default ProductiveProcrastination
