"use strict";

const _ = require("lodash");

class DefaultLogger {
  constructor(logLevel) {
    this.level = logLevel;
  }

  log(level, message, ...extra) {
    if (level < this.level) {
      return
    }
    let label = DefaultLogger.LEVEL_TO_STRING[level];
    console.log(`[${label.toUpperCase()}] ${message} ${extra}`);
  }

  fatal(message, ...extra) {
    this.log(DefaultLogger.FATAL, message, ...extra);
  }

  error(message, ...extra) {
    this.log(DefaultLogger.ERROR, message, ...extra);
  }

  warn(message, ...extra) {
    this.log(DefaultLogger.WARN, message, ...extra);
  }

  info(message, ...extra) {
    this.log(DefaultLogger.INFO, message, ...extra);
  }

  debug(message, ...extra) {
    this.log(DefaultLogger.DEBUG, message, ...extra);
  }

  trace(message, ...extra) {
    this.log(DefaultLogger.TRACE, message, ...extra);
  }
}

DefaultLogger.FATAL = 60;
DefaultLogger.ERROR = 50;
DefaultLogger.WARN = 40;
DefaultLogger.INFO = 30;
DefaultLogger.DEBUG = 20;
DefaultLogger.TRACE = 10;

DefaultLogger.STRING_TO_LEVEL = {
  'fatal': DefaultLogger.FATAL,
  'error': DefaultLogger.ERROR,
  'warn': DefaultLogger.WARN,
  'info': DefaultLogger.INFO,
  'debug': DefaultLogger.DEBUG,
  'trace': DefaultLogger.TRACE
};

DefaultLogger.LEVEL_TO_STRING = _.invert(DefaultLogger.STRING_TO_LEVEL);

module.exports = DefaultLogger;