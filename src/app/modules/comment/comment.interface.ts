import { Types } from 'mongoose'
import { TReferenceType, TStatus } from '../../../global/types'

export type IComment = {
  _id: Types.ObjectId
  text: string
  reply: Types.ObjectId | null
  reference: Types.ObjectId
  reference_type: TReferenceType
  user: Types.ObjectId
  status: TStatus
  createdAt: Date
  updatedAt: Date
}
