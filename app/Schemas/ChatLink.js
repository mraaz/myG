const { forceInt, forceString, forceDate } = require('./Primitives')

class ChatLink {
  constructor(data) {
    this.chatId = forceInt(data.chatId)
    this.uuid = forceString(data.uuid)
    this.expiry = forceInt(data.expiry)
    this.createdAt = forceDate(data.createdAt || data.created_at)
    this.updatedAt = forceDate(data.updatedAt || data.updated_at)
  }
}

module.exports = ChatLink
