"use strict";

const DefaultLogger = require("../default.js");



describe("Overridden log", () => {

  let logger = null;
  let val = null;

  class JestLogger extends DefaultLogger {
    log(level, message, ...extra) {
      val = message;
    }
  }

  class TestLogger extends DefaultLogger {
    log(level, message, ...extra) {
      if (level < this.level) {
        return
      }
      val = DefaultLogger.LEVEL_TO_STRING[level];
    }
  }

  test("should log", () => {
    logger = new JestLogger(JestLogger.DEBUG);
    logger.log(JestLogger.DEBUG, "test");
    expect(val).toEqual("test");
  });

  test("log level: trace", () => {
    logger = new TestLogger(TestLogger.TRACE);
    logger.fatal("reset");
    logger.trace("trace");
    expect(val).toEqual("trace");
    logger.debug("debug");
    expect(val).toEqual("debug");
    logger.info("info");
    expect(val).toEqual("info");
    logger.warn("warn");
    expect(val).toEqual("warn");
    logger.error("error");
    expect(val).toEqual("error");
    logger.fatal("fatal");
    expect(val).toEqual("fatal");
  });

  test("log level: debug", () => {
    logger = new TestLogger(TestLogger.DEBUG);
    logger.trace("trace");
    expect(val).toEqual("fatal");
    logger.debug("debug");
    expect(val).toEqual("debug");
    logger.info("info");
    expect(val).toEqual("info");
    logger.warn("warn");
    expect(val).toEqual("warn");
    logger.error("error");
    expect(val).toEqual("error");
    logger.fatal("fatal");
    expect(val).toEqual("fatal");
  });

  test("log level: info", () => {
    logger = new TestLogger(TestLogger.INFO);
    logger.trace("trace");
    expect(val).toEqual("fatal");
    logger.debug("debug");
    expect(val).toEqual("fatal");
    logger.info("info");
    expect(val).toEqual("info");
    logger.warn("warn");
    expect(val).toEqual("warn");
    logger.error("error");
    expect(val).toEqual("error");
    logger.fatal("fatal");
    expect(val).toEqual("fatal");
  });

  test("log level: warn", () => {
    logger = new TestLogger(TestLogger.WARN);
    logger.trace("trace");
    expect(val).toEqual("fatal");
    logger.debug("debug");
    expect(val).toEqual("fatal");
    logger.info("info");
    expect(val).toEqual("fatal");
    logger.warn("warn");
    expect(val).toEqual("warn");
    logger.error("error");
    expect(val).toEqual("error");
    logger.fatal("fatal");
    expect(val).toEqual("fatal");
  });

  test("log level: error", () => {
    logger = new TestLogger(TestLogger.ERROR);
    logger.trace("trace");
    expect(val).toEqual("fatal");
    logger.debug("debug");
    expect(val).toEqual("fatal");
    logger.info("info");
    expect(val).toEqual("fatal");
    logger.warn("warn");
    expect(val).toEqual("fatal");
    logger.error("error");
    expect(val).toEqual("error");
    logger.fatal("fatal");
    expect(val).toEqual("fatal");
  });

  test("log level: fatal", () => {
    logger = new TestLogger(TestLogger.FATAL);
    logger.trace("trace");
    expect(val).toEqual("fatal");
    logger.debug("debug");
    expect(val).toEqual("fatal");
    logger.info("info");
    expect(val).toEqual("fatal");
    logger.warn("warn");
    expect(val).toEqual("fatal");
    logger.error("error");
    expect(val).toEqual("fatal");
    logger.fatal("fatal");
    expect(val).toEqual("fatal");
  });
});