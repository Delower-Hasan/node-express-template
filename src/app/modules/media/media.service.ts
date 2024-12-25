import { TCreate, TDelete, TGet, TQuery, TReqQuery, TUpdate } from '../../../global/types'
import { paginationMaker, paginationPicker } from '../../../shared'
import { IMedia as IType } from './media.interface'
import { Media as Model } from './media.model'

const createOperation: TCreate<Partial<IType>[]> = async data => {
  const result = await Model.create(data)

  return { data: result }
}

const queryOperation: TQuery<IType> = async query => {
  const { page, limit, skip, sort } = paginationPicker(query)
  const { status, user } = query

  const searchCriteria: TReqQuery = {}

  if (status) {
    const statusArray = typeof status === 'string' ? status.split(',') : status
    searchCriteria.status = { $in: statusArray }
  }

  if (user) {
    searchCriteria.user = { $eq: user }
  }

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

const getOperation: TGet<IType> = async id => {
  const result = await Model.findById(id, '', {
    mongooseNullError: true
  })

  return { data: result }
}

const updateOperation: TUpdate<IType> = async (id, payload) => {
  const result = await Model.findByIdAndUpdate(id, payload, {
    mongooseNullError: true,
    runValidators: true,
    new: true
  })

  return { data: result }
}

const deleteOperation: TDelete<IType> = async id => {
  const result = await Model.findByIdAndDelete(id, {
    mongooseNullError: true
  })

  return { data: result }
}

export const MediaService = {
  createOperation,
  queryOperation,
  getOperation,
  updateOperation,
  deleteOperation
}
