/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import { ZodError, ZodIssue } from 'zod'
import { ApiError } from '../../../shared'

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let status = 500
  let message = 'Something went wrong.'
  let errorMessages: {
    path: string | number
    message: string
  }[] = []
  const stack = error.stack

  if (error instanceof mongoose.Error.CastError) {
    const simplified = handleCastError(error)
    status = simplified.status
    message = simplified.message
    errorMessages = simplified.errorMessages
  } else if (error instanceof mongoose.Error.ValidationError) {
    const simplified = handleValidationError(error)
    status = simplified.status
    message = simplified.message
    errorMessages = simplified.errorMessages
  } else if (error instanceof ZodError) {
    const simplified = handleZodError(error)
    status = simplified.statusCode
    message = simplified.message
    errorMessages = simplified.errorMessages
  } else if (error instanceof multer.MulterError) {
    status = 400
    message = error.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message
          }
        ]
      : []
  } else if (error instanceof ApiError) {
    status = error.status
    message = error.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message
          }
        ]
      : []
  } else if (error instanceof Error) {
    message = error.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message
          }
        ]
      : []
  }

  res.status(status).json({
    success: false,
    status,
    message,
    error_messages: errorMessages,
    stack
  })
}

const handleCastError = (error: mongoose.Error.CastError) => {
  const errorMessages = [
    {
      path: error.path,
      message: 'Invalid Object ID'
    }
  ]

  return {
    status: 400,
    message: 'Cast Error',
    errorMessages
  }
}

const handleValidationError = (error: mongoose.Error.ValidationError) => {
  const errorMessages = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message
      }
    }
  )

  return {
    status: 400,
    message: 'Validation Error',
    errorMessages
  }
}

const handleZodError = (error: ZodError) => {
  const errorMessages = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message
    }
  })

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages
  }
}
