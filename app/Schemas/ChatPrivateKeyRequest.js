const { forceInt, forceString, forceDate } = require('./Primitives')

class ChatPrivateKeyRequest {
  constructor(data) {
    this.chatId = forceInt(data.chatId)
    this.userId = forceInt(data.userId)
    this.publicKey = forceString(data.publicKey)
    this.createdAt = forceDate(data.createdAt)
    this.updatedAt = forceDate(data.updatedAt)
  }
}

module.exports = ChatPrivateKeyRequest
