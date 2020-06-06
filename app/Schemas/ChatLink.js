const { forceInt, forceString, forceDate } = require('./Primitives')

class ChatLink {
  constructor(data) {
    this.chatId = forceInt(data.chatId)
    this.uuid = forceString(data.uuid)
    this.expiry = forceInt(data.expiry)
    this.createdAt = forceDate(data.createdAt)
    this.updatedAt = forceDate(data.updatedAt)
  }
}

module.exports = ChatLink
