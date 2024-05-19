import { Error, MongooseError } from 'mongoose'

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

    // If the error is a mongoose error, check if it's a duplicate user email is the error
    if (/E11000.*email/.test(message)) {
      this.status = 409
      this.message = 'User already exists'
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
