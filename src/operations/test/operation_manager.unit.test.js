"use strict";

const OperationManager = require("../manager.js");
const BaseOperation = require("../base.js");

class TestOp extends BaseOperation {
  constructor() {
    super();
    this.name = "TestOp";
    this.entrypoint = "Query";
    this.typeDef = `type test {
      id: ID!
    }`;
  }

  resolver(root, args, context) {
    return {
      id: context.id
    };
  }
}

class TestOp2 extends BaseOperation {
  constructor() {
    super();
    this.name = "TestOp2";
    this.entrypoint = "Query";
    this.typeDef = `type test2 {
      id: ID!
    }`;
  }

  resolver(root, args, context) {
    return {
      id: context.id
    };
  }
}

class ValidationTest extends BaseOperation {
  constructor() {
    super();
    this.name = "TestOp3";
    this.entrypoint = "Query";
    this.typeDef = `type test3 {
      id: String!
    }`;
    this.validation = {
      id: this.schema.string().alphanum().min(3).max(5),
    };
  }

  resolver(root, args, context) {
    return {
      id: context.id
    };
  }
}

// stub logger to prevent errors
let stubbedLogger = {
  debug: function() {},
  info: function() {},
  error: function() {}
};

let stubbedLoggerApplication = {
  logger: function() {
    return stubbedLogger;
  }
};

describe("registerOperation", () => {

  let manager = null;
  let schemaBuilder = null;
  beforeEach(() => {
    schemaBuilder = {
      resolvers: {},
      addEntrypoint: function(name, entrypoint, typeDef, resolver, guards) {
        if (entrypoint !== "query") {
          throw Error("Bad entrypoint");
        }
        this.resolvers[name] = resolver;
      },
      validateGuards: function() {
        return true;
      }
    };
    manager = new OperationManager(schemaBuilder);
  });

  test("with valid operation", () => {
    manager.registerOperation(TestOp, stubbedLoggerApplication);
    expect(schemaBuilder.resolvers["TestOp"](null, null, { id: "foo" })).resolves.toHaveProperty("id");
  });

  test("adding multiple with empty array", () => {
    expect(() => {
      manager.registerOperations([], stubbedLoggerApplication);
    }).not.toThrow();
    expect(Object.keys(schemaBuilder.resolvers).length).toEqual(0);
  });

  test("works with one classes", () => {
    expect(() => {
      manager.registerOperations([TestOp], stubbedLoggerApplication);
    }).not.toThrow();
    expect(Object.keys(schemaBuilder.resolvers).length).toEqual(1);
  });

  test("works with multiple classes", () => {
    expect(() => {
      manager.registerOperations([TestOp, TestOp2], stubbedLoggerApplication);
    }).not.toThrow();
    expect(Object.keys(schemaBuilder.resolvers).length).toEqual(2);
  });

  test("with invalid operation", () => {
    expect(() => {
      maanger.registerOperation(BaseOperation, stubbedLoggerApplication);
    }).toThrow();
  });

  test("with single preExecution()", () => {
    manager.registerOperation(TestOp, stubbedLoggerApplication);
    manager.registerPreHook((root, args, context, operation) => {
      context.id += "bar";
      return [root, args, context, operation];
    });
    expect(schemaBuilder.resolvers["TestOp"](null, null, { id: "foobar" })).resolves.toHaveProperty("id");
  });

  test("with multiple preExecution()", () => {
    manager.registerOperation(TestOp, stubbedLoggerApplication);
    manager.registerPreHook((root, args, context, operation) => {
      context.id += "bar";
      return [root, args, context, operation];
    });
    manager.registerPreHook((root, args, context, operation) => {
      context.id += "derp";
      return [root, args, context, operation];
    });
    expect(schemaBuilder.resolvers["TestOp"](null, null, { id: "foobarderp" })).resolves.toHaveProperty("id");
  });

  test("with preExecution() has operation exposed", () => {
    manager.registerOperation(TestOp, stubbedLoggerApplication);
    manager.registerPreHook((root, args, context, operation) => {
      context.id =  operation.name;
      return [root, args, context, operation];
    });
    expect(schemaBuilder.resolvers["TestOp"](null, null, { id: "TestOp" })).resolves.toHaveProperty("id");
  });

  test("#validateInput() with correct input passes", () => {
    const operation = new ValidationTest();
    expect(manager.validateInput(operation, { id: "good" })).resolves.toHaveProperty("id");
  });

  test("#validateInput() with incorrect input fails", () => {
    const operation = new ValidationTest();
    expect(() => {
      manager.validateInput(operation, { id: "baaaad" })
    }).toThrow();
  });
});