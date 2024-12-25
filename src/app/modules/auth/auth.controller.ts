import asyncHandler from 'express-async-handler'
import { apiResponse } from '../../../shared'
import { IUser as IType } from '../user/user.interface'
import { User } from '../user/user.model'
import { AuthService as service } from './auth.service'

const registration = asyncHandler(async (req, res) => {
  const { data } = await service.registration(req.body)
  apiResponse<Partial<IType>>(res, {
    message: `${User.modelName} registration successfully.`,
    data
  })
})

const login = asyncHandler(async (req, res) => {
  const { data } = await service.login(req.body)

  apiResponse<Partial<IType>>(res, {
    message: `${User.modelName} login successfully.`,
    data
  })
})

const oauth = asyncHandler(async (req, res) => {
  const { data } = await service.oauth(req.body)

  apiResponse<Partial<IType>>(res, {
    message: `${User.modelName} login successfully.`,
    data
  })
})
const VerifyPSNUser = asyncHandler(async (req, res) => {
  const { data } = await service.VerifyPSNUser(req.body)
  apiResponse<Partial<IType>>(res, {
    message: `Verified ${User.modelName}.`,
    data
  })
})

const resetPassword = asyncHandler(async (req, res) => {
  const { data } = await service.resetPassword(req.body, req.user)

  apiResponse<Partial<IType>>(res, {
    message: `${User.modelName} password reset successfully.`,
    data
  })
})

const forgotPassword = asyncHandler(async (req, res) => {
  const { data } = await service.forgotPassword(req.body)

  apiResponse<Partial<IType>>(res, {
    message: `${User.modelName} forgot password ${data.isSentMail ? 'successfully' : 'failed'}.`,
    data
  })
})

export const AuthController = {
  registration,
  login,
  oauth,
  VerifyPSNUser,
  resetPassword,
  forgotPassword
}
