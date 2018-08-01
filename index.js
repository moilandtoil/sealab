#! /usr/bin/env node
"use strict";

const Application = require("./src/application/index.js");
const DefaultLogger = require("./src/logger/default.js");
const SchemaBuilder = require("./src/schema-builder/schema_builder.js");

const BaseGuard = require("./src/guards/base.js");
const BaseOperation = require("./src/operations/base.js");
const BaseRoute = require("./src/routes/base.js");
const BaseService = require("./src/services/base.js");
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

  BaseGuard,
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