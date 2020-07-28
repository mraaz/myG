
class WebsocketChatRepository {
  async broadcast(channelId, id, type, data) {
    const { broadcast } = require('../../Common/socket');
    return broadcast(channelId, id, type, data);
  }
}

module.exports = new WebsocketChatRepository();
