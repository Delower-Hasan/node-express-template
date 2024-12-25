import { Schema, model } from 'mongoose'
import mongooseNullError from 'mongoose-null-error'
import { xStatus } from '../../../global/constant'
import { slugMaker } from '../../../shared'
import { embededMediaSchema } from '../media/media.model'
import { IBlog, IBlogModel } from './blog.interface'

const schema = new Schema<IBlog, IBlogModel>(
  {
    title: { type: String, required: true, trim: true },
    sub_title: { type: String, required: true, trim: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    description: { type: String, required: true, trim: true },
    slug: { type: String, trim: true, unique: true },
    user: { type: Schema.ObjectId, ref: 'User', required: true },
    featured_image: { type: embededMediaSchema, required: true },
    cover_image: { type: embededMediaSchema, required: true },
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

schema.pre('save', function () {
  this.slug = slugMaker(this.slug ?? this.title)
})

schema.pre('updateOne', async function () {
  const data = <Partial<IBlog>>this.getUpdate()

  if (data?.slug) {
    data.slug = slugMaker(data.slug)
  }
})

schema.virtual('comment_count', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'reference',
  count: true
})

export const Blog = model<IBlog, IBlogModel>('Blog', schema)
