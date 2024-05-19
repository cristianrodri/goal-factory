import bcrypt from 'bcryptjs'
import { Document, QueryOptions } from 'mongoose'

export const comparePassword = async (
  password: string,
  hashedPassword: string,
  errorMessage = 'Wrong password!'
) => {
  const matchedPassword = await bcrypt.compare(password, hashedPassword)

  if (!matchedPassword) {
    throw new Error(errorMessage)
  }

  return matchedPassword
}

export function toJSONTransform(doc: Document) {
  const obj = doc.toObject()

  obj.id = obj._id
  delete obj._id
  delete obj?.password // Conditionally delete the password field if it exists
  delete obj.__v

  return obj
}

export const updateOptions: QueryOptions = {
  new: true,
  runValidators: true,
  context: 'query'
}
