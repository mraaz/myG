
const { subscribe, unsubscribe, publish } = require('../../Common/nats');
const { log } = require('../../Common/logger');

const CHAT_SUBSCRIPTION = "NATS_CHAT_SUBSCRIPTION";
const TYPE_USER_SENT_MESSAGE = "TYPE_USER_SENT_MESSAGE";

class NatsChatRepository {

  subscribe(natsServer) {
    log('NATS', `Subscribing to Chat`);
    return subscribe(natsServer, CHAT_SUBSCRIPTION, this.onChatPayload);
  }

  unsubscribe() {
    log('NATS', `Unsubscribing from Chat`);
    return unsubscribe(CHAT_SUBSCRIPTION);
  }

  publish(payload) {
    log('NATS', `Publishing to Chat: ${JSON.stringify(payload)}`);
    return publish(CHAT_SUBSCRIPTION, payload);
  }

  onChatPayload = (payload) => {
    log('NATS', `Received from Chat: ${JSON.stringify(payload)}`);
  }

  userSentMessage(message) {
    return this.publish({
      type: TYPE_USER_SENT_MESSAGE,
      payload: { message },
    });
  }

}

module.exports = new NatsChatRepository();
