import express from 'express'
import { ActionRoute } from '../modules/actions/actions.route'
import { AuthRoute } from '../modules/auth/auth.route'
import { BlogRoute } from '../modules/blog/blog.route'
import { CommentRoute } from '../modules/comment/comment.route'
import { ContactRoute } from '../modules/contact/contact.route'
import { MediaRoute } from '../modules/media/media.route'
import { UserRoute } from '../modules/user/user.route'
// End of route imports

const AppRouter = express.Router()

AppRouter.use('/api/v1/auth', AuthRoute)
AppRouter.use('/api/v1/users', UserRoute)
AppRouter.use('/api/v1/blogs', BlogRoute)
AppRouter.use('/api/v1/media', MediaRoute)
AppRouter.use('/api/v1/comments', CommentRoute)
AppRouter.use('/api/v1/actions', ActionRoute)
AppRouter.use('/api/v1/contacts', ContactRoute)

// End of route usage

export default AppRouter
