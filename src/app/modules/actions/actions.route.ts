import { Router } from 'express'
import { ActionsController as controller } from './actions.controller'
import { validateZod } from '../../middlewares'
import { ActionZod as zod } from './actions.zod'

const router = Router()

router.post('/', validateZod(zod.createOperation), controller.createOperation)
router.get('/', validateZod(zod.queryOperation), controller.queryOperation)
export const ActionRoute = router
