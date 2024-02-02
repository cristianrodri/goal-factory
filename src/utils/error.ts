import { Error, MongooseError } from 'mongoose'

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
