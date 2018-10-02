"use strict";

const Joi = require("joi");

class OperationManager {
  constructor(schemaBuilder) {
    this.schemaBuilder = schemaBuilder;
    this.preExecution = [];
  }

  registerOperation(operationClass, application) {
    let operation = new operationClass();
    operation.setApplication(application);
    const config = operation.getConfig();

    if (operation.isSubscription()) {
      const hookedFunc = (root, args, context, info) => {
        let chain = Promise.resolve([root, args, context, operation]);

        // validate input
        chain = chain.then((result) => {
          let args = result[1];
          let operation = result[3];

          this.validateInput(operation, args);
          return result;
        });

        // run pre execution hooks
        for(let pre of this.preExecution) {
          chain = chain.then((result) => {
            return pre(...result);
          });
        }
        chain = chain.then((result) => {
          let root = result[0];
          let args = result[1];
          let context = result[2];

          try {
            this.schemaBuilder.validateGuards(operation.guards, context);
          } catch (err) {
            operation.guardError(err, context);
          }
          return config.subscribe(root, args, context, info);
        });

        return chain;
      };
      this.schemaBuilder.addEntrypoint(config.name, config.entrypoint, config.typeDef, {
        subscribe: hookedFunc,
        resolve: config.resolver
      }, config.guards);
    } else {
      const hookedFunc = (root, args, context) => {
        let chain = Promise.resolve([root, args, context, operation]);

        // validate input
        chain = chain.then((result) => {
          let args = result[1];
          let operation = result[3];

          this.validateInput(operation, args);
          return result;
        });

        // run pre execution hooks
        for(let pre of this.preExecution) {
          chain = chain.then((result) => {
            return pre(...result);
          });
        }

        chain = chain.then((result) => {
          let root = result[0];
          let args = result[1];
          let context = result[2];

          try {
            this.schemaBuilder.validateGuards(operation.guards, context);
          } catch (err) {
            operation.guardError(err, context);
          }
          return config.resolver(root, args, context);
        });

        return chain;
      };
      this.schemaBuilder.addEntrypoint(config.name, config.entrypoint, config.typeDef, hookedFunc, config.guards);
    }
    return operation;
  }

  registerOperations(operationClasses, application) {
    for(let operationClass of operationClasses) {
      this.registerOperation(operationClass, application);
    }
  }

  registerPreHook(callback) {
    this.preExecution.push(callback);
  }

  validateInput(operation, args) {
    if (operation.validation) {
      const result = Joi.validate(args, Joi.object().keys(operation.validation));
      if (result.error) {
        operation.inputError(result.error, args);
      }
      return result;
    }
  }
}

module.exports = OperationManager;