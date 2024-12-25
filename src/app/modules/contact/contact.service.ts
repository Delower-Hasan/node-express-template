import { TCreate, TDelete, TGet, TQuery, TReqQuery, TUpdate } from '../../../global/types'
import { paginationMaker, paginationPicker } from '../../../shared'
import { IContact as IType } from './contact.interface'
import { Contact as Model } from './contact.model'

const createOperation: TCreate<IType> = async data => {
  const result = await Model.create(data)
  return { data: result }
}

const queryOperation: TQuery<IType> = async query => {
  const { page, limit, skip, sort } = paginationPicker(query)
  const { status, search } = query

  const searchCriteria: TReqQuery = {}
  if (search) {
    searchCriteria.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ]
  }
  const addInCondition = (field: string, value: string) => {
    if (value) {
      const valueArray = typeof value === 'string' ? value.split(',') : value
      searchCriteria[field] = { $in: valueArray }
    }
  }
  addInCondition('isSeen', status)
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

export const BlogService = {
  createOperation,
  queryOperation,
  getOperation,
  updateOperation,
  deleteOperation
}
