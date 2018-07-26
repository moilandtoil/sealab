"use strict";

const TypeManager = require("../manager.js");
const BaseType = require("../base.js");
const SchemaBuilder = require("../../schema-builder/schema_builder.js");

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

class Valid1 extends BaseType {
  constructor(application) {
    super(application);
    this.typeName = "Valid1";
    this.typeDef = `
      type Valid1 {}
    `
  }

  resolver() {
    return {}
  }
}
class Valid2 extends BaseType {
  constructor(application) {
    super(application);
    this.typeName = "Valid2";
    this.typeDef = `
      type Valid2 {}
    `
  }

  resolver() {
    return {};
  }
}

class NoName extends BaseType {
  constructor(application) {
    super(application);
    this.typeDef = `
      type NoName {
        foo: String
      }
    `
  }

  resolver() {
    return {
      foo: (value) => {
        return value.foo;
      }
    }
  }
}

class NoTypeDef extends BaseType {
  constructor(application) {
    super(application);
    this.typeName = "ValidType";
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

class NoResolver extends BaseType {
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
}

describe("Check that TypeManager", () => {

  let logFunc = jest.fn();
  let application = {
    logger: {
      error: logFunc,
      debug: logFunc,
      info: logFunc,
    },
    service: {
      "foo": true
    }
  };

  let typeManager = null;
  beforeEach(() => {
    typeManager = new TypeManager(new SchemaBuilder());
  });

  describe("when registering type", () => {
    test("works with valid type", () => {
      expect(() => {
        typeManager.registerType(ValidType, application);
      }).not.toThrow();
    });

    test("failed if application not passed", () => {
      expect(() => {
        typeManager.registerType(ValidType);
      }).toThrow();
    });

    test("fails with no type name", () => {
      expect(() => {
        typeManager.registerType(NoName, application);
      }).toThrow();
    });

    test("fails with no type def", () => {
      expect(() => {
        typeManager.registerType(NoTypeDef, application);
      }).toThrow();
    });

    test("fails with no type resolver", () => {
      expect(() => {
        typeManager.registerType(NoResolver, application);
      }).toThrow();
    });
  });

  describe("when registering multpiple classes at once", () => {
    test("works with no classes", () => {
      expect(() => {
        typeManager.registerTypes([], application);
      }).not.toThrow();
      expect(typeManager.schemaBuilder.typeDefs['null'].length).toEqual(0);
    });

    test("works with one classes", () => {
      expect(() => {
        typeManager.registerTypes([Valid1], application);
      }).not.toThrow();
      expect(typeManager.schemaBuilder.typeDefs['null'].length).toEqual(1);
    });

    test("works with multiple classes", () => {
      expect(() => {
        typeManager.registerTypes([Valid1, Valid2], application);
      }).not.toThrow();
      expect(typeManager.schemaBuilder.typeDefs['null'].length).toEqual(2);
    })
  });
});
