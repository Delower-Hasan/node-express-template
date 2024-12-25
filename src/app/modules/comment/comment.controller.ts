import asyncHandler from 'express-async-handler'
import { apiResponse } from '../../../shared'
import { IComment as IType } from './comment.interface'
import { Comment as Model } from './comment.model'
import { CommentService as service } from './comment.service'

const createOperation = asyncHandler(async (req, res) => {
  const { data } = await service.createOperation({ ...req.body, user: req.user?._id }, req.user)

  apiResponse<Partial<IType>>(res, {
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

export const CommentController = {
  createOperation,
  updateOperation,
  queryOperation,
  deleteOperation
}
