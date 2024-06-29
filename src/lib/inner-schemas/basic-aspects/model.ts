import { IBasicAspects, IOptimizingAspects } from '@/types'
import { Schema } from 'mongoose'

export const basicAspectsSchema = new Schema<IBasicAspects>(
  {
    1: { type: Boolean, default: false },
    2: { type: Boolean, default: false },
    3: { type: Boolean, default: false },
    4: { type: Boolean, default: false },
    5: { type: Boolean, default: false }
  },
  { _id: false }
) // _id: false to prevent automatic creation of _id for subdocuments

export const optimizingAspectsSchema = new Schema<IOptimizingAspects>(
  {
    1: { type: Boolean, default: false },
    2: { type: Boolean, default: false },
    3: { type: Boolean, default: false },
    4: { type: Boolean, default: false },
    5: { type: Boolean, default: false },
    6: { type: Boolean, default: false },
    7: { type: Boolean, default: false },
    8: { type: Boolean, default: false },
    9: { type: Boolean, default: false },
    10: { type: Boolean, default: false }
  },
  { _id: false }
)
