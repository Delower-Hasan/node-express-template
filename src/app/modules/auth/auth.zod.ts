import { z } from 'zod'
import { xPassword, xRole, xTokenType, xUserStatus } from '../../../global/constant'

const registration = z.object({
  body: z
    .strictObject({
      first_name: z.string(),
      last_name: z.string(),
      email: z.string().email(),
      password: z.string().regex(xPassword),
      role: z.enum(xRole as [string]),
      send_otp: z.boolean().optional(),
      status: z.enum(xUserStatus as [string, ...string[]]).optional(),
      token_type: z.enum(xTokenType as [string, ...string[]]).optional()
    })
    .refine(data => !data.send_otp || (data.send_otp && data.token_type), {
      message: 'Token type is required when send OTP is true',
      path: ['token_type']
    })
})

const login = z.object({
  body: z.strictObject({
    email: z.string().email(),
    password: z.string().regex(xPassword)
  })
})

const oauth = z.object({
  body: z.strictObject({
    type: z.enum(['google', 'facebook']),
    access_token: z.string()
  })
})


const resetPassword = z.object({
  body: z
    .strictObject({
      token: z.string().optional(),
      password: z.string().regex(xPassword).optional(),
      new_password: z.string().regex(xPassword),
      confirm_new_password: z.string().regex(xPassword)
    })
    .refine(data => data.new_password === data.confirm_new_password, {
      message: "Confirm passwords don't match",
      path: ['confirm_new_password']
    })
})

const forgotPassword = z.object({
  body: z.strictObject({
    email: z.string().email()
  })
})

export const AuthZod = {
  registration,
  login,
  oauth,
  resetPassword,
  forgotPassword
}
