import { z } from 'zod'
import { xActionReferenceType, xActionsType, xObjectId } from '../../../global/constant'

const createOperation = z.object({
  body: z.strictObject({
    reference: z.string().regex(xObjectId).optional(),
    reference_type: z.enum(xActionReferenceType as [string, ...string[]]).optional(),
    action_type: z.enum(xActionsType as [string, ...string[]]).optional(),
    user: z.string().regex(xObjectId).optional()
  })
})

const queryOperation = z.object({
  query: z.object({})
})

export const ActionZod = {
  createOperation,
  queryOperation
}
