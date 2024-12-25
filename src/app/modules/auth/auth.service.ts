/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status'
import config from '../../../config'
import { TForgotPassword, TJwtUser, TLogin, TResetPassword } from '../../../global/types'
import {
  ApiError,
  generateExpire,
  generateHashToken,
  generateOTP,
  generateToken,
  generateUsername,
  VerifyPSNAccount
} from '../../../shared'
import { sendForgotOTPMail } from '../../../shared/files/Mail'
import { Token } from '../token/token.model'
import { IUser as IType } from '../user/user.interface'
import { User as Model } from '../user/user.model'

const registration = async (data: IType) => {
  const existingUser = await Model.findOne({ email: data.email })
  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already registered')
  }
  const result = await Model.create(data)
  const { password, ...userInfo } = result.toObject()

  return { data: userInfo }
}

const login = async (data: TLogin) => {
  const result = await Model.findOne({ email: data.email }).select('+password')
  if (!result) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access')
  }
  if (result.status !== 'active') {
    throw new ApiError(httpStatus.UNAUTHORIZED, `Your account has been '${result.status}'`)
  }
  const isPasswordValid = await Model.checkPassword(data.password, result.password)

  if (!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access')
  }
  const initial: Partial<IType> = {
    _id: result._id,
    first_name: result.first_name,
    last_name: result.last_name,
    username: result.username,
    playstation: result.playstation,
    email: result.email,
    profile_image: result.profile_image,
    is_email_verified: result.is_email_verified,
    role: result.role,
    status: result.status,
    PSN_info: result.PSN_info
  }

  const tokenData = { _id: initial._id, role: initial.role }
  const accessToken = Model.createToken(tokenData, config.jwt.secret!, config.jwt.expiresIn!)
  const refreshToken = Model.createToken(tokenData, config.jwt.secret!, config.jwt.expiresIn!)
  const payload = {
    ...initial,
    access_token: accessToken,
    refresh_token: refreshToken,
    provider: 'credentials'
  }
  return { data: payload }
}

const VerifyPSNUser = async (data: { psn_code: string; psn_username: string }) => {
  const { payload: pnsInfos } = await VerifyPSNAccount(data.psn_code, data.psn_username)
  const payload = {
    PSN_info: {
      is_psn_verified: pnsInfos.is_psn_verified
    }
  }
  return { data: payload }
}

const oauth = async ({ type, access_token }: { type: 'google' | 'facebook'; access_token: string }) => {
  let auth: { id: string; name: string; email: string; provider: 'google' | 'facebook' } | null = null

  if (type === 'google') {
    const token = await fetch(`https://www.googleapis.com/oauth2/v2/tokeninfo?access_token=${access_token}`)
    const tokenResult = await token.json()

    if (!tokenResult || !tokenResult.user_id || tokenResult.issued_to !== config.GOOGLE_CLIENT_ID) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access.')
    }

    const profile = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` }
    })
    const profileResult = await profile.json()

    if (!profileResult.id || !profileResult.name || !profileResult.email) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access.')
    }

    auth = {
      id: profileResult.id,
      name: profileResult.name,
      email: profileResult.email,
      provider: 'google'
    }
  } else if (type === 'facebook') {
    const fbAccessToken = `${config.FACEBOOK_CLIENT_ID}|${config.FACEBOOK_CLIENT_SECRET}`
    const token = await fetch(
      `https://graph.facebook.com/v21.0/debug_token?input_token=${access_token}&access_token=${fbAccessToken}`
    )
    const tokenResult = await token.json()

    if (!tokenResult || !tokenResult.data.user_id || tokenResult.data.app_id !== config.FACEBOOK_CLIENT_ID) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access.')
    }

    const profile = await fetch(
      `https://graph.facebook.com/v16.0/me?fields=id,name,email&access_token=${access_token}`
    )
    const profileResult = await profile.json()

    if (!profileResult.id || !profileResult.name || !profileResult.email) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access.')
    }

    auth = {
      id: profileResult.id,
      name: profileResult.name,
      email: profileResult.email,
      provider: 'facebook'
    }
  }

  if (!auth) throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access.')

  let result: IType | null = null

  const r = await Model.findOne({ email: auth.email })

  if (!r) {
    const c = await Model.create({
      first_name: auth.name,
      last_name: '',
      email: auth.email,
      is_email_verified: true,
      password: generateUsername(12),
      username: generateUsername(8),
      profile_image: '',
      role: 'user',
      metamask: '',
      playstation: '',
      stream: '',
      xbox: '',
      status: 'active',
      oauth: [{ id: auth.id, provider: auth.provider }]
    })

    result = c.toObject()
  } else {
    result = r.toObject()
    const isExist = r.oauth.find(x => x.provider === auth?.provider)

    if (!isExist) {
      await Model.findOneAndUpdate(
        { email: auth.email },
        { $push: { oauth: { id: auth.id, provider: auth.provider } } }
      )
    } else if (isExist.id !== auth.id) {
      throw new ApiError(httpStatus.UNAUTHORIZED, `Your already have a oauth connected account`)
    }
  }

  if (result.status !== 'active') {
    throw new ApiError(httpStatus.UNAUTHORIZED, `Your account has been '${result.status}'`)
  }

  const initial: Partial<IType> = {
    _id: result._id,
    first_name: result.first_name,
    last_name: result.last_name,
    username: result.username,
    playstation: result.playstation,
    email: result.email,
    profile_image: result.profile_image,
    is_email_verified: result.is_email_verified,
    role: result.role,
    status: result.status,
    PSN_info: result.PSN_info
  }

  const tokenData = { _id: initial._id!.toString(), role: initial.role }
  const accessToken = Model.createToken(tokenData, config.jwt.secret!, config.jwt.expiresIn!)
  const refreshToken = Model.createToken(tokenData, config.jwt.secret!, config.jwt.expiresIn!)

  const payload = {
    ...initial,
    access_token: accessToken,
    refresh_token: refreshToken,
    provider: auth.provider
  }

  return { data: payload }
}

const resetPassword = async (data: TResetPassword, user: TJwtUser) => {
  if (data.token) {
    const result = await Token.findOne({
      token: data.token,
      token_type: 'forgot_password',
      expires: { $gt: new Date() }
    }).populate('user')

    if (!result || (result && !result.user)) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access')
    }

    const updatePassword = await Model.findByIdAndUpdate(result.user._id, { password: data.new_password })

    if (!updatePassword) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password update failed')
    }

    const { password: dbPassword, ...userinfo } = updatePassword.toObject()

    return { data: userinfo }
  }

  if (user && data.password) {
    const result = await Model.findOne({ _id: user._id }).select('+password')

    if (!result) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access')
    }

    const isPasswordValid = await Model.checkPassword(data.password, result.password)

    if (!isPasswordValid) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password incorrect')
    }

    const updatePassword = await Model.findByIdAndUpdate(user._id, { password: data.new_password })

    if (!updatePassword) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password update failed')
    }

    const { password: dbPassword, ...userinfo } = updatePassword.toObject()

    return { data: userinfo }
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Something is wrong')
}

const forgotPassword = async ({ email }: TForgotPassword) => {
  const user = await Model.findOne({ email }, { _id: 1 })

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User Not Found')
  }

  const token = generateToken()
  const hashedToken = generateHashToken(token)

  const result = await Token.create({
    otp: generateOTP(),
    token: hashedToken,
    token_type: 'forgot_password',
    expires: generateExpire(1),
    user: user._id,
    blacklisted: false
  })

  const _Token = {
    token: hashedToken,
    email
  }

  const isSentMail = await sendForgotOTPMail(_Token)

  return { data: { email, isSentMail } }
}

export const AuthService = {
  registration,
  login,
  oauth,
  VerifyPSNUser,
  resetPassword,
  forgotPassword
}
