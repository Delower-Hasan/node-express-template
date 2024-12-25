import { isValidObjectId } from 'mongoose'
import { TCreate, TDelete, TGet, TQuery, TReqQuery, TUpdate } from '../../../global/types'
import { paginationMaker, paginationPicker } from '../../../shared'
import { IBlog as IType } from './blog.interface'
import { Blog as Model } from './blog.model'

const createOperation: TCreate<IType> = async data => {
  const result = await Model.create(data)

  return { data: result }
}

const queryOperation: TQuery<IType> = async query => {
  const { page, limit, skip, sort } = paginationPicker(query)
  const { search, status, category, populate } = query

  const searchCriteria: TReqQuery = {}

  if (search) {
    searchCriteria.$or = [
      { title: { $regex: search, $options: 'i' } },
      { sub_title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ]
  }

  if (status) {
    const statusArray = typeof status === 'string' ? status.split(',') : status
    searchCriteria.status = { $in: statusArray }
  }

  if (category) {
    const categoryArray = typeof category === 'string' ? category.split(',') : category
    searchCriteria.category = { $in: categoryArray }
  }

  const populateFields = []

  if (populate?.includes('comment_count')) {
    populateFields.push({ path: 'comment_count' })
  }

  if (populate?.includes('category')) {
    populateFields.push({ path: 'category' })
  }

  const [result, count] = await Promise.all([
    Model.find(searchCriteria, '', { limit, skip, sort }).populate(populateFields),
    Model.countDocuments(searchCriteria)
  ])

  const pagination = paginationMaker(page, limit, count)

  return {
    data: result,
    pagination
  }
}

const getOperation: TGet<IType> = async id => {
  const x = isValidObjectId(id) ? { _id: id } : { slug: id }
  const result = await Model.findOne(x, '', {
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
