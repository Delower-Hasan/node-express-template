import { Schema, model } from 'mongoose'
import mongooseNullError from 'mongoose-null-error'
import { xCommentsStatus } from '../../../global/constant'
import { IContact, IContactModel } from './contact.interface'

const schema = new Schema<IContact, IContactModel>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    isSeen: { type: String, enum: xCommentsStatus, default: 'unseen' }
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

export const Contact = model<IContact, IContactModel>('Contact', schema)
