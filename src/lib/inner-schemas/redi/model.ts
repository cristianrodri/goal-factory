import { IRedi } from '@/types'
import { Schema } from 'mongoose'

export const rediSchema = new Schema<IRedi>(
  {
    challenge: {
      type: Number,
      min: [1, 'Challenge must be at least 1'],
      max: [10, 'Challenge must not exceed 10']
    },
    specific: {
      type: Number,
      min: [1, 'Specific must be at least 1'],
      max: [10, 'Specific must not exceed 10']
    },
    directed: {
      type: Number,
      min: [1, 'Directed must be at least 1'],
      max: [10, 'Directed must not exceed 10']
    },
    immediate: {
      type: Number,
      min: [1, 'Immediate must be at least 1'],
      max: [10, 'Immediate must not exceed 10']
    }
  },
  { _id: false }
)
