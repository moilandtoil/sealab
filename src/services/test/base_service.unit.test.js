"use strict";

const BaseService = require("../base.js");

class ValidService extends BaseService {
  name() {
    return "valid_service";
  }

  foo() {
    return "bar"
  }
}

class BadName extends BaseService {
  name() {
    return "@bad"
  }
}

class NoName extends BaseService {}


describe("When instantiating service", () => {

  describe("with a name that is", () => {
    test("overridden ", () => {
      let service = new ValidService({});
      expect(service.name()).toEqual("valid_service");
    });

    test("not overridden", () => {
      expect(() => {
        let service = new NoName({});
        service.name();
      }).toThrow();
    });
  });

  describe("with setting an application", () => {
    let testOp = null;
    let logFunc = null;

    beforeEach(() => {
      logFunc = jest.fn();
      testOp = new ValidService({
        service: () => { return true },
        conn: () => { return true },
        logger: () => {
          return {
            error: logFunc,
              info: logFunc,
            debug: logFunc,
          };
        }
      });
    });

    test("#service()", () => {
      expect(testOp.service("test")).toEqual(true);
    });

    test("#conn()", () => {
      expect(testOp.conn("test")).toEqual(true);
    });

    test("#logger()", () => {
      expect(testOp.logger()).toHaveProperty('error');
      expect(testOp.logger()).toHaveProperty('info');
      expect(testOp.logger()).toHaveProperty('debug');
    });

    test("#error()", () => {
      testOp.error("message");
      expect(logFunc).toHaveBeenCalled();
    });

    test("#info()", () => {
      testOp.info("message");
      expect(logFunc).toHaveBeenCalled();
    });

    test("#debug()", () => {
      testOp.debug("message");
      expect(logFunc).toHaveBeenCalled();
    });
  });

  describe("without setting application", () => {

    let testOp = null;
    beforeEach(() => {
      testOp = new ValidService();
    });

    test("#service()", () => {
      expect(() => {
        testOp.service("test");
      }).toThrow();
    });

    test("#conn()", () => {
      expect(() => {
        testOp.conn("test");
      }).toThrow();
    });

    test("#logger()", () => {
      expect(() => {
        testOp.logger();
      }).toThrow();
    });

    test("#error()", () => {
      expect(() => {
        testOp.error("test");
      }).toThrow();
    });

    test("#info()", () => {
      expect(() => {
        testOp.info("test");
      }).toThrow();
    });

    test("#debug()", () => {
      expect(() => {
        testOp.debug("test");
      }).toThrow();
    });
  });
});