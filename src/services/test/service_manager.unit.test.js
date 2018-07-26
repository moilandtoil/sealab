"use strict";

const ServiceManager = require("../manager.js");
const BaseService = require("../base.js");

class ValidService extends BaseService {}
class ValidComplexService extends BaseService {}

describe("Check that ServiceManager", () => {

  let serviceManager = null;
  beforeEach(() => {
    serviceManager = new ServiceManager();
  });

  describe("can get registered service", () => {

    let serviceManager = null;
    beforeEach(() => {
      serviceManager = new ServiceManager();
    });

    test("that exists simple", () => {
      let service = serviceManager.register(ValidService, {});
      expect(serviceManager.getService("valid_service")).toEqual(service);
    });

    test("that exists", () => {
      let service = serviceManager.register(ValidComplexService, {});
      expect(serviceManager.getService("valid_complex_service")).toEqual(service);
    });

    test("that doesn't exist", () => {
      expect(() => {
        serviceManager.getService("some_service");
      }).toThrow();
    });

    test("with implicit 'service'", () => {
      let service = serviceManager.register(ValidService, {});
      expect(serviceManager.getService("valid")).toEqual(service);
    });
  });
});
