const nats = require('nats')
let client = null;

function publish(subscription, payload) {
  return client && client.publish(subscription, payload)
}

function subscribe(natsServer, subscription, onPublish) {
  client = nats.connect({ json: true, servers: [natsServer] });
  return client && client.subscribe(subscription, onPublish);
}

function unsubscribe(subscription) {
  return client && client.unsubscribe(subscription)
}

module.exports = {
  publish,
  subscribe,
  unsubscribe,
}
