import { Model, Types } from 'mongoose'
import { TTokenType } from '../../../global/types'

export type IToken = {
  _id: Types.ObjectId
  otp: number
  token: string
  token_type: TTokenType
  expires: Date
  user: Types.ObjectId
  is_blacklisted: boolean
  is_used: boolean
  createdAt: Date
  updatedAt: Date
}

export type ITokenModel = {
  blacklistedHandler(token: string, value?: boolean): Promise<IToken>
  usedHandler(token: string, value?: boolean): Promise<boolean>
} & Model<IToken>
