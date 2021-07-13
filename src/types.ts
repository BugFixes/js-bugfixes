import {
  LogLevel
} from './constants'

export type LogMessage = string | Error
export type LogPayload = {
  [propName: string]: any
}

export type FormattedLog = {
  [propName: string]: any,
  expose?: boolean,
  headers? : {
    [propName: string]: any,
  },
  level: LogLevel,
  message: string,
  stack?: string
  statusCode?: number,
  timestamp: Date,
}

export type FormatterFn = (log: FormattedLog) => any

export type LogTransport = {
  [propName: string]: any,
  dispatch(log: FormattedLog): void,
}
