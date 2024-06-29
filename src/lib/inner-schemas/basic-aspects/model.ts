import { IBasicAspects, IOptimizingAspects } from '@/types'
import { Schema } from 'mongoose'

export const basicAspectsSchema = new Schema<IBasicAspects>(
  {
    1: Boolean,
    2: Boolean,
    3: Boolean,
    4: Boolean,
    5: Boolean
  },
  { _id: false }
) // _id: false to prevent automatic creation of _id for subdocuments

export const optimizingAspectsSchema = new Schema<IOptimizingAspects>(
  {
    1: Boolean,
    2: Boolean,
    3: Boolean,
    4: Boolean,
    5: Boolean,
    6: Boolean,
    7: Boolean,
    8: Boolean,
    9: Boolean,
    10: Boolean
  },
  { _id: false }
)
