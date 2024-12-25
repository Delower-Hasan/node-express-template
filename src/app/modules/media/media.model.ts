import { model, Schema } from 'mongoose'
import mongooseNullError from 'mongoose-null-error'
import config from '../../../config'
import { xStatus } from '../../../global/constant'
import { IEmbededMedia, IMedia, IMediaModel } from './media.interface'

const schema = new Schema<IMedia, IMediaModel>(
  {
    sid: { type: String, required: true, trim: true, immutable: true },
    name: { type: String, required: true, trim: true, immutable: true },
    size: { type: Number, min: 0, required: true, immutable: true },
    type: { type: String, required: true, trim: true, immutable: true },
    user: { type: Schema.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: xStatus, default: 'publish' }
  },
  {
    id: false,
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

schema.plugin(mongooseNullError)

schema.virtual('url').get(function () {
  return `https://${config.aws.bucketName}.s3.${config.aws.region}.amazonaws.com/${this.sid}`
})

export const Media = model<IMedia, IMediaModel>('Media', schema)

export const embededMediaSchema = new Schema<IEmbededMedia>(
  {
    sid: { type: String, trim: true, required: true },
    name: { type: String, trim: true, required: true },
    size: { type: Number, min: 0, required: true },
    type: { type: String, trim: true, required: true },
    reference: { type: Schema.ObjectId, ref: 'Media', required: true }
  },
  {
    id: false,
    _id: false,
    timestamps: false,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

embededMediaSchema.virtual('url').get(function () {
  return `https://${config.aws.bucketName}.s3.${config.aws.region}.amazonaws.com/${this.sid}`
})
