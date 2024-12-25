import { JwtPayload } from 'jsonwebtoken'
import { AnyZodObject, z, ZodEffects } from 'zod'
import { AuthZod } from '../../app/modules/auth/auth.zod'

export type TRole = 'admin' | 'user'

export type TStatus = 'publish' | 'draft' | 'pending' | 'trash' | 'private'

export type TUserStatus = 'active' | 'inactive' | 'pending' | 'suspended'

export type TTokenType = 'number_verification' | 'email_verification' | 'forgot_password'

export type TMimeType = 'image/png' | 'image/jpeg' | 'image/webp' | 'video/mp4'

export type TReferenceType = 'Community' | 'Blog'

export type TActionReferenceType = 'Community' | 'Blog' | 'Comment'

export type TActionsType = 'like' | 'dislike'

export type TJwtUser =
  | (JwtPayload & {
      _id: string
      role: TRole
    })
  | null

export type TPagination = {
  current: number
  total: number
  next: number | null
  prev: number | null
  records: number
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TReqQuery = Record<string, any>

export type TCreate<T> = (
  data: T,
  user: TJwtUser
) => Promise<{
  data: Partial<T> | null
}>

export type TQuery<T> = (
  query: TReqQuery,
  user: TJwtUser
) => Promise<{
  data: Partial<T>[] | null
  pagination: TPagination
}>

export type TGet<T> = (
  id: string,
  query: TReqQuery,
  user: TJwtUser
) => Promise<{
  data: Partial<T> | null
}>

export type TUpdate<T> = (
  id: string,
  data: Partial<T>,
  user: TJwtUser
) => Promise<{
  data: Partial<T> | null
}>

export type TDelete<T> = (
  id: string,
  user: TJwtUser
) => Promise<{
  data: Partial<T> | null
}>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TZod<T extends Record<string, any> = Record<string, any>> = (arg: {
  user: TJwtUser
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: T | Record<string, any>
}) => AnyZodObject | ZodEffects<AnyZodObject>

export type TResetPassword = z.infer<typeof AuthZod.resetPassword>['body']

export type TForgotPassword = z.infer<typeof AuthZod.forgotPassword>['body']

export type TLogin = z.infer<typeof AuthZod.login>['body']

export type TOAuthProvider = 'facebook' | 'google'
export type TCommentStatus = 'seen' | 'unseen'
