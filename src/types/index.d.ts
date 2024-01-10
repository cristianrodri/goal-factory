/* User Data */
export interface UserDb {
  user: Schema.Types.ObjectId
}

interface UserData {
  username: string
  email: string
  password: string
}

export interface UserModelData extends UserData, Document {
  generateAuthToken(): string
}

interface IUserMethods {
  generateAuthToken(): string
}

export interface UserModel
  extends Model<UserModelData, Record<string, never>, IUserMethods> {
  findByCredentials(
    email: string,
    password: string
  ): Promise<Require_id<UserModelData>>
}

export interface UserClientId {
  id: string
}

// Types used in the client side
export type AuthUser = ClientId & Omit<UserData, 'password'>
