import { Router } from 'express'
import { validateRole, validateZod } from '../../middlewares'
import { BlogController as controller } from './contact.controller'
import { ContactZod as zod } from './contact.zod'

const router = Router()

router.post('/', validateZod(zod.createOperation), controller.createOperation)
router.get('/', validateRole(['admin']), validateZod(zod.queryOperation), controller.queryOperation)
router.get('/:id', validateRole(['admin']), validateZod(zod.getOperation), controller.getOperation)
router.patch('/:id', validateRole(['admin']), validateZod(zod.updateOperation), controller.updateOperation)
router.delete('/:id', validateRole(['admin']), validateZod(zod.deleteOperation), controller.deleteOperation)

export const ContactRoute = router
