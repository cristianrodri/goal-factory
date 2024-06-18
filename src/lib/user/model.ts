import { model, Schema, Document, models } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import { comparePassword, toJSONTransform } from '@/utils/db'
import { createJWT } from '@/utils/jwt'
import { WeekDay } from '@/utils/enums'
import { IUserData } from '@/types'
import uniqueValidator from 'mongoose-unique-validator'
import '@/lib/motivation-techniques/impulse/model'
import '@/lib/motivation-techniques/dependency/model'
import '@/lib/motivation-techniques/task-samurai/model'
import '@/lib/motivation-techniques/productive-procrastination/model'
import '@/lib/motivation-techniques/distraction/model'
import '@/lib/reward/model'
import '@/lib/game/model'
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
    timestamps: true,
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
  }
)

userSchema.plugin(uniqueValidator, { message: 'User already exists' })

// Use the transformation function within the toJSON method
userSchema.methods.toJSON = function () {
  return toJSONTransform(this as Document)
}

userSchema.virtual('impulses', {
  ref: 'Impulse', // The model to use
  localField: '_id', // Find impulses where `localField`
  foreignField: 'user' // is equal to `foreignField`
})

userSchema.virtual('dependency', {
  ref: 'Dependency', // The model to use
  localField: '_id', // Find dependencies where `localField`
  foreignField: 'user', // is equal to `foreignField`
  justOne: true
})

userSchema.virtual('taskSamurai', {
  ref: 'TaskSamurai', // The model to use
  localField: '_id', // Find tasks_samurai where `localField`
  foreignField: 'user', // is equal to `foreignField`
  justOne: true
})

userSchema.virtual('productiveProcrastination', {
  ref: 'ProductiveProcrastination', // The model to use
  localField: '_id', // Find productive_procrastinations where `localField`
  foreignField: 'user', // is equal to `foreignField`
  justOne: true
})

userSchema.virtual('rewards', {
  ref: 'Reward', // The model to use
  localField: '_id', // Find rewards where `localField`
  foreignField: 'user' // is equal to `foreignField`
})

userSchema.virtual('distraction', {
  ref: 'Distraction', // The model to use
  localField: '_id', // Find distractions where `localField`
  foreignField: 'user', // is equal to `foreignField`
  justOne: true
})

userSchema.virtual('games', {
  ref: 'Game', // The model to use
  localField: '_id', // Find games where `localField`
  foreignField: 'user' // is equal to `foreignField`
})

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
