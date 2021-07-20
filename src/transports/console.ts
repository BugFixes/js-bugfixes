import {
  LogLevel,
} from "../constants"
import type {
  FormattedLog,
  FormatterFn,
  LogTransport,
} from "../types"

type Options = {
  formatter?: FormatterFn
}

export class ConsoleTransport implements LogTransport {
  private readonly formatter?: FormatterFn

  constructor(opts: Options = {}) {
    this.formatter = opts.formatter
  }

  public dispatch(log: FormattedLog): void {
    const format = this.formatter
    const formattedLog = typeof format === 'function' ? format(log) : log

    switch (log.level) {
      case LogLevel.log:
      case LogLevel.debug:
      case LogLevel.info:
        console.info(formattedLog)
        return

      case LogLevel.warn:
        console.warn(formattedLog)
        return

      case LogLevel.error:
      case LogLevel.fatal:
      case LogLevel.crash:
      case LogLevel.panic:
        console.error(formattedLog)
        return

      case LogLevel.unknown:
      default:
        console.log(formattedLog)
        return
    }
  }
}
