"use strict";

const ModelManager = require("../manager.js");

class TestModel {}

describe("Check that ModelManager", () => {

  let modelManager = null;
  beforeEach(() => {
    modelManager = new ModelManager();
  });

  describe("can get registered model", () => {

    let modelManager = null;
    beforeEach(() => {
      modelManager = new ModelManager();
    });

    test("that exists", () => {
      let model = modelManager.register(TestModel, {});
      expect(modelManager.getModel("test_model")).toEqual(model);
    });

    test("that doesn't exist", () => {
      expect(() => {
        serviceManager.getService("some_service");
      }).toThrow();
    });

  });
});
