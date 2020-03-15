
const Database = use('Database');
const User = use('App/Models/User');
const Chat = use('App/Models/Chat');
const UserChat = use('App/Models/UserChat');
const ChatMessage = use('App/Models/ChatMessage');
const ChatLastCleared = use('App/Models/ChatLastCleared');
const ChatLastRead = use('App/Models/ChatLastRead');
const ChatLink = use('App/Models/ChatLink');
const ChatEntryLog = use('App/Models/ChatEntryLog');
const ChatPrivateKeyRequest = use('App/Models/ChatPrivateKeyRequest');

const ChatSchema = require('../../Schemas/Chat');
const ChatLinkSchema = require('../../Schemas/ChatLink');
const ChatEntryLogSchema = require('../../Schemas/ChatEntryLog');
const MessageSchema = require('../../Schemas/Message');
const DefaultSchema = require('../../Schemas/Default');
const ContactSchema = require('../../Schemas/Contact');
const ChatPrivateKeyRequestSchema = require('../../Schemas/ChatPrivateKeyRequest');

const uuidv4 = require('uuid/v4');
const { broadcast } = require('../../Common/socket');
const { log } = require('../../Common/logger');

const MAXIMUM_GROUP_SIZE = 37;

class ChatRepository {

  async fetchChats({ requestingUserId }) {
    const chats = (await Database
      .select('user_chats.chat_id', 'user_chats.user_id', 'user_chats.muted', 'user_chats.blocked', 'user_chats.blocked_users', 'user_chats.self_destruct', 'user_chats.deleted_messages', 'user_chats.created_at', 'user_chats.updated_at', 'chats.isPrivate', 'chats.icon', 'chats.title', 'chats.last_message', 'chats.public_key', 'chats.contacts', 'chats.owners', 'chats.moderators', 'chats.guests', ' chat_last_reads.last_read_message_id', ' chat_last_cleareds.last_cleared_message_id')
      .from('user_chats')
      .leftJoin('chats', 'user_chats.chat_id', 'chats.id')
      .leftJoin('chat_last_reads', function () { this.on('chat_last_reads.chat_id', 'user_chats.chat_id').andOn('chat_last_reads.user_id', 'user_chats.user_id') })
      .leftJoin('chat_last_cleareds', function () { this.on('chat_last_cleareds.chat_id', 'user_chats.chat_id').andOn('chat_last_cleareds.user_id', 'user_chats.user_id') })
      .where('user_chats.user_id', requestingUserId))
      .map(chat => new ChatSchema({
        chatId: chat.chat_id,
        muted: chat.muted,
        blocked: chat.blocked,
        blockedUsers: chat.blocked_users,
        isPrivate: chat.isPrivate,
        selfDestruct: chat.self_destruct,
        deletedMessages: chat.deleted_messages,
        lastRead: chat.last_read_message_id,
        lastCleared: chat.last_cleared_message_id,
        icon: chat.icon,
        title: chat.title,
        lastMessage: chat.last_message,
        publicKey: chat.public_key,
        contacts: chat.contacts,
        guests: chat.guests,
        owners: chat.owners,
        moderators: chat.moderators,
        messages: chat.messages,
        createdAt: chat.created_at,
        updatedAt: chat.updated_at,
      }));
    return { chats };
  }

  async fetchChat({ requestingUserId, requestedChatId }) {
    const chat = (await Database
      .select('user_chats.chat_id', 'user_chats.user_id', 'user_chats.muted', 'user_chats.blocked', 'user_chats.blocked_users', 'user_chats.self_destruct', 'user_chats.deleted_messages', 'user_chats.created_at', 'user_chats.updated_at', 'chats.isPrivate', 'chats.icon', 'chats.title', 'chats.last_message', 'chats.public_key', 'chats.contacts', 'chats.owners', 'chats.moderators', 'chats.guests', ' chat_last_reads.last_read_message_id', ' chat_last_cleareds.last_cleared_message_id')
      .from('user_chats')
      .leftJoin('chats', 'user_chats.chat_id', 'chats.id')
      .leftJoin('chat_last_reads', function () { this.on('chat_last_reads.chat_id', 'user_chats.chat_id').andOn('chat_last_reads.user_id', 'user_chats.user_id') })
      .leftJoin('chat_last_cleareds', function () { this.on('chat_last_cleareds.chat_id', 'user_chats.chat_id').andOn('chat_last_cleareds.user_id', 'user_chats.user_id') })
      .where('user_chats.user_id', requestingUserId)
      .andWhere('user_chats.chat_id', requestedChatId)
      .first());
    const lastReadsObject = {};
    const lastReadsRaw = (await ChatLastRead.query().where('user_id', '!=', requestingUserId).andWhere('chat_id', requestedChatId).fetch()).toJSON();
    lastReadsRaw.forEach(lastRead => lastReadsObject[lastRead.user_id] = lastRead.last_read_message_id);
    const chatSchema = new ChatSchema({
      chatId: chat.chat_id,
      muted: chat.muted,
      blocked: chat.blocked,
      blockedUsers: chat.blocked_users,
      isPrivate: chat.isPrivate,
      selfDestruct: chat.self_destruct,
      deletedMessages: chat.deleted_messages,
      lastRead: chat.last_read_message_id,
      lastCleared: chat.last_cleared_message_id,
      lastReads: lastReadsObject,
      icon: chat.icon,
      title: chat.title,
      lastMessage: chat.last_message,
      publicKey: chat.public_key,
      contacts: chat.contacts,
      guests: chat.guests,
      owners: chat.owners,
      moderators: chat.moderators,
      messages: chat.messages,
      createdAt: chat.created_at,
      updatedAt: chat.updated_at,
    });
    return { chat: chatSchema };
  }

  async fetchMessages({ requestedChatId, requestedPage }) {
    const result = (await ChatMessage
      .query()
      .where('chat_id', requestedChatId)
      .andWhere('key_receiver', null)
      .orderBy('id', 'desc')
      .paginate(requestedPage || 1, 10)).toJSON();
    const messages = result.data.map(message => new MessageSchema({
      messageId: message.id,
      chatId: message.chat_id,
      senderId: message.sender_id,
      keyReceiver: message.key_receiver,
      senderName: message.sender_name,
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

  async fetchEncryptionMessages({ requestingUserId, requestedChatId }) {
    const result = (await ChatMessage
      .query()
      .where('chat_id', requestedChatId)
      .andWhere('key_receiver', requestingUserId)
      .orderBy('id', 'desc')
      .fetch()).toJSON();
    const encryptionMessages = result.map(message => new MessageSchema({
      messageId: message.id,
      chatId: message.chat_id,
      senderId: message.sender_id,
      keyReceiver: message.key_receiver,
      senderName: message.sender_name,
      content: message.content,
      backup: message.backup,
      deleted: message.deleted,
      edited: message.edited,
      selfDestruct: message.self_destruct,
      createdAt: message.created_at,
      updatedAt: message.updated_at,
    }));
    return { encryptionMessages };
  }

  async createChat({ requestingUserId, contacts, owners, title, icon, publicKey }) {
    contacts = [requestingUserId, ...contacts].sort();
    if (contacts.length > MAXIMUM_GROUP_SIZE) throw new Error('Maximum Group Size Reached!');
    const { chats } = await this.fetchChats({ requestingUserId });
    const guests = [];

    const isGroup = contacts.length > 2;
    const existingChat = !isGroup && chats.find(chat =>
      contacts.length === chat.contacts.length &&
      contacts.every((id, index) => id === chat.contacts[index])
    );
    if (existingChat) return { chat: existingChat };

    const chat = new Chat();
    if (title) chat.title = title;
    if (icon) chat.icon = icon;
    if (publicKey) chat.public_key = publicKey;
    chat.contacts = JSON.stringify(contacts || []);
    chat.guests = JSON.stringify(guests || []);
    chat.owners = JSON.stringify(owners || []);
    chat.moderators = JSON.stringify(owners || []);
    await chat.save();

    const chatSchema = new ChatSchema({
      chatId: chat.id,
      contacts,
      guests,
      owners,
      moderators: owners,
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
      userChat.blocked_users = '[]';
      await userChat.save();
    });

    if (contacts.length > 2) {
      [1, 2, 3].forEach(async () => {
        const link = new ChatLink();
        link.chat_id = chat.id;
        link.uuid = uuidv4();
        link.expiry = null;
        await link.save();
      });
    }

    this._notifyChatEvent({ chatId: chat.id, action: 'newChat', payload: chatSchema });
    return { chat: chatSchema };
  }

  async updateChat({ requestingUserId, requestedChatId, icon, title, owners, moderators, muted, blocked, blockedUsers, isPrivate, markAsRead, selfDestruct }) {
    if (markAsRead) await this._markAsRead({ requestingUserId, requestedChatId });
    if (selfDestruct !== undefined) await this._setSelfDestruct({ requestingUserId, requestedChatId, selfDestruct });
    if (muted !== undefined) await UserChat.query().where('chat_id', requestedChatId).andWhere('user_id', requestingUserId).update({ muted });
    if (blocked !== undefined) await UserChat.query().where('chat_id', requestedChatId).andWhere('user_id', requestingUserId).update({ blocked });
    if (blockedUsers !== undefined) await UserChat.query().where('chat_id', requestedChatId).andWhere('user_id', requestingUserId).update({ blocked_users: JSON.stringify(blockedUsers) });
    if (isPrivate !== undefined) await Chat.query().where('id', requestedChatId).update({ isPrivate });
    if (icon !== undefined) await Chat.query().where('id', requestedChatId).update({ icon });
    if (title !== undefined) await Chat.query().where('id', requestedChatId).update({ title });
    if (owners !== undefined) await Chat.query().where('id', requestedChatId).update({ owners: JSON.stringify(owners) });
    if (moderators !== undefined) await Chat.query().where('id', requestedChatId).update({ moderators: JSON.stringify(moderators) });
    if (icon || title || owners || moderators || isPrivate !== undefined) this._notifyChatUpdated({ requestedChatId });
    return new DefaultSchema({ success: true });
  }

  async clearChat({ requestingUserId, requestedChatId }) {
    const lastMessageId = await this._fetchLastMessageId({ requestedChatId });
    if (!lastMessageId) return new DefaultSchema({ success: false });
    const existingLastCleared = (await ChatLastCleared.query().where('chat_id', requestedChatId).andWhere('user_id', requestingUserId).first());
    const lastCleared = existingLastCleared || new ChatLastCleared();
    lastCleared.user_id = requestingUserId;
    lastCleared.chat_id = requestedChatId;
    lastCleared.last_cleared_message_id = lastMessageId;
    await lastCleared.save();
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

    if (!toDelete.length) return new DefaultSchema({ success: false });

    const toDeletePromises = [];
    toDelete.forEach(async ({ index, id }) => {
      messages.splice(index, 1);
      toDeletePromises.push(ChatMessage.query().where('id', id).delete());
    });
    await Promise.all(toDeletePromises);

    this._notifyChatEvent({ chatId: requestedChatId, action: 'deleteMessages', payload: { messages: toDelete, chatId: requestedChatId } });
    return new DefaultSchema({ success: true });
  }

  async fetchChatContacts({ requestingUserId, requestedChatId }) {
    const chat = (await Chat.query().where('id', requestedChatId).first()).toJSON();
    const contactIds = JSON.parse(chat.contacts || '[]');
    if (!Array.isArray(contactIds)) return { contacts: [] };
    const contactsQuery = contactIds.filter(contactId => contactId !== requestingUserId);
    const rawContacts = (await Database
      .from('users')
      .where('id', 'in', contactsQuery)
    );
    const contacts = rawContacts.map(contact => new ContactSchema({
      contactId: contact.id,
      icon: contact.profile_img,
      name: contact.alias,
      status: contact.status,
      lastSeen: contact.last_seen,
      publicKey: contact.public_key,
    }));
    return { contacts };
  }

  async deleteChat({ requestingUserId, requestedChatId }) {
    const chatModel = (await Chat.query().where('id', requestedChatId).first());
    const chat = chatModel.toJSON();
    const contacts = JSON.parse(chat.contacts || '[]');
    const owners = JSON.parse(chat.owners || '[]');
    if (!owners.includes(requestingUserId)) throw new Error('Only Owners can Delete Chat');
    await chatModel.delete();
    contacts.forEach(userId => this._notifyChatEvent({ userId, action: 'deleteChat', payload: { chatId: requestedChatId } }));
    return new DefaultSchema({ success: true });
  }

  async exitGroup({ requestingUserId, requestedChatId, requestedUserId }) {
    const userToRemove = parseInt(requestedUserId || requestingUserId);
    const { chat } = await this.fetchChatInfo({ requestedChatId });
    const isKickingGuest = chat.guests.includes(userToRemove);
    if (requestedUserId && !isKickingGuest && !chat.moderators.includes(parseInt(requestingUserId))) throw new Error('Only Moderators can Kick Users.');
    const contacts = chat.contacts.filter(contactId => parseInt(contactId) !== parseInt(userToRemove));
    const moderators = chat.moderators.filter(contactId => parseInt(contactId) !== parseInt(userToRemove));
    const guests = chat.guests.filter(contactId => parseInt(contactId) !== parseInt(userToRemove));
    await Chat.query().where('id', requestedChatId).update({ contacts: JSON.stringify(contacts), moderators: JSON.stringify(moderators), guests: JSON.stringify(guests) });
    !isKickingGuest && await UserChat.query().where('chat_id', requestedChatId).andWhere('user_id', userToRemove).delete();
    const alias = isKickingGuest ? `Guest #${userToRemove}` : (await User.query().where('id', '=', userToRemove).first()).toJSON().alias;
    const entryLog = await this._insertEntryLog(requestedChatId, alias, !!requestedUserId, !requestedUserId, false, false);
    chat.contacts.forEach(userId => this._notifyChatEvent({ userId, action: isKickingGuest ? 'guestLeft' : 'userLeft', payload: { userId: userToRemove, guestId: userToRemove, chatId: requestedChatId, entryLog } }));
    chat.guests.forEach(guestId => this._notifyChatEvent({ guestId, action: isKickingGuest ? 'guestLeft' : 'userLeft', payload: { userId: userToRemove, guestId: userToRemove, chatId: requestedChatId, entryLog } }));
    return new DefaultSchema({ success: true });
  }

  async addContactsToChat({ requestedChatId, contacts, fromLink }) {
    const { chat } = await this.fetchChatInfo({ requestedChatId });
    if (chat.contacts.length < 3) throw new Error('Cannot add users to a normal chat.');
    const diffContacts = contacts.filter(contactId => !chat.contacts.includes(contactId));
    if (!diffContacts.length) return { error: 'Contacts are Already in Chat.' };
    contacts.forEach(contactId => !chat.contacts.includes(contactId) && chat.contacts.push(contactId));
    if (chat.contacts.length > MAXIMUM_GROUP_SIZE) throw new Error('Maximum Group Size Reached!');
    contacts.forEach(async userId => {
      const userChat = new UserChat();
      userChat.chat_id = chat.chatId;
      userChat.user_id = userId;
      userChat.deleted_messages = '[]';
      userChat.blocked_users = '[]';
      await userChat.save();
    });
    await Chat.query().where('id', requestedChatId).update({ contacts: JSON.stringify(chat.contacts) });
    const rawContacts = (await Database.from('users').where('id', 'in', contacts));
    const fullContacts = rawContacts.map(contact => new ContactSchema({
      contactId: contact.id,
      icon: contact.profile_img,
      name: contact.alias,
      status: contact.status,
      lastSeen: contact.last_seen,
      publicKey: contact.public_key,
    }));
    const joinedUsers = fullContacts.filter(contact => contacts.includes(contact.contactId));
    const logRequests = joinedUsers.map(contact => this._insertEntryLog(requestedChatId, contact.name, false, false, !fromLink, fromLink));
    const entryLogs = await Promise.all(logRequests);
    chat.entryLogs = [...chat.entryLogs, entryLogs];
    this._notifyChatEvent({ chatId: requestedChatId, action: 'newChat', payload: chat });
    this._notifyChatEvent({ chatId: requestedChatId, action: 'userJoined', payload: { contacts: fullContacts, chatId: requestedChatId, entryLog: entryLogs[0] } });
    return { contacts: fullContacts };
  }

  async sendMessage({ requestingUserId, requestedChatId, senderName, backup, content, keyReceiver }) {
    const { chat } = await this.fetchChat({ requestingUserId, requestedChatId });
    const messageData = {
      sender_id: requestingUserId,
      key_receiver: keyReceiver,
      sender_name: senderName,
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
      senderName: message.sender_name,
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
    message.content = content;
    message.backup = backup;
    message.edited = !reEncrypting;
    await message.save();
    const messageSchema = new MessageSchema({
      messageId: message.id,
      chatId: requestedChatId,
      senderId: requestingUserId,
      senderName: message.sender_name,
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
      senderName: message.sender_name,
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

  async setTyping({ requestingUserId, requestedChatId, isTyping }) {
    this._notifyChatEvent({ chatId: requestedChatId, action: 'typing', payload: { userId: requestingUserId, chatId: requestedChatId, isTyping } });
    return new DefaultSchema({ success: true });
  }

  async fetchChatInfo({ requestedChatId }) {
    const chat = await Chat.find(requestedChatId);
    const chatSchema = new ChatSchema({
      chatId: chat.id,
      blocked: chat.blocked,
      isPrivate: chat.isPrivate,
      icon: chat.icon,
      title: chat.title,
      lastMessage: chat.last_message,
      publicKey: chat.public_key,
      contacts: chat.contacts,
      guests: chat.guests,
      owners: chat.owners,
      moderators: chat.moderators,
      createdAt: chat.created_at,
      updatedAt: chat.updated_at,
    });
    return { chat: chatSchema };
  }

  async fetchLink({ requestedLinkUuid }) {
    const response = (await ChatLink.query().where('uuid', requestedLinkUuid).first());
    if (!response) return { link: null };
    const rawLink = response.toJSON();
    const link = new ChatLinkSchema({
      chatId: rawLink.chat_id,
      uuid: rawLink.uuid,
      expiry: rawLink.expiry,
      createdAt: rawLink.created_at,
      updatedAt: rawLink.updated_at,
    });
    return { link };
  }

  async fetchLinks({ requestedChatId }) {
    const rawLinks = (await ChatLink.query().where('chat_id', requestedChatId).fetch()).toJSON();
    const links = rawLinks.map(link => new ChatLinkSchema({
      chatId: link.chat_id,
      uuid: link.uuid,
      expiry: link.expiry,
      createdAt: link.created_at,
      updatedAt: link.updated_at,
    }));
    return { links };
  }

  async updateLink({ requestedChatId, requestedLinkUuid, expiry, expire }) {
    const rawLink = (await ChatLink.query().where('chat_id', requestedChatId).andWhere('uuid', requestedLinkUuid).first()).toJSON();
    const link = new ChatLinkSchema({
      chatId: rawLink.chat_id,
      uuid: rawLink.uuid,
      expiry: rawLink.expiry,
      createdAt: rawLink.created_at,
      updatedAt: rawLink.updated_at,
    });
    if (expiry !== undefined) {
      await ChatLink.query().where('id', rawLink.id).update({ expiry });
      link.expiry = expiry;
      return { link };
    }
    if (expire) {
      const uuid = uuidv4();
      await ChatLink.query().where('id', rawLink.id).update({ uuid, expiry: null });
      link.uuid = uuid;
      link.expiry = null;
      return { link };
    }
  }

  async fetchEntryLogs({ requestedChatId }) {
    const rawEntryLogs = (await ChatEntryLog.query().where('chat_id', requestedChatId).fetch()).toJSON();
    const entryLogs = rawEntryLogs.map(entryLog => new ChatEntryLogSchema({
      id: entryLog.id,
      chatId: entryLog.chat_id,
      alias: entryLog.alias,
      kicked: entryLog.kicked,
      left: entryLog.left,
      invited: entryLog.invited,
      link: entryLog.link,
      createdAt: entryLog.created_at,
      updatedAt: entryLog.updated_at,
    }));
    return { entryLogs };
  }

  async fetchGroupPrivateKeyRequests({ chatId }) {
    const rawRequests = (await ChatPrivateKeyRequest.query().where('chat_id', chatId).fetch()).toJSON();
    const requests = rawRequests.map(request => new ChatPrivateKeyRequestSchema({
      chatId: request.chat_id,
      userId: request.user_id,
      publicKey: request.public_key,
      createdAt: request.created_at,
      updatedAt: request.updated_at,
    }));
    return { requests };
  }

  async requestGroupPrivateKey({ userId, chatId, publicKey }) {
    const request = new ChatPrivateKeyRequest();
    request.user_id = userId;
    request.chat_id = chatId;
    request.public_key = publicKey;
    await request.save();
    return new DefaultSchema({ success: true });
  }

  async confirmGroupPrivateKey({ userId, chatId }) {
    await ChatPrivateKeyRequest.query().where('user_id', userId).andWhere('chat_id', chatId).delete();
    return new DefaultSchema({ success: true });
  }

  async _insertEntryLog(requestedChatId, alias, kicked, left, invited, link) {
    const entryLog = new ChatEntryLog();
    entryLog.chat_id = requestedChatId;
    entryLog.alias = alias;
    entryLog.kicked = kicked;
    entryLog.left = left;
    entryLog.invited = invited;
    entryLog.link = link;
    await entryLog.save();
    return new ChatEntryLogSchema({
      id: entryLog.id,
      chatId: entryLog.chat_id,
      alias: entryLog.alias,
      kicked: entryLog.kicked,
      left: entryLog.left,
      invited: entryLog.invited,
      link: entryLog.link,
      createdAt: entryLog.created_at,
      updatedAt: entryLog.updated_at,
    });
  }

  async _fetchLastMessageId({ requestedChatId }) {
    const result = await Database
      .max('id as last_id')
      .from('chat_messages')
      .where('chat_id', requestedChatId);
    return result ? result[0] ? result[0].last_id : null : null;
  }

  async _markAsRead({ requestingUserId, requestedChatId }) {
    const lastMessageId = await this._fetchLastMessageId({ requestedChatId });
    if (!lastMessageId) return new DefaultSchema({ success: false });
    const existingLastRead = (await ChatLastRead.query().where('chat_id', requestedChatId).andWhere('user_id', requestingUserId).first());
    const lastRead = existingLastRead || new ChatLastRead();
    lastRead.user_id = requestingUserId;
    lastRead.chat_id = requestedChatId;
    lastRead.last_read_message_id = lastMessageId;
    await lastRead.save();
    const payload = {
      userId: requestingUserId,
      chatId: requestedChatId,
      lastRead: lastMessageId,
    };
    this._notifyChatEvent({ chatId: requestedChatId, action: 'markAsRead', payload });
    return new DefaultSchema({ success: true });
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

  async _notifyChatUpdated({ requestedChatId }) {
    const chat = (await Chat.query().where('id', requestedChatId).first()).toJSON();
    const chatSchema = new ChatSchema({
      chatId: chat.id,
      icon: chat.icon,
      title: chat.title,
      contacts: chat.contacts,
      guests: chat.guests,
      owners: chat.owners,
      moderators: chat.moderators,
      isPrivate: chat.isPrivate,
    });
    this._notifyChatEvent({ chatId: requestedChatId, action: 'chatUpdated', payload: chatSchema });
  }

  async _notifyChatEvent({ userId, guestId, chatId, contactId, action, payload }) {
    if (payload.userId) payload.userId = parseInt(payload.userId);
    if (payload.chatId) payload.chatId = parseInt(payload.chatId);
    if (payload.contactId) payload.contactId = parseInt(payload.contactId);
    const logKey = (userId && `User ${userId}`) || (chatId && `Chat ${chatId}`) || (contactId && `Contacts from User ${contactId}`);
    log('CHAT', `Broadcasting ${action} event to ${logKey} with Payload: ${JSON.stringify(payload)}`);
    if (userId) return broadcast('chat:*', `chat:${userId}`, `chat:${action}`, payload);
    if (guestId) return broadcast('chat:*', `chat:${guestId}:guest`, `chat:${action}`, payload);
    if (chatId) {
      const chat = (await Chat.find(chatId)).toJSON();
      const contacts = JSON.parse(chat.contacts);
      const guests = JSON.parse(chat.guests);
      contacts.forEach(contactId => broadcast('chat:*', `chat:${contactId}`, `chat:${action}`, payload));
      guests.forEach(guestId => broadcast('chat:*', `chat:${guestId}:guest`, `chat:${action}`, payload));
      return;
    }
    if (contactId) {
      const contacts = (await Database.from('friends').where({ user_id: contactId })).map(contact => contact.friend_id);
      contacts.forEach(contactId => broadcast('chat:*', `chat:${contactId}`, `chat:${action}`, payload));
    }
  }

}

module.exports = new ChatRepository();