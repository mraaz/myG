
const { forceInt, forceString, forceDate, forceBoolean } = require('./Primitives');

class ChatEntryLog {

  constructor(data) {
    this.id = forceInt(data.id);
    this.chatId = forceInt(data.chatId);
    this.alias = forceString(data.alias);
    this.kicked = forceBoolean(data.kicked);
    this.left = forceBoolean(data.left);
    this.invited = forceBoolean(data.invited);
    this.link = forceBoolean(data.link);
    this.createdAt = forceDate(data.createdAt);
    this.updatedAt = forceDate(data.updatedAt);
  }

}

module.exports = ChatEntryLog;