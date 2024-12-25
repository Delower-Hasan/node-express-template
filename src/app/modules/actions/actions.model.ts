import { Schema, model } from 'mongoose'
import mongooseNullError from 'mongoose-null-error'
import { xActionReferenceType, xActionsType } from '../../../global/constant'
import { IAction, IActionModel } from './actions.interface'

const schema = new Schema<IAction, IActionModel>(
  {
    user: { type: Schema.ObjectId, ref: 'User', required: true, immutable: true },
    reference: { type: Schema.ObjectId, refPath: 'reference_type', required: true, immutable: true },
    reference_type: { type: String, enum: xActionReferenceType, default: 'Community', immutable: true },
    action_type: { type: String, required: true, enum: xActionsType }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false
  }
)

schema.plugin(mongooseNullError)

schema.index({ user: 1, reference: 1 }, { unique: true })

export const Action = model<IAction, IActionModel>('Action', schema)
