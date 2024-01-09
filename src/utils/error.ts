import { Error, MongooseError } from 'mongoose'

export class CustomErrorMongoose extends Error.ValidationError {
  status?: number

  constructor(message: string, status?: number) {
    super(new MongooseError(message))
    this.status = status
  }
}

export class CustomError extends Error {
  status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.status = status
  }
}
