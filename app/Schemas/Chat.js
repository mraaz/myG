
const { forceInt, forceString, forceBoolean, forceArray, forceDate } = require('./Primitives');

class Chat {

  constructor(data) {
    this.chatId = forceInt(data.chatId);
    this.muted = forceBoolean(data.muted);
    this.blocked = forceBoolean(data.blocked);
    this.isPrivate = forceBoolean(data.isPrivate);
    this.selfDestruct = forceBoolean(data.selfDestruct);
    this.deletedMessages = forceArray(data.deletedMessages);
    this.lastCleared = forceInt(data.lastCleared);
    this.lastRead = forceInt(data.lastRead);
    this.lastReads = data.lastReads;
    this.icon = forceString(data.icon);
    this.title = forceString(data.title);
    this.lastMessage = forceString(data.lastMessage);
    this.publicKey = forceString(data.publicKey);
    this.contacts = forceArray(data.contacts);
    this.owners = forceArray(data.owners);
    this.moderators = forceArray(data.moderators);
    this.messages = forceArray(data.messages);
    this.createdAt = forceDate(data.createdAt);
    this.updatedAt = forceDate(data.updatedAt);
  }

}

module.exports = Chat;