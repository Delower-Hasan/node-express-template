import { Router } from 'express'
import { validateRole, validateZod } from '../../middlewares'
import { UserController as controller } from './user.controller'
import { UserZod as zod } from './user.zod'

const router = Router()

router.get('/', validateZod(zod.queryOperation), controller.queryOperation)
router.get('/:id', validateZod(zod.getOperation), controller.getOperation)
router.put('/:id', validateZod(zod.updateOperation), controller.updateOperation)
router.delete('/:id', validateRole(['admin']), validateZod(zod.deleteOperation), controller.deleteOperation)

export const UserRoute = router
