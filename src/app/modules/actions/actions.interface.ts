import { Model, Types } from 'mongoose'
import { TActionReferenceType, TActionsType } from '../../../global/types'

export type IAction = {
  _id: Types.ObjectId
  user: Types.ObjectId
  reference: Types.ObjectId
  reference_type: TActionReferenceType
  action_type: TActionsType
  createdAt: Date
  updatedAt: Date
}

export type IActionModel = Model<IAction>
