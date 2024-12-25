import { Model, Types } from 'mongoose'
import { TStatus } from '../../../global/types'
import { IEmbededMedia } from '../media/media.interface'

export type IBlog = {
  _id: Types.ObjectId
  title: string
  category: Types.ObjectId | null
  slug: string
  sub_title: string
  description: string
  user: Types.ObjectId
  featured_image: IEmbededMedia
  cover_image: IEmbededMedia
  status: TStatus
  createdAt: Date
  updatedAt: Date
}

export type IBlogModel = Model<IBlog>
