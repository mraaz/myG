
const { forceStatus, forceBoolean } = require('./Primitives');

class Status {

  constructor(data) {
    this.value = forceStatus(data.value);
    this.locked = forceBoolean(data.locked);
  }

}

module.exports = Status;