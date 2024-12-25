import { Response } from 'express'
import httpStatus from 'http-status'
import { TPagination } from '../../global/types'

type TApiReponse<T> = {
  success?: boolean
  status?: number
  message: string
  pagination?: TPagination
  data: Partial<T> | Partial<T>[] | null
}

export const apiResponse = <T>(res: Response, data: TApiReponse<T>): void => {
  const result: TApiReponse<T> = {
    success: data.success || true,
    status: data.status || httpStatus.OK,
    message: data.message,
    pagination: data?.pagination && {
      current: data.pagination.current,
      total: data.pagination.total,
      next: data.pagination.next,
      prev: data.pagination.prev,
      records: data.pagination.records
    },
    data: data.data
  }

  res.status(result.status!).json(result)
}
