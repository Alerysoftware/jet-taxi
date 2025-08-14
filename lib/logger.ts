export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4
}

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  context?: Record<string, any>
  error?: Error
}

class Logger {
  private logLevel: LogLevel
  private isDevelopment: boolean

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development'
    this.logLevel = this.isDevelopment ? LogLevel.DEBUG : LogLevel.INFO
  }

  private formatMessage(entry: LogEntry): string {
    const timestamp = entry.timestamp
    const level = LogLevel[entry.level]
    const message = entry.message
    const context = entry.context ? ` | ${JSON.stringify(entry.context)}` : ''
    const error = entry.error ? ` | Error: ${entry.error.message}` : ''

    return `[${timestamp}] ${level}: ${message}${context}${error}`
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>, error?: Error) {
    if (level < this.logLevel) return

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      error
    }

    const formattedMessage = this.formatMessage(entry)

    // Console logging
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(formattedMessage)
        break
      case LogLevel.INFO:
        console.info(formattedMessage)
        break
      case LogLevel.WARN:
        console.warn(formattedMessage)
        break
      case LogLevel.ERROR:
        console.error(formattedMessage)
        break
      case LogLevel.FATAL:
        console.error(`🚨 FATAL: ${formattedMessage}`)
        break
    }

    // In production, you might want to send logs to external services
    if (!this.isDevelopment && level >= LogLevel.ERROR) {
      this.sendToExternalService(entry)
    }
  }

  private sendToExternalService(entry: LogEntry) {
    // TODO: Implement external logging service (e.g., Sentry, LogRocket)
    // This is a placeholder for production logging
    try {
      // Example: Send to external service
      // await fetch('https://logs.yourservice.com', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(entry)
      // })
    } catch (err) {
      console.error('Failed to send log to external service:', err)
    }
  }

  debug(message: string, context?: Record<string, any>) {
    this.log(LogLevel.DEBUG, message, context)
  }

  info(message: string, context?: Record<string, any>) {
    this.log(LogLevel.INFO, message, context)
  }

  warn(message: string, context?: Record<string, any>) {
    this.log(LogLevel.WARN, message, context)
  }

  error(message: string, context?: Record<string, any>, error?: Error) {
    this.log(LogLevel.ERROR, message, context, error)
  }

  fatal(message: string, context?: Record<string, any>, error?: Error) {
    this.log(LogLevel.FATAL, message, context, error)
  }

  // API request logging
  logApiRequest(method: string, url: string, statusCode: number, duration: number, context?: Record<string, any>) {
    const level = statusCode >= 400 ? LogLevel.WARN : LogLevel.INFO
    const message = `${method} ${url} - ${statusCode} (${duration}ms)`
    
    this.log(level, message, {
      method,
      url,
      statusCode,
      duration,
      ...context
    })
  }

  // Error logging with stack trace
  logError(error: Error, context?: Record<string, any>) {
    this.error(error.message, {
      ...context,
      stack: error.stack,
      name: error.name
    }, error)
  }

  // Performance logging
  logPerformance(operation: string, duration: number, context?: Record<string, any>) {
    const level = duration > 1000 ? LogLevel.WARN : LogLevel.INFO
    const message = `${operation} completed in ${duration}ms`
    
    this.log(level, message, {
      operation,
      duration,
      ...context
    })
  }
}

// Global logger instance
export const logger = new Logger()

// Convenience functions
export const logDebug = (message: string, context?: Record<string, any>) => logger.debug(message, context)
export const logInfo = (message: string, context?: Record<string, any>) => logger.info(message, context)
export const logWarn = (message: string, context?: Record<string, any>) => logger.warn(message, context)
export const logError = (message: string, context?: Record<string, any>, error?: Error) => logger.error(message, context, error)
export const logFatal = (message: string, context?: Record<string, any>, error?: Error) => logger.fatal(message, context, error)

export default logger
