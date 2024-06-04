import {
  Document,
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions
} from 'mongoose'
import { Status } from '@/utils/enums'
import { CustomError } from '@/utils/error'

// Define the type for the parameters
type FindOneOrThrowParams<T> = [
  query: FilterQuery<T>,
  projection?: ProjectionType<T> | null,
  options?: QueryOptions | null
]

// Base document interface
export interface IBaseDocument extends Document {
  // Add common instance methods here if needed
}

// Base model interface with custom static methods
export interface IBaseModel<T extends IBaseDocument> extends Model<T> {
  findOneOrThrow(...args: FindOneOrThrowParams<T>): Promise<T>
}

// Implementation of the static method
export async function findOneOrThrow<T extends IBaseDocument>(
  this: IBaseModel<T>,
  ...args: FindOneOrThrowParams<T>
): Promise<T> {
  const document = await this.findOne(...args)

  if (!document) {
    const modelName = this.modelName
    throw new CustomError(`${modelName} not found`, Status.NOT_FOUND)
  }

  return document as T
}
