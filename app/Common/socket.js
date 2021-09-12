const Ws = use('Ws')

function broadcast(channelId, id, type, data) {
  const channel = Ws.getChannel(channelId)
  if (!channel) return

  const topic = channel.topic(id)
  if (!topic) return

  topic.broadcastToAll(`event`, {
    type,
    data
  })
}

module.exports = { broadcast }
