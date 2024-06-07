import {
  Document,
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  UpdateQuery
} from 'mongoose'
import { Status } from '@/utils/enums'
import { CustomError } from '@/utils/error'

// Define the type for the parameters for findOneOrThrow, findOneAndUpdateOrThrow, and findOneAndDeleteOrThrow
type FindOneParams<T> = [
  query: FilterQuery<T>,
  projection?: ProjectionType<T> | null,
  options?: QueryOptions | null
]

type FindOneAndUpdateParams<T> = [
  query: FilterQuery<T>,
  update: UpdateQuery<T>,
  options?: QueryOptions | null
]

type FindOneAndDeleteParams<T> = [
  query: FilterQuery<T>,
  options?: QueryOptions | null
]

// Base document interface
export interface IBaseDocument extends Document {
  // Add common instance methods here if needed
}

// Base model interface with custom static methods
export interface IBaseModel<T extends IBaseDocument> extends Model<T> {
  findOneOrThrow(...args: FindOneParams<T>): Promise<T>
  findOneAndUpdateOrThrow(...args: FindOneAndUpdateParams<T>): Promise<T>
  findOneAndDeleteOrThrow(...args: FindOneAndDeleteParams<T>): Promise<T>
}

// Implementation of the static methods
export async function findOneOrThrow<T extends IBaseDocument>(
  this: IBaseModel<T>,
  ...args: FindOneParams<T>
): Promise<T> {
  const document = await this.findOne(...args)

  if (!document) {
    const modelName = this.modelName
    throw new CustomError(`${modelName} document not found`, Status.NOT_FOUND)
  }

  return document as T
}

export async function findOneAndUpdateOrThrow<T extends IBaseDocument>(
  this: IBaseModel<T>,
  ...args: FindOneAndUpdateParams<T>
): Promise<T> {
  const [query, update, options] = args
  const document = await this.findOneAndUpdate(query, update, {
    new: true,
    runValidators: true,
    context: 'query',
    ...options
  })

  if (!document) {
    const modelName = this.modelName
    throw new CustomError(`${modelName} document not found`, Status.NOT_FOUND)
  }

  return document as T
}

export async function findOneAndDeleteOrThrow<T extends IBaseDocument>(
  this: IBaseModel<T>,
  ...args: FindOneAndDeleteParams<T>
): Promise<T> {
  const [query, options] = args
  const document = await this.findOneAndDelete(query, options)

  if (!document) {
    const modelName = this.modelName
    throw new CustomError(`${modelName} document not found`, Status.NOT_FOUND)
  }

  return document as T
}
