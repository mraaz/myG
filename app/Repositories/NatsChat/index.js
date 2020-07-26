
const uuidv4 = require('uuid/v4');
const { subscribe, unsubscribe, publish } = require('../../Common/nats');
const { log } = require('../../Common/logger');
const WebsocketChatRepository = require('../../Repositories/WebsocketChat');

const CHAT_SUBSCRIPTION = "NATS_CHAT_SUBSCRIPTION";
const TYPE_USER_SENT_MESSAGE = "TYPE_USER_SENT_MESSAGE";
const NATS_PROCESS_ID = uuidv4();

class NatsChatRepository {

  subscribe(natsServer) {
    log('NATS', `Subscribing to Chat`);
    return subscribe(natsServer, CHAT_SUBSCRIPTION, this.onChatPayload);
  }

  unsubscribe() {
    log('NATS', `Unsubscribing from Chat`);
    return unsubscribe(CHAT_SUBSCRIPTION);
  }

  publish(message) {
    log('NATS', `Publishing to Chat: ${message.type}`);
    return publish(CHAT_SUBSCRIPTION, {
      id: NATS_PROCESS_ID,
      type: TYPE_USER_SENT_MESSAGE,
      message,
    });
  }

  onChatPayload = (payload) => {
    if (payload.id === NATS_PROCESS_ID) return;
    const { message: { channelId, id, type, data } } = payload;
    log('NATS', `Received from Chat: ${type}`);
    WebsocketChatRepository.broadcast(channelId, id, type, data);
  }

}

module.exports = new NatsChatRepository();
