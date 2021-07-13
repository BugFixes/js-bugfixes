import { extend } from 'extend'
import { LogLevel } from './constants'
import type {
  FormattedLog,
  LogMessage,
  LogPayload,
  LogTransport
} from './types'

export * from './constants'
export * from './formatters'
export * from './transports'
export * from './types'

export type LoggerOptions = {
  level?: LogLevel,
  payload?: LogPayload,
  transport: LogTransport,
}

export class Log {
  public readonly level: LogLevel
  public readonly payload: LogPayload
  public readonly transport: LogTransport

  constructor(opts: LoggerOptions) {
    this.level = opts.level ?? LogLevel.info
    this.payload = opts.payload ?? {}
    this.transport = opts.transport
  }

  public dispatch(level: LogLevel, message: LogMessage, payload: LogPayload = {}): void {
    if (level < this.level) {
      return
    }

    const log = this.format(level, message, extend({}, this.payload, payload))

    this.transport.dispatch(log)
  }

  public fatal(message: LogMessage, payload?: LogPayload): void {
    this.dispatch(LogLevel.fatal, message, payload)
  }

  public error(message: LogMessage, payload?: LogPayload): void {
    this.dispatch(LogLevel.error, message, payload)
  }

  public warn(message: LogMessage, payload?: LogPayload): void {
    this.dispatch(LogLevel.warn, message, payload)
  }

  public info(message: LogMessage, payload?: LogPayload): void {
    this.dispatch(LogLevel.info, message, payload)
  }

  public debug(message: LogMessage, payload?: LogPayload): void {
    this.dispatch(LogLevel.debug, message, payload)
  }

  public extend(opts: Partial<LoggerOptions> = {}): Log {
    const {
      level,
      payload,
      transport
    } = opts

    return new Log({
      level: level ?? this.level,
      payload: typeof payload === 'object' ? extend({}, this.payload, payload) : this.payload,
      transport: transport ?? this.transport
    })
  }

  public format(level: LogLevel, message: LogMessage, payload?: LogPayload): FormattedLog {
    const output: FormattedLog = {
      level: level,
      message: '',
      timestamp: new Date(),
    }
    let msg

    if (message instanceof Error) {
      const err = message

      output.stack = err.stack

      // @ts-expect-error
      if (typeof err.expose !== 'undefined') {
        // @ts-expect-error
        output.expose = err.expose
      }

      // @ts-expect-error
      if (typeof err.headers !== 'undefined') {
        // @ts-expect-error
        output.headers = err.headers
      }

      // @ts-expect-error
      if (typeof err.statusCode !== 'undefined') {
        // @ts-expect-error
        output.statusCode = err.statusCode
      }

      if (level < LogLevel.error) {
        output.level = LogLevel.error
      }

      msg = err.message
    } else {
      msg = message
    }

    return {
      ...output,
      message: msg,
      ...payload
    }
  }
}
