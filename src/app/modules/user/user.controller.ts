import asyncHandler from 'express-async-handler'
import { apiResponse } from '../../../shared'
import { IUser as IType } from './user.interface'
import { User as Model } from './user.model'
import { UserService as service } from './user.service'

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

export const UserController = {
  queryOperation,
  getOperation,
  updateOperation,
  deleteOperation
}
