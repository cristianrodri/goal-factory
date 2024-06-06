import { Error, MongooseError } from 'mongoose'
import { Status } from './enums'

type Errors = {
  [key: string]: {
    properties: {
      message: string
    }
  }
}

export class CustomErrorMongoose extends Error.ValidationError {
  status?: number

  constructor(message: string, status?: number) {
    super(new MongooseError(message))
    this.status = status
  }
}

export class CustomError extends Error {
  message: string
  status?: number

  constructor(message: string, status?: number) {
    super(message)

    this.message = message
    this.status = status

    if (message.includes('Cast to ObjectId failed')) {
      this.status = Status.BAD_REQUEST
      this.message = 'Invalid ID'
    }
  }
}

export const formatValidationErrors = (error: Error.ValidationError) => {
  const errors = error.errors as Errors

  if (errors) {
    for (const field in errors) {
      const errorMessage = errors[field]?.properties?.message
      if (errorMessage) {
        return errorMessage
      }
    }
  }
  return null
}
