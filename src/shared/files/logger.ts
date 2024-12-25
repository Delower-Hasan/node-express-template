import { createLogger, format, transports } from 'winston'
const { combine, printf, timestamp, colorize } = format

const customFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}][${level}] ${message}`
})

export const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), colorize({ message: true }), customFormat),
  transports: [new transports.Console()]
})
