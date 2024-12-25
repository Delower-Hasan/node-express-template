import { z } from 'zod'

const createOperation = z.object({
  body: z.strictObject({
    files: z.array(z.instanceof(File))
  })
})

const queryOperation = z.object({
  query: z.object({
    status: z.string().optional()
  })
})

export const MediaZod = {
  createOperation,
  queryOperation
}
