import asyncHandler from 'express-async-handler'
import { apiResponse } from '../../../shared'
import { IAction as IType } from './actions.interface'
import { Action as Model } from './actions.model'
import { ActionsService as service } from './actions.service'

const createOperation = asyncHandler(async (req, res) => {
  const result = await service.createOperation(req.body, req.user)

  apiResponse<Partial<IType>>(res, {
    message: `${Model.modelName} created successfully.`,
    data: result.data || null
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

export const ActionsController = {
  createOperation,
  queryOperation
}
