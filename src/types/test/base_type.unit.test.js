"use strict";

const BaseType = require("../base.js");

class ValidType extends BaseType {
  constructor(application) {
    super(application);
    this.typeName = "ValidType";
    this.typeDef = `
      type ValidType {
        id: String
        foo: String
      }
    `
  }

  resolver() {
    return {
      id: (value) => {
        return value.id;
      },
      foo: (value) => {
        return value.foo;
      }
    }
  }
}


class ComplexType extends BaseType {
  constructor(application) {
    super(application);
    this.typeName = "ComplexType";
    this.typeDef = `doesn't matter`;
  }

  resolver() {
    return {
      callService: (value) => {
        return this.service(value);
      },
    }
  }
}

describe("When instantiating type", () => {

  let application = null;
  let logFunc = null;
  let type = null;

  beforeEach(() => {
    logFunc = jest.fn();
    application = {
      logger: () => {
        return {
          error: logFunc,
          debug: logFunc,
          info: logFunc,
        };
      },
      service: (name) => {
        return true;
      },
      model: (name) => {
        return true;
      }
    };

    type = new ValidType(application);
  });

  test("all fields should be set ", () => {

    expect(type.typeName).toEqual("ValidType");
    expect(type.typeDef).toEqual(expect.stringContaining("type ValidType {\n        id: String\n        foo: String\n      }"));
    expect(type.resolver()).toEqual(expect.objectContaining({
      id: expect.any(Function),
      foo: expect.any(Function)
    }))
  });

  test("services should be callable from resolver", () => {
    let serviceType = new ComplexType(application);
    let resolver = serviceType.resolver();
    expect(resolver.callService("foo")).toEqual(true);
  });

  describe("with setting an application", () => {
    test("#service()", () => {
      expect(type.service("foo")).toEqual(true);
    });

    test("#model()", () => {
      expect(type.model("foo")).toEqual(true);
    });

    test("#logger()", () => {
      expect(type.logger()).toHaveProperty('error');
      expect(type.logger()).toHaveProperty('info');
      expect(type.logger()).toHaveProperty('debug');
    });

    test("#error()", () => {
      type.error("message");
      expect(logFunc).toHaveBeenCalled();
    });

    test("#info()", () => {
      type.info("message");
      expect(logFunc).toHaveBeenCalled();
    });

    test("#debug()", () => {
      type.debug("message");
      expect(logFunc).toHaveBeenCalled();
    });
  });
});