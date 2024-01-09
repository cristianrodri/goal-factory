import { Types } from 'mongoose'
import jwt from 'jsonwebtoken'

type TokenResponse = {
  _id: string
}

export const createJWT = (userId: { _id: Types.ObjectId }) =>
  jwt.sign({ _id: userId._id.toString() }, process.env.JWT_KEY ?? '')

export const getJWT = (cookieToken: string) => {
  const token = jwt.verify(
    cookieToken,
    process.env.JWT_KEY ?? ''
  ) as TokenResponse

  return token._id
}
