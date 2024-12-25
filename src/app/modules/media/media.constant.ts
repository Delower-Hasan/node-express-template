import { IEmbededMedia } from './media.interface'

export const mediaValidator = (field: string) => {
  return {
    validator: function (value: IEmbededMedia | null) {
      if (value === null) return true
      return value.sid && value.name && value.size && value.type
    },
    message: `${field} is not validate`
  }
}
