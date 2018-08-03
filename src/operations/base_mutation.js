"use strict";

const BaseOperation = require("./base.js");

class BaseMutation extends BaseOperation {

  constructor() {
    super();
    this.entrypoint = "mutation";
  }
}

module.exports = BaseMutation;