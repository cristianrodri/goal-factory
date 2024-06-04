import { IUserData } from '@/types'
import User from './model'

export const createUser = async (reqUser: IUserData) => {
  const user = new User(reqUser)

  const newUser = await user.save()

  return newUser
}
