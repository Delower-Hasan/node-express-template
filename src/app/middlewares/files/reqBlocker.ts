import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { ApiError } from '../../../shared'

export const reqBlocker = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Requests to this route have been temporarily blocked.')
    } catch (error) {
      next(error)
    }
  }
}
