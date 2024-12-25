import { Schema, model } from 'mongoose'
import mongooseNullError from 'mongoose-null-error'
import { xTokenType } from '../../../global/constant'
import { IToken, ITokenModel } from './token.interface'

const schema = new Schema<IToken, ITokenModel>(
  {
    otp: { type: Number, required: true, immutable: true },
    token: { type: String, required: true, trim: true, unique: true, immutable: true },
    token_type: { type: String, enum: xTokenType, required: true, immutable: true },
    expires: { type: Date, required: true, immutable: true },
    user: { type: Schema.ObjectId, ref: 'User', required: true, immutable: true },
    is_blacklisted: { type: Boolean, required: true, default: false },
    is_used: { type: Boolean, required: true, default: false }
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

schema.statics.blacklistedHandler = async (token, value = true) => {
  return await Token.findOneAndUpdate({ token }, { is_blacklisted: value }, { mongooseNullError: true })
}

schema.statics.usedHandler = async (token, value = true) => {
  return await Token.findOneAndUpdate({ token }, { is_used: value }, { mongooseNullError: true })
}

export const Token = model<IToken, ITokenModel>('Token', schema)
