"use strict";

const BaseOperation = require("./base.js");

class BaseQuery extends BaseOperation {

  constructor() {
    super();
    this.entrypoint = "query";
  }
}

module.exports = BaseQuery;