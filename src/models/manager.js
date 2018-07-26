"use strict";

const ChangeCase = require("change-case");

class ModelManager {
  constructor() {
    this.models = {};
  }

  register(model) {
    const modelName = ChangeCase.snakeCase(model.name);

    return this.models[modelName] = model;
  }

  getModel(modelName) {
    if (!this.models.hasOwnProperty(modelName)) {
      throw new Error("Model \"${modelName}\" not configured");
    }
    return this.models[modelName];
  }
}

module.exports = ModelManager;