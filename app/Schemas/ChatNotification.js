const { forceInt, forceString, forceDate, forceBoolean } = require('./Primitives')

class ChatNotification {
  constructor(data) {
    this.id = forceInt(data.id)
    this.chatId = forceInt(data.chatId) || forceInt(data.chat_id)
    this.userId = forceInt(data.userId) || forceInt(data.user_id)
    this.senderId = forceInt(data.senderId) || forceInt(data.sender_id)
    this.senderAlias = forceString(data.senderAlias) || forceString(data.sender_alias)
    this.senderIcon = forceString(data.senderIcon) || forceString(data.sender_icon)
    this.groupTitle = forceString(data.groupTitle) || forceString(data.group_title)
    this.groupIcon = forceString(data.groupIcon) || forceString(data.group_icon)
    this.count = forceInt(data.count)
    this.hasRead = forceBoolean(data.hasRead) || forceBoolean(data.has_read)
    this.type = forceString(data.type)
    this.content = forceString(data.content)
    this.createdAt = forceDate(data.createdAt)
    this.updatedAt = forceDate(data.updatedAt)
  }
}

module.exports = ChatNotification
