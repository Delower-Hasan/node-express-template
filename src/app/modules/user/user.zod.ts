import { string, z } from 'zod'
import { xObjectId, xPassword, xRole, xUserStatus } from '../../../global/constant'

const queryOperation = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
  role: z.string().optional(),
  is_email_verified: z.boolean().optional(),
  status: z.string().optional()
})

const getOperation = z.object({
  params: z.object({
    id: string().regex(xObjectId)
  }),
  query: z.object({
    status: z.string().optional(),
    search: z.string().optional(),
    get: z.enum(['stats']).optional()
  })
})

const updateOperation = z.object({
  params: z.object({
    id: string().regex(xObjectId)
  }),
  body: z.strictObject({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    username: z.string().optional(),
    email: z.string().email().optional(),
    profile_image: z.string().optional(),
    role: z.enum(xRole as [string, ...string[]]).optional(),
    status: z.enum(xUserStatus as [string, ...string[]]).optional(),
    password: z.string().regex(xPassword).optional()
  })
})

const deleteOperation = z.object({
  params: z.object({
    id: string().regex(xObjectId)
  })
})

export const UserZod = {
  queryOperation,
  getOperation,
  updateOperation,
  deleteOperation
}
