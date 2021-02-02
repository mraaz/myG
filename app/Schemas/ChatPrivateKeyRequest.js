const { forceInt, forceString, forceDate } = require('./Primitives')

class ChatPrivateKeyRequest {
  constructor(data) {
    this.chatId = forceInt(data.chatId)
    this.userId = forceInt(data.userId)
    this.guestId = forceInt(data.guestId)
    this.publicKey = forceString(data.publicKey)
    this.createdAt = forceDate(data.createdAt || data.created_at)
    this.updatedAt = forceDate(data.updatedAt || data.updated_at)
  }
}

module.exports = ChatPrivateKeyRequest
