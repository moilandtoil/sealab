"use strict";

const BaseOperation = require("./base.js");

class BaseSubscription extends BaseOperation {

  constructor() {
    super();
    this.entrypoint = "subscription";
  }

  isSubscription() {
    return true;
  }

  getConfig() {
    const config = super.getConfig();
    config.subscribe = this.executeSubscribe.bind(this);
    return config;
  }

  executeSubscribe(root, args, context) {
    try {
      this.debug(`Executing GQL subscription for operation '${this.name}'`);
      return this.subscribe(root, args, context);
    } catch (err) {
      this.debug(`Error occurred executing operation... "${err.message}"`);
      throw err;
    }
  }

  subscribe(root, args, context) {
    throw new Error("Subscribe method not implemented");
  }

  pubsub() {
    this.ensureApplication();
    return this.application.pubsub();
  }
}

module.exports = BaseSubscription;