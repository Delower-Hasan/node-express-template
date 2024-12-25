import { Router } from 'express'
import { validateRole, validateZod } from '../../middlewares'
import { CommentController as controller } from './comment.controller'
import { CommentZod as zod } from './comment.zod'

const router = Router()

router.post(
  '/',
  validateRole(['admin', 'user']),
  validateZod(zod.createOperation),
  controller.createOperation
)
router.patch('/:id', validateZod(zod.updateOperation), controller.updateOperation)
router.get('/', validateZod(zod.queryOperation), controller.queryOperation)
router.delete('/:id', validateZod(zod.deleteOperation), controller.deleteOperation)

export const CommentRoute = router
