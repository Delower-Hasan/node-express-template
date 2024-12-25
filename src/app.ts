import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import helmet from 'helmet'
import httpStatus from 'http-status'
import { errorHandler, reqUser } from './app/middlewares'
import AppRouter from './app/routes'

const app: Application = express()

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', reqUser(), AppRouter)

app.use(errorHandler)

app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    status: httpStatus.NOT_FOUND,
    message: 'API Not Found',
    error_messages: [
      {
        path: req.originalUrl,
        message: 'API Not Found'
      }
    ],
    stack: ''
  })
})

export default app
