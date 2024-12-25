import { TCreate, TDelete, TQuery, TReqQuery, TUpdate } from '../../../global/types'
import { paginationMaker, paginationPicker } from '../../../shared'
import { IComment as IType } from './comment.interface'
import { Comment as Model } from './comment.model'

const createOperation: TCreate<IType> = async data => {
  const result = await Model.create(data)

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

const queryOperation: TQuery<IType> = async (query, user) => {
  const { page, limit, skip, sort } = paginationPicker(query)
  const { status, reference_type, reference, populate } = query

  const searchCriteria: TReqQuery = {}

  const filtering = (field: string, value: string) => {
    if (value) {
      const valueArray = typeof value === 'string' ? value.split(',') : value
      searchCriteria[field] = { $in: valueArray }
    }
  }

  filtering('status', status)
  filtering('reference_type', reference_type)
  filtering('reference', reference)

  const populateArray = typeof populate === 'string' ? populate.split(',') : populate || []

  const validPopulateFields = ['total_likes', 'total_dislikes', 'user', 'my_action']

  const populateFields = populateArray
    .filter((field: string) => validPopulateFields.includes(field))
    .map((x: string) => (x === 'my_action' ? { path: x, match: { user: { $eq: user?._id } } } : { path: x }))

  const [result, count] = await Promise.all([
    Model.find(searchCriteria, '', { limit, skip, sort, populate: populateFields }),
    Model.countDocuments(searchCriteria)
  ])

  const pagination = paginationMaker(page, limit, count)

  return {
    data: result,
    pagination
  }
}

const deleteOperation: TDelete<IType> = async id => {
  const result = await Model.findByIdAndDelete(id, {
    mongooseNullError: true
  })

  return { data: result }
}

export const CommentService = {
  createOperation,
  updateOperation,
  queryOperation,
  deleteOperation
}
