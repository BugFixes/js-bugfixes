import {
  ConsoleTransport,
  LogLevel,
} from '../../src'

describe('Console log transport', function () {
  beforeEach(function () {
    jest.spyOn(console, 'error').mockImplementation(function () {}) // eslint-disable-line @typescript-eslint/no-empty-function
    jest.spyOn(console, 'warn').mockImplementation(function () {}) // eslint-disable-line @typescript-eslint/no-empty-function
    jest.spyOn(console, 'info').mockImplementation(function () {}) // eslint-disable-line @typescript-eslint/no-empty-function
  })

  test('dispatches fatal level logs to console.error()', function () {
    const transport = new ConsoleTransport()
    const log = {
      level: LogLevel.fatal,
      message: 'Test',
      timestamp: new Date(),
    }

    transport.dispatch(log)

    expect(console.error).toHaveBeenCalledWith(log) // eslint-disable-line no-console
  })

  test('dispatches error level logs to console.error()', function () {
    const transport = new ConsoleTransport()
    const log = {
      level: LogLevel.error,
      message: 'Test',
      timestamp: new Date(),
    }

    transport.dispatch(log)

    expect(console.error).toHaveBeenCalledWith(log) // eslint-disable-line no-console
  })

  test('dispatches warn level logs to console.warn()', function () {
    const transport = new ConsoleTransport()
    const log = {
      level: LogLevel.warn,
      message: 'Test',
      timestamp: new Date(),
    }

    transport.dispatch(log)

    expect(console.warn).toHaveBeenCalledWith(log) // eslint-disable-line no-console
  })

  test('dispatches info level logs to console.info()', function () {
    const transport = new ConsoleTransport()
    const log = {
      level: LogLevel.info,
      message: 'Test',
      timestamp: new Date(),
    }

    transport.dispatch(log)

    expect(console.info).toHaveBeenCalledWith(log) // eslint-disable-line no-console
  })

  test('dispatches debug level logs to console.info()', function () {
    const transport = new ConsoleTransport()
    const log = {
      level: LogLevel.debug,
      message: 'Test',
      timestamp: new Date(),
    }

    transport.dispatch(log)

    expect(console.info).toHaveBeenCalledWith(log) // eslint-disable-line no-console
  })

  test('formats logs using a custom formatter', function () {
    const transport = new ConsoleTransport({
      formatter() {
        return 'test'
      },
    })
    const log = {
      level: LogLevel.debug,
      message: 'Test',
      timestamp: new Date(),
    }

    transport.dispatch(log)

    expect(console.info).toHaveBeenCalledWith('test') // eslint-disable-line no-console
  })
})
