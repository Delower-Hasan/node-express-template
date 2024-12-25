import asyncHandler from 'express-async-handler'
import { apiResponse } from '../../../shared'
import { IBlog as IType } from './blog.interface'
import { Blog as Model } from './blog.model'
import { BlogService as service } from './blog.service'

const createOperation = asyncHandler(async (req, res) => {
  const { data } = await service.createOperation({ ...req.body, user: req.user?._id }, req.user)

  apiResponse<Partial<IType>>(res, {
    message: `${Model.modelName} created successfully.`,
    data
  })
})

const getOperation = asyncHandler(async (req, res) => {
  const { data } = await service.getOperation(req.params.id, req.query, req.user)

  apiResponse<Partial<IType>>(res, {
    message: `${Model.modelName} fetched successfully.`,
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

export const BlogController = {
  createOperation,
  queryOperation,
  getOperation,
  updateOperation,
  deleteOperation
}
