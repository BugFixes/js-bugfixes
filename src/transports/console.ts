import {LogLevel} from "../constants"
import type {FormattedLog, FormatterFn, LogTransport} from "../types"

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
    const formatedLog = typeof format === 'function' ? format(log) : log

    switch (log.level) {
      case LogLevel.log:
        console.log(formatedLog)
        return

      case LogLevel.info:
        console.info(formatedLog)
        return

      case LogLevel.warn:
        console.warn(formatedLog)
        return

      case LogLevel.error:
      case LogLevel.fatal:
      case LogLevel.panic:
      case LogLevel.crash:
        console.error(formatedLog)
        return

      case LogLevel.debug:
      case LogLevel.unknown:
      default:
        console.debug(formatedLog)
        return
    }
  }
}
