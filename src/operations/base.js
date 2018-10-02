"use strict";

const Joi = require("joi");

class BaseOperation {

  constructor() {
    this.name = "";
    this.entrypoint = "";
    this.typeDef = "";
    this.guards = [];
    this.application = null;
    this.schema = Joi;
  }

  isSubscription() {
    return false;
  }

  getConfig() {
    return {
      name: this.name,
      entrypoint: this.entrypoint.toLowerCase(),
      typeDef: this.typeDef,
      resolver: this.executeResolver.bind(this),
      guards: this.guards,
      validation: null,
    };
  }

  executeResolver(root, args, context) {
    try {
      this.debug(`Executing GQL resolver for operation '${this.name}'`);
      return this.resolver(root, args, context);
    } catch (err) {
      this.debug(`Error occurred executing operation... "${err.message}"`);
      // if (err instanceof OperationError) {
      //   // Output error message
      // }
      // // do something else?
      throw err;
    }
  }

  guardError(context) {
    throw new Error('Request failed, one or more guard validations failed');
  }

  inputError(error, args) {
    throw new Error(`Request failed, invalid input specified ("${error.details[0].message}")`);
  }

  logger() {
    this.ensureApplication();
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

  setApplication(application) {
    this.application = application;
  }

  service(serviceName) {
    this.ensureApplication();
    return this.application.service(serviceName);
  }
  
  conn(connName) {
    this.ensureApplication();
    return this.application.conn(connName);
  }

  model(modelName) {
    this.ensureApplication();
    return this.application.model(modelName);
  }

  ensureApplication() {
    if (this.application === null) {
      throw new Error("Application container must be attached to operation");
    }
  }

  // abstract methods
  resolver(root, args, context) {
    throw new Error("Resolver method not implemented");
  }
}

module.exports = BaseOperation;