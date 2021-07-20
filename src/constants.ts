export enum LogLevel {
  fatal = 0,
  crash = fatal,
  panic = fatal,

  error = 1,

  warn = 2,

  info = 3,
  log = info,

  debug = 4,

  unknown= 5,
}

export enum BugFixesLogLevel {
  log = 1,
  debug = log,

  warn,
  info = warn,

  error,

  fatal,
  crash = fatal,
  panic = fatal,

  unknown
}
