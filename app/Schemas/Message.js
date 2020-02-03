
const { forceInt, forceString, forceBoolean, forceDate } = require('./Primitives');

class Message {

  constructor(data) {
    this.messageId = forceInt(data.messageId);
    this.chatId = forceInt(data.chatId);
    this.senderId = forceInt(data.senderId);
    this.keyReceiver = forceInt(data.keyReceiver);
    this.content = forceString(data.content);
    this.backup = forceString(data.backup);
    this.deleted = forceBoolean(data.deleted);
    this.edited = forceBoolean(data.edited);
    this.selfDestruct = forceBoolean(data.selfDestruct);
    this.createdAt = forceDate(data.createdAt);
    this.updatedAt = forceDate(data.updatedAt);
  }

}

module.exports = Message;