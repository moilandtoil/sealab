"use strict";

class TypeManager {
  constructor(schemaBuilder) {
    this.schemaBuilder = schemaBuilder;
  }

  registerType(typeClass, application) {
    if (!application) {
      throw new Error("Application container must be passed");
    }

    const typeInstance = new typeClass(application);

    if (!typeInstance.typeName || typeInstance.typeName.length == 0) {
      throw new Error("Type must have a name");
    }

    if (!typeInstance.typeDef || typeInstance.typeDef.length == 0) {
      throw new Error("Type must have a definition");
    }

    if (!typeInstance.resolverOverwritten()) {
      throw new Error("Type must have a resolver");
    }

    const resolver = typeInstance.resolver();
    for (let property in resolver) {
      if (!resolver.hasOwnProperty(property)) {
        continue;
      }
      if (resolver[property] instanceof Function) {
        resolver[property] = resolver[property].bind(typeInstance);
      }
    }

    this.schemaBuilder.addType(
      typeInstance.typeName,
      typeInstance.typeDef,
      resolver
    );
  }

  registerTypes(typeClasses, application) {
    for(let typeClass of typeClasses) {
      this.registerType(typeClass, application);
    }
  }
}

module.exports = TypeManager;