const { forceInt, forceString, forceDate } = require('./Primitives')

class ChatNotification {
  constructor(data) {
    this.chatId = forceInt(data.chatId) || forceInt(data.chat_id)
    this.userId = forceInt(data.userId) || forceInt(data.user_id)
    this.senderId = forceInt(data.senderId) || forceInt(data.sender_id)
    this.senderAlias = forceString(data.senderAlias) || forceString(data.sender_alias)
    this.type = forceString(data.type)
    this.content = forceString(data.content)
    this.createdAt = forceDate(data.createdAt)
    this.updatedAt = forceDate(data.updatedAt)
  }
}

module.exports = ChatNotification
