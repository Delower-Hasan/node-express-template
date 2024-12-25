import asyncHandler from 'express-async-handler'
import { Types } from 'mongoose'
import config from '../../../config'
import { apiResponse } from '../../../shared'
import { IMedia, IMedia as IType } from './media.interface'
import { Media as Model } from './media.model'
import { MediaService as service } from './media.service'

const createOperation = asyncHandler(async (req, res) => {
  const user = (req.user ? req.user._id : config.systemUser) as unknown as Types.ObjectId

  const files = req.files as {
    media: Express.MulterS3.File[]
  }

  const payload: Partial<IMedia>[] = files.media.map(
    (x): Pick<IMedia, 'sid' | 'name' | 'size' | 'type' | 'status' | 'user'> => ({
      sid: x.key,
      name: x.originalname,
      size: x.size,
      type: x.mimetype,
      user: user,
      status: 'publish'
    })
  )

  const { data } = await service.createOperation(payload, req.user)

  apiResponse<Partial<IType>[]>(res, {
    message: `${Model.modelName} created successfully.`,
    data
  })
})

const queryOperation = asyncHandler(async (req, res) => {
  const { data, pagination } = await service.queryOperation(req.query, req.user)

  apiResponse<Partial<IType>[]>(res, {
    message: `${Model.modelName} fetched successfully.`,
    data,
    pagination
  })
})

const getOperation = asyncHandler(async (req, res) => {
  const { data } = await service.getOperation(req.params.id, req.query, req.user)

  apiResponse<Partial<IType>>(res, {
    message: `${Model.modelName} fetched successfully.`,
    data
  })
})

const updateOperation = asyncHandler(async (req, res) => {
  const { data } = await service.updateOperation(req.params.id, req.body, req.user)

  apiResponse<Partial<IType>>(res, {
    message: `${Model.modelName} updated successfully.`,
    data
  })
})

const deleteOperation = asyncHandler(async (req, res) => {
  const { data } = await service.deleteOperation(req.params.id, req.user)

  apiResponse<Partial<IType>>(res, {
    message: `${Model.modelName} deleted successfully.`,
    data
  })
})

export const MediaController = {
  createOperation,
  queryOperation,
  getOperation,
  updateOperation,
  deleteOperation
}
