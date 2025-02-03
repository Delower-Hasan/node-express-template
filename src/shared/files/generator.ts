import crypto from 'crypto'

export const generateOTP = (): number => {
  const min = 100000
  const max = 999999

  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const generateToken = (): string => {
  return crypto.randomBytes(32).toString('hex')
}

export const generateHashToken = (token: string): string => {
  return crypto.createHash('sha256').update(token).digest('hex')
}

export const generateExpire = (hours: number): string => {
  const now = new Date()
  const expireDate = new Date(now.getTime() + hours * 60 * 60 * 1000)
  return expireDate.toISOString()
}


export const generateUsername = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let username = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    username += chars[randomIndex]
  }

  return username
}
