import { Model, Types } from 'mongoose'
import { TCommentStatus } from '../../../global/types'

export type IContact = {
  _id: Types.ObjectId
  name: string
  email: string
  message: string
  isSeen: TCommentStatus
  createdAt: Date
  updatedAt: Date
}

export type IContactModel = Model<IContact>
