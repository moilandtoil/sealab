"use strict";

class BaseType {

  constructor(application) {
    this.application = application;
    this.typeName = null; // TODO: Parse this from the typeDef
    this.typeDef = null;
  }

  resolver() {
    throw Error("Incomplete type implementation");
  }

  resolverOverwritten() {
    return this.resolver !== BaseType.prototype.resolver;
  }

  // helper functions
  logger() {
    if (this.application === null) {
      throw new Error("Application container must be attached to service");
    }
    return this.application.logger();
  }

  debug(message, ...additional) {
    this.logger().debug(message, ...additional);
  }

  info(message, ...additional) {
    this.logger().info(message, ...additional);
  }

  error(message, ...additional) {
    this.logger().error(message, ...additional);
  }

  model(modelName) {
    this.ensureApplication();
    return this.application.model(modelName);
  }

  service(serviceName) {
    this.ensureApplication();
    return this.application.service(serviceName);
  }

  ensureApplication() {
    if (!this.application) {
      throw new Error("Application container must be attached to type");
    }
  }
}

module.exports = BaseType;