
const { forceString, forceBoolean } = require('./Primitives');

class Default {

  constructor(data) {
    this.success = forceBoolean(data.success);
    this.error = forceString(data.error);
  }

}

module.exports = Default;