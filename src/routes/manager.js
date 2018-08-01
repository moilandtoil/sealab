"use strict";

const _ = require("lodash");

class RoutesManager {
  constructor(express, application) {
    this.express = express;
    this.application = application;
    this.prefix_stack = [];
  }

  buildPrefix(routeInstaance) {
    let prefixPath = this.prefix_stack.join("/");
    let routePath = this.trimSlashes(routeInstaance.route());

    routePath = `/${routePath}`;

    if (prefixPath.length > 0) {
      routePath = `/${prefixPath}${routePath}`;
    }

    return routePath;
  }

  group(prefix, wrapper) {
    this.prefix_stack.push(this.trimSlashes(prefix));
    wrapper();
    this.prefix_stack.pop();
  }

  registerRoute(routeClass) {
    let routeInstance = new routeClass(this.application);

    let methods = routeInstance.method();
    if (!_.isArray(methods)) {
      methods = [methods];
    }

    for(const method of methods) {
      this.express[method](this.buildPrefix(routeInstance), (req, res) => {
        return Promise.resolve().then(() => {
          return routeInstance.action(req, res);
        }).catch((err) => {
          this.application.logger().error(JSON.stringify(err));
          res.status(500).send("An error occurred while processing the route.");
        });
      });
    }
  }

  registerRoutes(routeClasses) {
    for(let routeClass of routeClasses) {
      this.registerRoute(routeClass);
    }
  }

  trimSlashes(value) {
    return value.replace(/^\/|\/$/g, '');
  }
}

module.exports = RoutesManager;