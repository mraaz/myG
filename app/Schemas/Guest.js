
const { forceInt, forceString } = require('./Primitives');

class Guest {

  constructor(data) {
    this.guestId = parseInt(data.guestId) ? `Guest #${forceInt(data.guestId)}` : data.guestId;
    this.publicKey = forceString(data.publicKey);
  }

}

module.exports = Guest;