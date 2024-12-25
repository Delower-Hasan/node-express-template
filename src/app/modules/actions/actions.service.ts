import { Types } from 'mongoose'
import { TCreate, TQuery, TReqQuery } from '../../../global/types'
import { paginationMaker, paginationPicker } from '../../../shared'
import { IAction as IType } from './actions.interface'
import { Action as Model } from './actions.model'

const createOperation: TCreate<IType> = async data => {
  const { user, reference, action_type, reference_type } = data

  if (!user || !reference || !action_type) {
    throw new Error('Missing required fields: user, reference, action_type')
  }

  const userObjectId = new Types.ObjectId(user)
  const referenceObjectId = new Types.ObjectId(reference)

  const existingAction = await Model.findOne({ user: userObjectId, reference: referenceObjectId })

  let resultAction
  let message

  if (existingAction) {
    if (existingAction.action_type === action_type) {
      await existingAction.deleteOne()
      resultAction = null
      message = 'Action removed'
    } else {
      existingAction.action_type = action_type
      await existingAction.save()
      resultAction = existingAction
      message = 'Action updated'
    }
  } else {
    const newAction = new Model({
      user: userObjectId,
      reference: referenceObjectId,
      reference_type,
      action_type
    })
    await newAction.save()
    resultAction = newAction
    message = 'Action added'
  }
  return { data: resultAction, message }
}

const queryOperation: TQuery<IType> = async query => {
  const { page, limit, skip, sort } = paginationPicker(query)
  const { reference_type } = query

  const searchCriteria: TReqQuery = {}

  const filtering = (field: string, value: string) => {
    if (value) {
      const valueArray = typeof value === 'string' ? value.split(',') : value
      searchCriteria[field] = { $in: valueArray }
    }
  }

  filtering('reference_type', reference_type)

  const [result, count] = await Promise.all([
    Model.find(searchCriteria, '', { limit, skip, sort }),
    Model.countDocuments(searchCriteria)
  ])

  const pagination = paginationMaker(page, limit, count)

  return {
    data: result,
    pagination
  }
}

export const ActionsService = {
  createOperation,
  queryOperation
}
