# Overview
Sealab-type allows for the creation of extendable GraphQL types with
dependency injection. Also includes a type manager for registering the
 types with a [sealab-schema-builder](1) instance.


# Usage
Create type objects by extending the `BaseType` class.  Configure the
type name and definition in the constructor and define a resolver
function. The helper methods `service`, `logger`, `debug`, `info`, and
`error` will then be available to the resolver.

## BaseType
The base type is an extendable class, which should implement a
`constructor` and `resolver` method.
The constructor should accept the parameter of `application`, and call
the parent constructor, passing it.  The constructor should define the
properties `typeName` and `typeDef`.  The resolver should return an
object that will resolve the typeDef.

## TypeManager
The type manager should be instantiated with a `SchemaBuilder` object
from the [sealab-schema-builder](1) repo.  It has two methods,
`registerType` and `registerTypes`.  The first parameter for these
methods should be a single class definition or array of class
definitions respectively.  The second parameter should be the
application container.

# Example
```
class CoolType extends BaseType {
  constructor(application) {
    super(application);
    this.typeName = "CoolType";
    this.typeDef = `
      type ValidType {
        id: String
        name: String,
        related_resource: [WhateverResource]
      }
    `
  }

  resolver() {
    return {
      id: (value) => {
        return value.id;
      },
      name: (value) => {
        return value.name;
      },
      related_resource: async (value) => {
        this.debug("Fetching related resources by the parent id");
        return await this.service("whatever_resource").getResourcesByRelatedId(value.id);
      }
    }
  }
}
```

# Notes:
Pay attention to the scope of `this`.  The `resolver` is called by an
`execute` function which returns the object of functions.  This is
passed to the SchemaBuilder, which registers it with GraphQL.

The point being, assume you have no idea what calls it. So you need to
ensure the scope of `this` is the class that extends the `BaseType` class.
Either use the arrow operator when defining the resolver, assign `this`
to a variable outside the object definition, ie.
```
resolver(root, args, context) {
  const type = this;
  return {
    foo: function(value) => {
      type.debug("Calling object `this` through variable assigned in outer scope");
    }
  }
}
```

[1]: https://github.com/moilandtoil/sealab-schema-builder