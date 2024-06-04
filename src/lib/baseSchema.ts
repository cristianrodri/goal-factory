import { Document, FilterQuery, Model } from 'mongoose'
import { Status } from '@/utils/enums'
import { CustomError } from '@/utils/error'

// Base document interface
export interface IBaseDocument extends Document {
  // Add common instance methods here if needed
}

// Base model interface with custom static methods
export interface IBaseModel<T extends IBaseDocument> extends Model<T> {
  findOneOrThrow(query: FilterQuery<T>): Promise<T>
}

// Type implemented when using the static method in the other models
export type FindOneOrThrow<T> = (query: FilterQuery<T>) => Promise<T>

// Implementation of the static method
export async function findOneOrThrow<T extends IBaseDocument>(
  this: IBaseModel<T>,
  query: FilterQuery<T>
): Promise<T> {
  const document = await this.findOne(query)

  if (!document) {
    const modelName = this.modelName
    throw new CustomError(`${modelName} not found`, Status.NOT_FOUND)
  }

  return document as T
}
