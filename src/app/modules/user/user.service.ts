import { TCreate, TDelete, TGet, TQuery, TReqQuery, TUpdate } from '../../../global/types'
import { paginationMaker, paginationPicker } from '../../../shared'
import { IUser as IType } from './user.interface'
import { User as Model } from './user.model'

const createOperation: TCreate<IType> = async data => {
  const result = await Model.create(data)

  return { data: result }
}

const queryOperation: TQuery<IType> = async query => {
  const { page, limit, skip, sort } = paginationPicker(query)
  const searchCriteria: TReqQuery = {}
  const { search } = query

  if (search) {
    searchCriteria.$or = [
      { first_name: { $regex: search, $options: 'i' } },
      { last_name: { $regex: search, $options: 'i' } },
      { username: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ]
  }

  if (query.role) {
    const roleArray = typeof query.role === 'string' ? query.role.split(',') : query.role
    searchCriteria.role = { $in: roleArray }
  }

  const equalityFields = ['is_email_verified']
  equalityFields.forEach(field => {
    if (query[field]) {
      searchCriteria[field] = query[field]
    }
  })

  if (query.status) {
    const statusArray = typeof query.status === 'string' ? query.status.split(',') : query.status
    searchCriteria.status = { $in: statusArray }
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

const getOperation: TGet<IType> = async (id, query) => {
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

export const UserService = {
  createOperation,
  queryOperation,
  getOperation,
  updateOperation,
  deleteOperation
}
