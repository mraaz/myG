const { forceInt, forceString, forceBoolean, forceDate, forceArray } = require('./Primitives')

class Message {
  constructor(data) {
    this.messageId = forceInt(data.messageId)
    this.chatId = forceInt(data.chatId)
    this.senderId = forceInt(data.senderId)
    this.keyReceiver = forceInt(data.keyReceiver)
    this.senderName = forceString(data.senderName)
    this.content = forceString(data.content)
    this.unencryptedContent = forceString(data.unencryptedContent)
    this.backup = forceString(data.backup)
    this.deleted = forceBoolean(data.deleted)
    this.edited = forceBoolean(data.edited)
    this.reactions = forceArray(data.reactions)
    this.isReply = forceInt(data.isReply)
    this.replyId = forceInt(data.replyId)
    this.replyContent = forceString(data.replyContent)
    this.replyBackup = forceString(data.replyBackup)
    this.selfDestruct = forceBoolean(data.selfDestruct)
    this.isAttachment = forceBoolean(data.isAttachment)
    this.createdAt = forceDate(data.createdAt)
    this.updatedAt = forceDate(data.updatedAt)
  }
}

module.exports = Message
