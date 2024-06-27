import { IFactor } from '@/types'
import { Schema } from 'mongoose'

export const factorSchema = new Schema<IFactor>({
  factor: {
    type: String,
    required: [true, 'Factor is required'],
    trim: true,
    maxlength: [300, 'Factor can not be more than 300 characters'],
    minlength: [2, 'Factor can not be less than 2 characters']
  }
})
