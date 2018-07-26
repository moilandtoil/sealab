"use strict";

const ChangeCase = require("change-case");

class ServiceManager {
  constructor() {
    this.services = {};
  }

  register(serviceClass, application) {
    const serviceInstance = new serviceClass(application);
    const serviceName = ChangeCase.snakeCase(serviceInstance.constructor.name);

    return this.services[serviceName] = serviceInstance;
  }

  getService(serviceName) {
    if (this.services.hasOwnProperty(`${serviceName}_service`)) {
      return this.services[`${serviceName}_service`];
    }
    if (this.services.hasOwnProperty(serviceName)) {
      return this.services[serviceName];
    }
    throw new Error("Service \"${serviceName}\" not configured");
  }
}

module.exports = ServiceManager;