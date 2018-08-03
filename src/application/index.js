"use strict";

const ServiceManager = require("../services/manager.js");
const ConnectionManager = require("../connections/manager.js");
const ModelManager = require("../models/manager.js");

class Application {

  constructor(managers, logger) {
    this.serviceManager = managers.serviceManager || new ServiceManager();
    this.connectionManager = managers.connectionManager || new ConnectionManager();
    this.modelManager = managers.modelManager || new ModelManager();
    this.appLogger = logger;
    this.pubsubEngine = null;
  }

  registerService(services) {
    return this.serviceManager.register(services, this);
  }

  registerServices(services) {
    for(let service of services) {
      this.registerService(service);
    }
  }

  registerConnection(connName, connObj) {
    return this.connectionManager.register(connName, connObj);
  }

  registerModel(model) {
    return this.modelManager.register(model);
  }

  registerModels(models) {
    for(let model of models) {
      this.registerModel(model)
    }
  }

  registerPubSub(pubsub) {
    this.pubsubEngine = pubsub;
  }

  service(serviceName) {
    return this.serviceManager.getService(serviceName);
  }

  conn(connId) {
    return this.connectionManager.getConnection(connId);
  }

  model(modelName) {
    return this.modelManager.getModel(modelName);
  }

  pubsub() {
    return this.pubsubEngine;
  }

  logger() {
    return this.appLogger;
  }
}

module.exports = Application;