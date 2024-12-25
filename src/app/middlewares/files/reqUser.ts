import { NextFunction, Request, Response } from 'express'
import config from '../../../config'
import { TJwtUser } from '../../../global/types'
import { User } from '../../modules/user/user.model'

export const reqUser = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization

      if (token && token.startsWith('Bearer ')) {
        const verify = User.verifyToken(token.split(' ')[1], config.jwt.secret as string)
        req.user = verify as TJwtUser
      } else {
        req.user = null
      }
      next()
    } catch (error) {
      req.user = null
      next(error)
    }
  }
}
