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

    if (
      /^(?=.*\bE11000\b)(?=.*\bduplicate\b)(?=.*\brewards\b)(?=.*\btype\b)/.test(
        message
      )
    ) {
      this.status = Status.BAD_REQUEST
      this.message = 'User already has reward types'
    }

    if (/^(?=.*\bE11000\b)(?=.*\bduplicate\b)(?=.*\bgames\b)/.test(message)) {
      this.status = Status.BAD_REQUEST
      this.message = 'Game already exists'
    }

    if (
      /^(?=.*\bE11000\b)(?=.*\bduplicate\b)(?=.*\bmotivationtechniques\b)/.test(
        message
      )
    ) {
      this.status = Status.BAD_REQUEST
      this.message = 'Motivation techniques data already exist'
    }

    if (
      /^(?=.*\bE11000\b)(?=.*\bduplicate\b)(?=.*\bmotivationcalculations\b)/.test(
        message
      )
    ) {
      this.status = Status.BAD_REQUEST
      this.message = 'Motivation calculation already exists for this big goal'
    }

    if (
      /^(?=.*\bE11000\b)(?=.*\bduplicate\b)(?=.*\bautomatichabits\b)/.test(
        message
      )
    ) {
      this.status = Status.BAD_REQUEST
      this.message = 'Automatic habit already exists for this big goal'
    }

    if (
      /^(?=.*\bE11000\b)(?=.*\bduplicate\b)(?=.*\bcontaminatetemptations\b)/.test(
        message
      )
    ) {
      this.status = Status.BAD_REQUEST
      this.message = 'Contaminate temptation already exists for this big goal'
    }

    if (
      /^(?=.*\bE11000\b)(?=.*\bduplicate\b)(?=.*\bdependencies\b)/.test(message)
    ) {
      this.status = Status.BAD_REQUEST
      this.message = 'Dependencies already exists for this user'
    }

    if (/^(?=.*\bE11000\b)(?=.*\bduplicate\b)(?=.*\bhabits\b)/.test(message)) {
      this.status = Status.BAD_REQUEST
      this.message = 'Habit already exists'
    }

    if (message.includes('Cast to ObjectId failed')) {
      this.status = Status.BAD_REQUEST
      this.message = 'Invalid ID'
    }

    // If the error is a mongoose error, check if it's a duplicate user email is the error
    if (/E11000.*email/.test(message)) {
      this.status = Status.BAD_REQUEST
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
