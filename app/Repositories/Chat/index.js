
const Database = use('Database');
const Chat = use('App/Models/Chat');
const UserChat = use('App/Models/UserChat');
const ChatMessage = use('App/Models/ChatMessage');

const ChatSchema = require('../../Schemas/Chat');
const MessageSchema = require('../../Schemas/Message');
const DefaultSchema = require('../../Schemas/Default');
const ContactSchema = require('../../Schemas/Contact');

const { broadcast } = require('../../Common/socket');
const { toSQLDateTime, convertUTCDateToLocalDate } = require('../../Common/date');
const { log } = require('../../Common/logger');

class ChatRepository {

  async fetchChats({ requestingUserId }) {
    const chats = (await Database
      .select('user_chats.chat_id', ' user_chats.user_id', ' user_chats.muted', ' user_chats.blocked', ' user_chats.self_destruct', ' user_chats.deleted_messages', ' user_chats.cleared_date', ' user_chats.read_date', ' user_chats.created_at', ' user_chats.updated_at', ' chats.icon', ' chats.title', ' chats.last_message', ' chats.public_key', ' chats.contacts')
      .from('user_chats')
      .leftJoin('chats', 'user_chats.chat_id', 'chats.id')
      .where('user_id', requestingUserId))
      .map(chat => new ChatSchema({
        chatId: chat.chat_id,
        muted: chat.muted,
        blocked: chat.blocked,
        selfDestruct: chat.self_destruct,
        deletedMessages: chat.deleted_messages,
        clearedDate: chat.cleared_date,
        readDate: chat.read_date,
        icon: chat.icon,
        title: chat.title,
        lastMessage: chat.last_message,
        publicKey: chat.public_key,
        contacts: chat.contacts,
        messages: chat.messages,
        createdAt: chat.created_at,
        updatedAt: chat.updated_at,
      }));
    return { chats };
  }

  async fetchChat({ requestingUserId, requestedChatId }) {
    const chat = (await Database
      .select('user_chats.chat_id', ' user_chats.user_id', ' user_chats.muted', ' user_chats.blocked', ' user_chats.self_destruct', ' user_chats.deleted_messages', ' user_chats.cleared_date', ' user_chats.read_date', ' user_chats.created_at', ' user_chats.updated_at', ' chats.icon', ' chats.title', ' chats.last_message', ' chats.public_key', ' chats.contacts')
      .from('user_chats')
      .leftJoin('chats', 'user_chats.chat_id', 'chats.id')
      .where('user_id', requestingUserId)
      .andWhere('chat_id', requestedChatId)
      .first());
    const chatSchema = new ChatSchema({
      chatId: chat.chat_id,
      muted: chat.muted,
      blocked: chat.blocked,
      selfDestruct: chat.self_destruct,
      deletedMessages: chat.deleted_messages,
      clearedDate: chat.cleared_date,
      readDate: chat.read_date,
      icon: chat.icon,
      title: chat.title,
      lastMessage: chat.last_message,
      publicKey: chat.public_key,
      contacts: chat.contacts,
      messages: chat.messages,
      createdAt: chat.created_at,
      updatedAt: chat.updated_at,
    });
    return { chat: chatSchema };
  }

  async fetchChatContacts({ requestingUserId, requestedChatId }) {
    const chat = (await Chat
      .query()
      .where('id', requestedChatId)
      .first()).toJSON();
    const contactIds = JSON.parse(chat.contacts || '[]');
    if (!Array.isArray(contactIds)) return { contacts: [] };
    const contactsQuery = contactIds.filter(contactId => parseInt(contactId) !== parseInt(requestingUserId));
    const rawContacts = (await Database
      .from('users')
      .where('id', 'in', contactsQuery)
    );
    const contacts = rawContacts.map(contact => new ContactSchema({
      contactId: contact.id,
      icon: contact.profile_img,
      name: `${contact.first_name} ${contact.last_name}`,
      status: contact.status,
      lastSeen: contact.last_seen,
      publicKey: contact.public_key,
    }));
    return { contacts };
  }

  async fetchMessages({ requestedChatId }) {
    const chat = (await Chat
      .query()
      .where('id', requestedChatId)
      .with('messages')
      .first()).toJSON();
    const messages = ((chat || {}).messages || []).map(message => new MessageSchema({
      messageId: message.id,
      chatId: message.chat_id,
      senderId: message.sender_id,
      keyReceiver: message.key_receiver,
      content: message.content,
      backup: message.backup,
      deleted: message.deleted,
      edited: message.edited,
      selfDestruct: message.self_destruct,
      createdAt: message.created_at,
      updatedAt: message.updated_at,
    }));
    return { messages };
  }

  async createChat({ requestingUserId, contacts, title, icon, publicKey }) {
    contacts = [requestingUserId, ...contacts].sort();
    const { chats } = await this.fetchChats({ requestingUserId });

    const existingChat = chats.find(chat =>
      contacts.length === chat.contacts.length &&
      contacts.every((id, index) => id === chat.contacts[index])
    );
    if (existingChat) return { chat: existingChat };

    const chat = new Chat();
    if (title) chat.title = title;
    if (icon) chat.icon = icon;
    if (publicKey) chat.public_key = publicKey;
    chat.contacts = JSON.stringify(contacts);
    await chat.save();

    const chatSchema = new ChatSchema({
      chatId: chat.id,
      contacts,
      title,
      icon,
      publicKey,
      createdAt: chat.created_at,
      updatedAt: chat.updated_at,
    });

    contacts.forEach(async userId => {
      const userChat = new UserChat();
      userChat.chat_id = chat.id;
      userChat.user_id = userId;
      userChat.deleted_messages = '[]';
      await userChat.save();
      this._notifyChatEvent({ userId, action: 'newChat', payload: chatSchema });
    });

    return { chat: chatSchema };
  }

  async updateChat({ requestingUserId, requestedChatId, muted, blocked, markAsRead, selfDestruct }) {
    if (markAsRead) await this._markAsRead({ requestingUserId, requestedChatId });
    if (selfDestruct !== undefined) await this._setSelfDestruct({ requestingUserId, requestedChatId, selfDestruct });
    if (muted !== undefined) await UserChat.query().where('chat_id', requestedChatId).andWhere('user_id', requestingUserId).update({ muted });
    if (blocked !== undefined) await UserChat.query().where('chat_id', requestedChatId).andWhere('user_id', requestingUserId).update({ blocked });
    return new DefaultSchema({ success: true });
  }

  async clearChat({ requestingUserId, requestedChatId }) {
    const clearedDate = toSQLDateTime(new Date());
    await UserChat.query().where('chat_id', requestedChatId).andWhere('user_id', requestingUserId).update({ cleared_date: clearedDate });
    return new DefaultSchema({ success: true });
  }

  async checkChatDestruction({ requestedChatId }) {
    const { messages } = await this.fetchMessages({ requestedChatId });
    const now = new Date(new Date().toISOString().replace("T", " ").split('.')[0]).getTime();
    const timer = 1000 * 60 * 60 * 24;
    const toDelete = [];

    messages
      .filter(message => message.selfDestruct)
      .reverse()
      .some((message, index) => {
        const dateDelta = now - message.createdAt.getTime();
        if (dateDelta > timer) {
          toDelete.push({ index, id: message.messageId });
          return false;
        }
        return true;
      });

    const toDeletePromises = [];
    toDelete.forEach(async ({ index, id }) => {
      messages.splice(index, 1);
      toDeletePromises.push(ChatMessage.query().where('id', id).delete());
    });
    await Promise.all(toDeletePromises);

    this._notifyChatEvent({ chatId: requestedChatId, action: 'deleteMessages', payload: { messages: toDelete, chatId: requestedChatId } });
    return new DefaultSchema({ success: true });
  }

  async sendMessage({ requestingUserId, requestedChatId, backup, content, keyReceiver }) {
    const { chat } = await this.fetchChat({ requestingUserId, requestedChatId });
    const messageData = {
      sender_id: requestingUserId,
      key_receiver: keyReceiver,
      backup: backup,
      content: content,
      self_destruct: chat.selfDestruct,
    };
    const message = await Chat.find(requestedChatId).then(chat => chat.messages().create(messageData));
    const messageSchema = new MessageSchema({
      messageId: message.id,
      chatId: requestedChatId,
      senderId: requestingUserId,
      keyReceiver: message.key_receiver,
      content: message.content,
      backup: message.backup,
      deleted: message.deleted,
      edited: message.edited,
      selfDestruct: message.self_destruct,
      createdAt: message.created_at,
      updatedAt: message.updated_at,
    });
    this._notifyChatEvent({ chatId: requestedChatId, action: 'newMessage', payload: messageSchema });
    return { message: messageSchema };
  }

  async editMessage({ requestingUserId, requestedChatId, requestedMessageId, backup, content, reEncrypting }) {
    const message = await ChatMessage.find(requestedMessageId);
    message.created_at = convertUTCDateToLocalDate(message.created_at);
    message.content = content;
    message.backup = backup;
    message.edited = !reEncrypting;
    await message.save();
    const messageSchema = new MessageSchema({
      messageId: message.id,
      chatId: requestedChatId,
      senderId: requestingUserId,
      content: message.content,
      backup: message.backup,
      deleted: message.deleted,
      edited: message.edited,
      selfDestruct: message.selfDestruct,
      createdAt: message.created_at,
      updatedAt: message.updated_at,
    });
    this._notifyChatEvent({ chatId: requestedChatId, action: 'updateMessage', payload: messageSchema });
    return { message: messageSchema };
  }

  async deleteMessage({ requestingUserId, requestedChatId, requestedMessageId }) {
    const [chat, message] = await Promise.all([
      UserChat.query().where('chat_id', requestedChatId).andWhere('user_id', requestingUserId).first(),
      ChatMessage.find(requestedMessageId)
    ]);
    message.content = '';
    message.deleted = true;
    const messageSchema = new MessageSchema({
      messageId: message.id,
      chatId: requestedChatId,
      senderId: message.sender_id,
      content: message.content,
      backup: message.backup,
      deleted: message.deleted,
      edited: message.edited,
      selfDestruct: message.self_destruct,
      createdAt: message.created_at,
      updatedAt: message.updated_at,
    });
    if (messageSchema.senderId === requestingUserId) {
      await message.save();
      this._notifyChatEvent({ chatId: requestedChatId, action: 'updateMessage', payload: messageSchema });
    }
    else {
      const deletedMessages = JSON.parse(chat.toJSON().deleted_messages);
      const messageId = parseInt(requestedMessageId);
      if (!deletedMessages.includes(messageId)) deletedMessages.push(messageId);
      chat.deleted_messages = JSON.stringify(deletedMessages);
      await chat.save();
    }
    return { message: messageSchema };
  }

  async _markAsRead({ requestingUserId, requestedChatId }) {
    const readDate = toSQLDateTime(new Date());
    await UserChat
      .query()
      .where('chat_id', requestedChatId)
      .andWhere('user_id', requestingUserId)
      .update({ read_date: readDate });
    const payload = {
      userId: requestingUserId,
      chatId: requestedChatId,
      readDate,
      friendReadDate: readDate,
    };
    this._notifyChatEvent({ chatId: requestedChatId, action: 'markAsRead', payload });
  }

  async _setSelfDestruct({ requestingUserId, requestedChatId, selfDestruct }) {
    await UserChat
      .query()
      .where('chat_id', requestedChatId)
      .andWhere('user_id', requestingUserId)
      .update({ self_destruct: selfDestruct });
    await UserChat
      .query()
      .where('chat_id', requestedChatId)
      .andWhere('user_id', '!=', requestingUserId)
      .update({ self_destruct: selfDestruct });
    const payload = {
      userId: requestingUserId,
      chatId: requestedChatId,
      selfDestruct,
    };
    this._notifyChatEvent({ chatId: requestedChatId, action: 'selfDestruct', payload });
  }

  async _fetchContactReadDate({ contactId, requestedChatId }) {
    const contactChat = await UserChat.query().where('chat_id', requestedChatId).andWhere('user_id', contactId).first();
    return contactChat.toJSON().read_date;
  }

  async _notifyChatEvent({ userId, chatId, contactId, action, payload }) {
    if (payload.userId) payload.userId = parseInt(payload.userId);
    if (payload.chatId) payload.chatId = parseInt(payload.chatId);
    if (payload.contactId) payload.contactId = parseInt(payload.contactId);
    const logKey = (userId && `User ${userId}`) || (chatId && `Chat ${chatId}`) || (contactId && `Contacts from User ${contactId}`);
    log('CHAT', `Broadcasting ${action} event to ${logKey} with Payload: ${JSON.stringify(payload)}`);
    if (userId) return broadcast('chat:*', `chat:${userId}`, `chat:${action}`, payload);
    if (chatId) {
      const chat = (await Chat.find(chatId)).toJSON();
      const contacts = JSON.parse(chat.contacts);
      contacts.forEach(contactId => broadcast('chat:*', `chat:${contactId}`, `chat:${action}`, payload));
      return;
    }
    if (contactId) {
      const contacts = (await Database.from('friends').where({ user_id: contactId })).map(contact => contact.friend_id);
      contacts.forEach(contactId => broadcast('chat:*', `chat:${contactId}`, `chat:${action}`, payload));
    }
  }

}

module.exports = new ChatRepository();