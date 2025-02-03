import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Schema, model } from 'mongoose'
import mongooseNullError from 'mongoose-null-error'
import config from '../../../config'
import { xOAuthProvider, xRole, xUserStatus } from '../../../global/constant'
import { generateUsername } from './../../../shared/files/generator'
import { IUser, IUserModel } from './user.interface'

const oauthSchema = new Schema<IUser['oauth'][number]>(
  {
    id: { type: String, trim: true, required: true },
    provider: { type: String, trim: true, required: true, enum: xOAuthProvider }
  },
  {
    id: false,
    _id: false,
    versionKey: false
  }
)

const schema = new Schema<IUser, IUserModel>(
  {
    first_name: { type: String, trim: true, required: true },
    last_name: { type: String, trim: true, default: '' },
    username: { type: String, trim: true, unique: true, default: '' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: { type: String, enum: xRole, required: true },
    profile_image: { type: String, trim: true, default: '' },
    is_email_verified: { type: Boolean, default: false },
    oauth: [oauthSchema],
    status: { type: String, enum: xUserStatus, default: 'active' }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false
  }
)

schema.plugin(mongooseNullError)

schema.statics.hashGenerator = async password => {
  return await bcrypt.hash(password, Number(config.soltRounds))
}

schema.statics.checkPassword = async (givenPassword, savedPassword) => {
  return await bcrypt.compare(givenPassword, savedPassword)
}

schema.statics.createToken = (payload, secret, expireTime) => {
  return jwt.sign(payload, secret, { expiresIn: expireTime })
}

schema.statics.verifyToken = (token, secret) => {
  return jwt.verify(token, secret) as JwtPayload
}

schema.pre('save', async function () {
  this.password = await User.hashGenerator(this.password)
  this.username = this.username || generateUsername(8)
})
schema.post('save', async function () {
  this.password = await User.hashGenerator(this.password)
  this.username = this.username || generateUsername(8)
})

schema.pre(['updateOne', 'findOneAndUpdate'], async function () {
  const user = <Partial<IUser>>this.getUpdate()

  if (user?.password) {
    user.password = await User.hashGenerator(user.password)
  }
})

export const User = model<IUser, IUserModel>('User', schema)
