import { Router } from 'express'
import { media, validateRole, validateZod } from '../../middlewares'
import { BlogController as controller } from './blog.controller'
import { BlogZod as zod } from './blog.zod'

const router = Router()

router.post(
  '/',
  validateRole(['admin']),
  validateZod(zod.createOperation),
  media(['featured_image', 'cover_image']),
  controller.createOperation
)
router.get('/', validateZod(zod.queryOperation), controller.queryOperation)
router.get('/:id', validateZod(zod.getOperation), controller.getOperation)
router.patch(
  '/:id',
  validateRole(['admin']),
  validateZod(zod.updateOperation),
  media(['featured_image', 'cover_image']),
  controller.updateOperation
)
router.delete('/:id', validateRole(['admin']), validateZod(zod.deleteOperation), controller.deleteOperation)

export const BlogRoute = router
