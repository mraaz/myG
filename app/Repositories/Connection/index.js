
const User = use('App/Models/User');
const ChatRepository = require('../Chat');
const { log } = require('../../Common/logger')

class ConnectionRepository {

  connectUser({ requestingUserId }) {
    log('CONNECTION', `User ${requestingUserId} connected`);
    ChatRepository.notifyActiveNow(requestingUserId, true);
    return User.query().where('id', '=', requestingUserId).update({ status: 'online', last_seen: new Date() });
  }

  disconnectUser({ requestingUserId }) {
    log('CONNECTION', `User ${requestingUserId} disconnected`);
    ChatRepository.notifyActiveNow(requestingUserId, false);
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
