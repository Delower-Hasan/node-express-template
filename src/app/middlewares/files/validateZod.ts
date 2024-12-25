import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodEffects } from 'zod'
import { TZod } from '../../../global/types'

export const validateZod =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies
      })
      next()
    } catch (error) {
      next(error)
    }
  }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateZodV2 = <T extends Record<string, any>>(schema: TZod<T>, data?: T) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = schema({ user: req.user, data: data ?? {} })

      await result.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies
      })
      next()
    } catch (error) {
      next(next)
    }
  }
}
