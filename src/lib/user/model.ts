import { model, Schema, Document, models, Model } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import { comparePassword } from '@/utils/db'
import { createJWT } from '@/utils/jwt'
import { Status, WeekDay } from '@/utils/enums'
import { CustomError } from '@/utils/error'
import { UserData } from '@/types'

// Define methods for the User document
interface IUserMethods {
  generateAuthToken: () => string
}

// Define the interface for User document
interface IUser extends UserData, IUserMethods, Document {}

export interface IUserModel
  extends Model<IUser, Record<string, never>, IUserMethods> {
  findByCredentials(email: string, password: string): Promise<IUser>
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      maxlength: 30,
      minlength: 2
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      unique: true,
      lowercase: true,
      minlength: [5, 'Email must be at least 5 characters long'],
      maxLength: [100, 'Email must be at most 100 characters long'],
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: 'Email is invalid'
      }
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
      minlength: [6, 'Password must be at least 6 characters long'],
      maxLength: [100, 'Password must be at most 100 characters long'],
      validate: {
        validator: (value: string) => !value.toLowerCase().includes('password'),
        message: 'Password cannot contain "password"'
      }
    },
    dayGame: {
      type: String,
      required: [true, 'Day game is required'],
      enum: {
        values: Object.values(WeekDay),
        message: 'Invalid day game'
      }
    },
    games: {
      type: [String]
    }
  },
  {
    timestamps: true
  }
)

// Define a custom transformation method to exclude the password field
userSchema.methods.toJSON = function () {
  const userObject = this.toObject()
  delete userObject.password

  return userObject
}

// Define a static method for finding a user by credentials
userSchema.statics.findByCredentials = async function (
  email: string,
  password: string
) {
  const user = await (this as IUserModel).findOne({ email })

  if (!user) {
    throw new CustomError('User not found', Status.NOT_FOUND)
  }

  await comparePassword(password, user.password)

  return user
}

// Define a method for generating authentication tokens
userSchema.methods.generateAuthToken = function () {
  const user = this as IUser
  const token = createJWT(user._id)

  return token
}

// Hash plain password before saving
userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }

  next()
})

const User =
  (models['User'] as IUserModel) || model<IUser, IUserModel>('User', userSchema)

export default User
