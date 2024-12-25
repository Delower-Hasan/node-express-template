import { Date, Model, Types } from 'mongoose'
import { TStatus } from '../../../global/types'

export type IMedia = {
  _id: Types.ObjectId
  sid: string
  name: string
  size: number
  type: string
  user: Types.ObjectId
  status: TStatus
  createdAt: Date
  updatedAt: Date
}

export type IMediaModel = Model<IMedia>

export type IEmbededMedia = {
  sid: IMedia['sid']
  name: IMedia['name']
  size: IMedia['size']
  type: IMedia['type']
  reference: IMedia['_id']
}
