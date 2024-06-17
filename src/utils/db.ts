import bcrypt from 'bcryptjs'
import { Document } from 'mongoose'

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

const transformArray = (arr: Record<string, never>[]) => {
  return arr.map(item => {
    if (item && '_id' in item) {
      item.id = item._id
      delete item._id
    }
    delete item?.__v

    for (const key in item) {
      if (Array.isArray(item[key])) {
        transformArray(item[key])
      }
    }
    return item
  })
}

export function toJSONTransform(doc: Document) {
  const obj = doc.toObject()

  obj.id = obj._id
  delete obj._id
  delete obj?.password // Conditionally delete the password field if it exists
  delete obj.__v

  // Transform arrays by changing the _id field to id in each object
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      obj[key] = transformArray(obj[key])
    }
  }

  return obj
}
