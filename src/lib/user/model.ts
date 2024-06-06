import { model, Schema, Document, models } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import { comparePassword, toJSONTransform } from '@/utils/db'
import { createJWT } from '@/utils/jwt'
import { WeekDay } from '@/utils/enums'
import { IUserData } from '@/types'
import uniqueValidator from 'mongoose-unique-validator'
import {
  findOneAndDeleteOrThrow,
  findOneAndUpdateOrThrow,
  findOneOrThrow,
  IBaseDocument,
  IBaseModel
} from '@/lib/baseSchema'

// Define your main user schema
interface IUserDocument extends IUserData, IBaseDocument {
  generateAuthToken(): string
}

export interface IUserModel extends IBaseModel<IUserDocument> {
  findByCredentials(email: string, password: string): Promise<IUserDocument>
}

const userSchema = new Schema<IUserDocument>(
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
      enum: {
        values: Object.values(WeekDay),
        message: 'Invalid day game'
      }
    }
  },
  {
    timestamps: true
  }
)

userSchema.plugin(uniqueValidator, { message: 'User already exists' })

// Use the transformation function within the toJSON method
userSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

// Add static method directly to schema
userSchema.statics.findOneOrThrow =
  findOneOrThrow as IBaseModel<IUserDocument>['findOneOrThrow']

userSchema.statics.findOneAndUpdateOrThrow =
  findOneAndUpdateOrThrow as IBaseModel<IUserDocument>['findOneAndUpdateOrThrow']

userSchema.statics.findOneAndDeleteOrThrow =
  findOneAndDeleteOrThrow as IBaseModel<IUserDocument>['findOneAndDeleteOrThrow']

// Define a static method for finding a user by credentials
userSchema.statics.findByCredentials = async function (
  email: string,
  password: string
) {
  const user = await (this as IUserModel).findOneOrThrow({ email })

  await comparePassword(password, user.password)

  return user
}

// Define a method for generating authentication tokens
userSchema.methods.generateAuthToken = function () {
  const user = this as IUserDocument
  const token = createJWT(user._id)

  return token
}

// Hash plain password before saving
userSchema.pre<IUserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }

  next()
})

const User =
  (models['User'] as IUserModel) ||
  model<IUserDocument, IUserModel>('User', userSchema)

export default User
