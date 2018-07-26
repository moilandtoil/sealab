"use strict";

class ConnectionManager {
  constructor() {
    this.connections = {};
  }

  register(connName, connInstance) {
    if (this.connections.hasOwnProperty(connName)) {
      throw new Error("Connection already registered");
    }
    return this.connections[connName] = connInstance;
  }

  getConnection(connName) {
    if (!this.connections.hasOwnProperty(connName)) {
      throw new Error("Connection \"${connName}\" not configured");
    }
    return this.connections[connName];
  }
}

module.exports = ConnectionManager;