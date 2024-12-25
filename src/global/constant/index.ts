import {
  TActionReferenceType,
  TActionsType,
  TCommentStatus,
  TMimeType,
  TOAuthProvider,
  TReferenceType,
  TRole,
  TStatus,
  TTokenType,
  TUserStatus
} from '../types'

export const xRole: TRole[] = ['admin', 'user']

export const xStatus: TStatus[] = ['publish', 'draft', 'pending', 'trash', 'private']

export const xUserStatus: TUserStatus[] = ['active', 'inactive', 'pending', 'suspended']

export const xTokenType: TTokenType[] = ['email_verification', 'forgot_password']

export const xMimeType: TMimeType[] = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4']

export const xObjectId: RegExp = /^[0-9a-f]{24}$/

export const xIsoDate: RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/

export const xPassword: RegExp = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/

export const xReferenceType: TReferenceType[] = ['Community', 'Blog']

export const xActionReferenceType: TActionReferenceType[] = ['Community', 'Blog', 'Comment']

export const xActionsType: TActionsType[] = ['like', 'dislike']
export const xCommentsStatus: TCommentStatus[] = ['seen', 'unseen']

export const xOAuthProvider: TOAuthProvider[] = ['facebook', 'google']
