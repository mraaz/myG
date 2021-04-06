
const User = use('App/Models/User');
const { log } = require('../../Common/logger')

class ConnectionRepository {

  connectUser({ requestingUserId }) {
    log('CONNECTION', `User ${requestingUserId} connected`);
    return User.query().where('id', '=', requestingUserId).update({ status: 'online', last_seen: new Date() });
  }

  disconnectUser({ requestingUserId }) {
    log('CONNECTION', `User ${requestingUserId} disconnected`);
    return User.query().where('id', '=', requestingUserId).update({ status: 'offline', last_seen: new Date() });
  }

  disconnectUsers() {
    const lastHour = new Date();
    lastHour.setHours(lastHour.getHours() - 1);
    const lastOnlineAnHourAgo = User.query().where('status', '!=', 'offline').andWhere('last_seen', '<', lastHour);
    return lastOnlineAnHourAgo.update({ status: 'offline' });
  }

}

module.exports = new ConnectionRepository();
