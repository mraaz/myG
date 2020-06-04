const { forceInt, forceString } = require('./Primitives')

class Reaction {
  constructor(data) {
    this.id = forceInt(data.id)
    this.chatId = forceInt(data.chatId)
    this.messageId = forceInt(data.messageId)
    this.reactionId = forceInt(data.reactionId)
    this.senderId = forceInt(data.senderId)
    this.senderName = forceString(data.senderName)
  }
}

module.exports = Reaction
