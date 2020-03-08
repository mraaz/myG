
const { forceInt, forceString } = require('./Primitives');

class Guest {

  constructor(data) {
    this.guestId = forceInt(data.guestId);
    this.guestName = `Guest #${forceInt(data.guestId)}`;
    this.publicKey = forceString(data.publicKey);
  }

}

module.exports = Guest;