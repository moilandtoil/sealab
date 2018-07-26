"use strict";

class GuardError extends Error {
  constructor(guardId, extras) {
    super("Guard validation failed");
    this.name = this.constructor.name;
    this.guardId = guardId;
    this.guardExtras = extras;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = GuardError;
