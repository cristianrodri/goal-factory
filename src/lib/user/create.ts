import { UserData } from '@/types'
import User from './model'

export const createUser = async (reqUser: UserData) => {
  const user = new User(reqUser)

  const newUser = await user.save()

  return newUser
}
