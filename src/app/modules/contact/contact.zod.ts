import { string, z } from 'zod'
import { xCommentsStatus, xObjectId } from '../../../global/constant'

const createOperation = z.object({
  body: z.strictObject({
    name: z.string(),
    email: z.string(),
    message: z.string(),
    isSeen: z.enum(xCommentsStatus as [string, ...string[]]).optional()
  })
})

const queryOperation = z.object({
  query: z.object({
    search: z.string().optional()
  })
})

const getOperation = z.object({
  params: z.object({
    id: string()
  }),
  query: z.object({})
})

const updateOperation = z.object({
  params: z.object({
    id: string().regex(xObjectId)
  }),
  body: z.strictObject({
    name: z.string().optional(),
    email: z.string().optional(),
    message: z.string().optional(),
    isSeen: z.enum(xCommentsStatus as [string, ...string[]]).optional()
  })
})

const deleteOperation = z.object({
  params: z.object({
    id: string().regex(xObjectId)
  })
})

export const ContactZod = {
  createOperation,
  queryOperation,
  getOperation,
  updateOperation,
  deleteOperation
}
