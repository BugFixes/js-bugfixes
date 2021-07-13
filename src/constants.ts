export enum LogLevel {
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
