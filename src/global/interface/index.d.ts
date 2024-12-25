import { TJwtUser } from '../types'

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Request {
      user: TJwtUser
    }
  }
}
