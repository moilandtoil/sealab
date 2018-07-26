"use strict";

class BaseService {
  constructor(application) {
    this.application = application;
  }

  name() {
    throw Error("Incomplete service implementation");
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

  service(serviceName) {
    this.ensureApplication();
    return this.application.service(serviceName);
  }

  model(modelName) {
    this.ensureApplication();
    return this.application.model(modelName);
  }

  conn(connName) {
    this.ensureApplication();
    return this.application.conn(connName);
  }

  ensureApplication() {
    if (!this.application) {
      throw new Error("Application container must be attached to service");
    }
  }
}

module.exports = BaseService;