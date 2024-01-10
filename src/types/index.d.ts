/* User Data */
export interface UserDb {
  user: Schema.Types.ObjectId
}

interface UserData {
  username: string
  email: string
  password: string
}

export interface UserClientId {
  id: string
}

// Types used in the client side
export type AuthUser = ClientId & Omit<UserData, 'password'>
