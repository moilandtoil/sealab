#! /usr/bin/env node
"use strict";

const Application = require("./src/application/index.js");
const DefaultLogger = require("./src/logger/default.js");
const SchemaBuilder = require("./src/schema-builder/schema_builder.js");

const BaseOperation = require("./src/operations/base.js");
const BaseRoute = require("./src/outes/base.js");
const BaseService = require("./src/services/basejs");
const BaseType = require("./src/types/base.js");

const ConnectionManager = require("./src/connections/manager.js");
const ModelManager = require("./src/models/manager.js");
const OperationManager = require("./src/operations/manager.js");
const RoutesManager = require("./src/routes/manager.js");
const ServiceManager = require("./src/services/manager.js");
const TypeManager = require("./src/types/manager.js");

module.exports = {
  Application,
  DefaultLogger,
  SchemaBuilder,

  BaseOperation,
  BaseRoute,
  BaseService,
  BaseType,

  ConnectionManager,
  ModelManager,
  OperationManager,
  RoutesManager,
  ServiceManager,
  TypeManager,
};