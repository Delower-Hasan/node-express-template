import { Schema, model } from 'mongoose'
import mongooseNullError from 'mongoose-null-error'
import { xReferenceType, xStatus } from '../../../global/constant'
import { IComment } from './comment.interface'

const schema = new Schema<IComment>(
  {
    text: { type: String, required: true, trim: true },
    reply: { type: Schema.Types.ObjectId, ref: 'Comment', default: null },
    reference: { type: Schema.Types.ObjectId, refPath: 'reference_type', required: true },
    reference_type: { type: String, enum: xReferenceType, default: 'Community' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: xStatus, default: 'publish' }
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

schema.virtual('total_likes', {
  localField: '_id',
  foreignField: 'reference',
  ref: 'Action',
  match: { action_type: { $eq: 'like' } },
  count: true
})

schema.virtual('total_dislikes', {
  localField: '_id',
  foreignField: 'reference',
  ref: 'Action',
  match: { action_type: { $eq: 'dislike' } },
  count: true
})

/**
 * * The match field should be dynamically overwritten with the user ID when populating.
 * * Note: `userId` should be update dynamically
 *
 * Example: {
 *   path: 'my_action',
 *   match: { user: { $eq: userId } }
 * }
 */

schema.virtual('my_action', {
  localField: '_id',
  foreignField: 'reference',
  ref: 'Action',
  justOne: true,
  match: {
    user: { $eq: '' }
  }
})

export const Comment = model<IComment>('Comment', schema)
