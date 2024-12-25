import { NextFunction, Request, Response } from 'express'
import { TReqQuery } from '../../../global/types'
import { Media } from '../../modules/media/media.model'

export const media = (keys: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const values = keys.map(key => req.body[key])
      const records = await Media.find({ _id: { $in: values } }, '_id sid name size type')

      const result = keys.reduce((prev, key): TReqQuery => {
        const a = records.find(x => x._id.toString() === req.body[key])
        const b = req.body[key]

        if (typeof b !== 'string') return prev

        return { ...prev, [key]: a ? { ...a.toObject(), reference: a._id.toString() } : null }
      }, {})

      req.body = { ...req.body, ...result }

      next()
    } catch (error) {
      next(error)
    }
  }
}
