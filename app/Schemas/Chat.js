
const { forceInt, forceString, forceBoolean, forceArray, forceDate } = require('./Primitives');

class Chat {

  constructor(data) {
    this.chatId = forceInt(data.chatId);
    this.muted = forceBoolean(data.muted);
    this.blocked = forceBoolean(data.blocked);
    this.selfDestruct = forceBoolean(data.selfDestruct);
    this.deletedMessages = forceArray(data.deletedMessages);
    this.clearedDate = forceDate(data.clearedDate);
    this.readDate = forceDate(data.readDate);
    this.icon = forceString(data.icon);
    this.title = forceString(data.title);
    this.lastMessage = forceString(data.lastMessage);
    this.publicKey = forceString(data.publicKey);
    this.contacts = forceArray(data.contacts);
    this.owners = forceArray(data.owners);
    this.messages = forceArray(data.messages);
    this.createdAt = forceDate(data.createdAt);
    this.updatedAt = forceDate(data.updatedAt);
  }

}

module.exports = Chat;