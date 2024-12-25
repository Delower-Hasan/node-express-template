import { string, z } from 'zod'
import { xObjectId, xReferenceType, xStatus } from '../../../global/constant'

const createOperation = z.object({
  body: z.strictObject({
    text: z.string(),
    reply: z.string().regex(xObjectId).optional(),
    reference: z.string().regex(xObjectId),
    reference_type: z.enum(xReferenceType as [string, ...string[]]).optional(),
    status: z.enum(xStatus as [string, ...string[]]).optional()
  })
})

const updateOperation = z.object({
  params: z.object({
    id: string().regex(xObjectId)
  }),
  body: z.strictObject({
    text: z.string().optional(),
    status: z.enum(xStatus as [string, ...string[]]).optional()
  })
})

const queryOperation = z.object({
  query: z.object({
    status: z.string().optional(),
    reference_type: z.string().optional(),
    populate: z.string().optional()
  })
})

const deleteOperation = z.object({
  params: z.object({
    id: string().regex(xObjectId)
  })
})

export const CommentZod = {
  createOperation,
  updateOperation,
  deleteOperation,
  queryOperation
}
