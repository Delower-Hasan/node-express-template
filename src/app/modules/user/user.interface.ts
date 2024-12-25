import { JwtPayload, Secret } from 'jsonwebtoken'
import { Model, Types } from 'mongoose'
import { TOAuthProvider, TPSNResp, TRole, TUserStatus } from '../../../global/types'

export type IUser = {
  _id: Types.ObjectId
  first_name: string
  last_name: string
  username: string
  email: string
  password: string
  PSN_info: TPSNResp
  role: TRole
  profile_image: string
  metamask: string
  playstation: string
  xbox: string
  stream: string
  is_email_verified: boolean
  oauth: {
    id: string
    provider: TOAuthProvider
  }[]
  status: TUserStatus
  createdAt: Date
  updatedAt: Date
}

export type IUserModel = {
  hashGenerator(password: string): Promise<string>
  checkPassword(givenPassword: string, savedPassword: string): Promise<boolean>
  createToken(paylod: Record<string, unknown>, secret: string, expireTime: string): string
  verifyToken(token: string, secret: Secret): JwtPayload
} & Model<IUser>
