import chalk from 'chalk'
import {
  LogLevel,
} from "../constants"

import type {
  FormattedLog,
} from "../types"

function formatTimestamp(timestamp: Date): string {
  return chalk.cyan(`[${timestamp.toISOString()}]`)
}

function formatLevel(level: LogLevel): string {
  const strLevel = LogLevel[level].toUpperCase()

  switch (level) {
    case LogLevel.fatal:
    case LogLevel.error:
      return chalk.redBright(strLevel)
    case LogLevel.warn:
      return chalk.yellowBright(strLevel)
    case LogLevel.info:
      return chalk.greenBright(strLevel)
    default:
      return chalk.blueBright(strLevel)
  }
}

function formatStack(stack: string): string {
  const lines = stack.split(/\n/)
  return chalk.redBright(`  ${lines.join('\n  ')}`)
}

function formatPayload(payload: {[prop: string]: any}): string {
  const lines: string[] = []

  Object.keys(payload).forEach(function(prop) {
    lines.push(`${prop}: ${chalk.bold(JSON.stringify(payload[prop]))}`)
  })

  return chalk.dim(`  ${lines.join('\n  ')}`)
}

function formatMessage(message: string): string {
  return chalk.bold(message)
}


export function prettyFormatter(log: FormattedLog): string {
  const {
    timestamp,
    level,
    message,
    stack,
    ...payload
  } = log

  let output = `${formatTimestamp(timestamp)} ${formatLevel(level)}: ${formatMessage(message)}`

  if (typeof stack !== 'undefined') {
    output += `\n${formatStack(stack)}`
  }

  if (Object.keys(payload).length !== 0) {
    output += `\n${formatPayload(payload)}`
  }

  return output
}
