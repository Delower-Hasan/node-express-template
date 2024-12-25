import { Router } from 'express'
import { uploadS3 } from '../../../shared/files/s3'
import { MediaController as controller } from './media.controller'
import { validateZod } from '../../middlewares'
import { MediaZod as zod } from './media.zod'

const router = Router()

router.post('/', uploadS3.fields([{ name: 'media', maxCount: 20 }]), controller.createOperation)
router.get('/', validateZod(zod.queryOperation), controller.queryOperation)
router.get('/:id', controller.getOperation)
router.patch('/:id', controller.updateOperation)
router.delete('/:id', controller.deleteOperation)

export const MediaRoute = router
