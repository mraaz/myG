
const { forceInt, forceDate, forceStatus, forceString } = require('./Primitives');

class Contact {

  constructor(data) {
    this.contactId = forceInt(data.contactId);
    this.icon = forceString(data.icon);
    this.name = forceString(data.name);
    this.status = forceStatus(data.status);
    this.lastSeen = forceDate(data.lastSeen);
    this.publicKey = forceString(data.publicKey);
    this.games = data.games;
  }

}

module.exports = Contact;