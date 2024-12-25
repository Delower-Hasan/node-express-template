import { TPagination, TReqQuery } from '../../global/types'

export const paginationPicker = (
  q: TReqQuery
): {
  page: number
  limit: number
  skip: number
  sort: string
} => {
  const page = parseInt(q.page as string) || 1
  const limit = parseInt(q.limit as string) || 20
  const skip = (parseInt(q.skip as string) || 0) + (page - 1) * limit
  const sort = q.sort ? (q.sort as string).replace(/,/g, ' ') : '-_id'

  return { page, limit, skip, sort }
}

export const paginationMaker = (page: number, limit: number, count: number): TPagination => {
  return {
    current: page,
    total: Math.ceil(count / limit),
    next: page < Math.ceil(count / limit) ? page + 1 : null,
    prev: page > 1 ? page - 1 : null,
    records: count
  }
}
