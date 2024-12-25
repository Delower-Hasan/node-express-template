import { string, z } from 'zod'
import { xObjectId, xStatus } from '../../../global/constant'

const createOperation = z.object({
  body: z.strictObject({
    title: z.string().optional(),
    slug: z.string().optional(),
    sub_title: z.string().optional(),
    description: z.string().optional(),
    category: z.string().regex(xObjectId).optional(),
    featured_image: z.string().regex(xObjectId).optional(),
    cover_image: z.string().regex(xObjectId).optional(),
    status: z.enum(xStatus as [string, ...string[]]).optional()
  })
})

const queryOperation = z.object({
  query: z.object({
    search: z.string().optional(),
    status: z.string().optional(),
    category: z.string().optional(),
    populate: z.string().optional()
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
    title: z.string().optional(),
    slug: z.string().optional(),
    sub_title: z.string().optional(),
    description: z.string().optional(),
    category: z.string().regex(xObjectId).optional(),
    featured_image: z.string().regex(xObjectId).optional(),
    cover_image: z.string().regex(xObjectId).optional(),
    status: z.enum(xStatus as [string, ...string[]]).optional()
  })
})

const deleteOperation = z.object({
  params: z.object({
    id: string().regex(xObjectId)
  })
})

export const BlogZod = {
  createOperation,
  queryOperation,
  getOperation,
  updateOperation,
  deleteOperation
}
