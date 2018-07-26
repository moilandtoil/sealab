"use strict";

class BaseBuard {
  id() {
    throw new Error("Guard not implemented");
  }

  validate(context) {
    throw new Error("Guard not implemented");
  }
}

module.exports = BaseBuard;