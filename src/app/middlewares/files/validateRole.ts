import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { TRole } from '../../../global/types'
import { ApiError } from '../../../shared'

export const validateRole = (roles: TRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access')
      if (!roles.includes(req.user.role)) throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden access')

      next()
    } catch (error) {
      next(error)
    }
  }
}
