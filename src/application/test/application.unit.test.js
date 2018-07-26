"use strict";

const BaseService = require("../../services/base.js");
const ServiceManager = require("../../services/manager.js");
const ConnectionManager = require("../../connections/manager.js");
const ModelManager = require("../../models/manager.js");
const DefaultLogger = require("../../logger/default.js");
const Application = require("../index.js");

class TestService extends BaseService {
  name() {
    return "test_service";
  }
}


class OtherService extends BaseService {
  name() {
    return "other_service";
  }

  foo() {
    return "bar"
  }
}

describe("Check application constructor", () => {

  test("without passing managers", () => {
    let application = new Application({}, true);
    expect(application.serviceManager.constructor.name).toEqual("ServiceManager");
    expect(application.connectionManager.constructor.name).toEqual("ConnectionManager");
    expect(application.modelManager.constructor.name).toEqual("ModelManager");
  });

  test("with passing managers", () => {
    let connectionManager = new ConnectionManager();
    let serviceManager = new ServiceManager();
    let modelManager = new ModelManager();
    let application = new Application({
      serviceManager: serviceManager,
      connectionManager: connectionManager,
      modelManager: modelManager
    }, true);
    expect(application.serviceManager.constructor.name).toEqual("ServiceManager");
    expect(application.connectionManager.constructor.name).toEqual("ConnectionManager");
    expect(application.modelManager.constructor.name).toEqual("ModelManager");
  });
});

describe("An application", () => {
  let application = null;
  beforeEach(() => {
    application = new Application({}, true);
  });

  describe("with service manager", () => {
    test("can get registered service", () => {
      let service = application.registerService(TestService);
      expect(application.service(service.name())).toEqual(service);
    });

    test("throw error getting unregistered service", () => {
      expect(() => {
        application.service("derp");
      }).toThrow();
    });
  });

  describe("with connection manager", () => {

    test("can get registered connection", () => {
      let connection = application.registerConnection("foo", "bar");
      expect(application.conn("foo")).toEqual("bar");
    });

    test("throw error getting unregistered connection", () => {
      expect(() => {
        connectionManager.register("foo", "bar");
        connectionManager.register("foo", "derp");
      }).toThrow();
    });
  });

  describe("with logger", () => {

    test("#logger()", () => {
      expect(application.logger()).toEqual(true);
    });
  });

  describe("with a registered service", () => {

    test("can get other service", () => {
      let test = application.registerService(TestService);
      let other = application.registerService(OtherService);
      expect(test.service(other.name())).toBeDefined();
    });

    test("can get other service and run foo", () => {
        let test = application.registerService(TestService);
        application.registerService(OtherService);
        let other = test.service("other_service");
        expect(other.foo()).toEqual("bar");
    });

    test("throw error getting non existent other service", () => {
      expect(() => {
        let test = application.registerService(TestService);
        let other = test.service("derp");
      }).toThrow();
    });
  });
});