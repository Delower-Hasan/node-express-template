import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function main() {
  await mongoose.connect(config.database as string)
  console.log('🛢 Database is connected successfully')

  const server: Server = app.listen(config.port, () => {
    console.log(`🛢 Application running port ${config.port}`)
  })

  const exitHandler = (error: unknown) => {
    console.error(error)

    if (server) {
      server.close(() => {
        console.log('⚠️ Server has been closed')
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  }

  const sigtermHandler = () => {
    console.log('SIGTERM received')

    if (server) {
      server.close(() => {
        console.log('⚠️ Server has been closed')
      })
    }
  }

  process.on('uncaughtException', exitHandler)
  process.on('unhandledRejection', exitHandler)
  process.on('SIGTERM', sigtermHandler)
}

main()
