
const moment = require('moment');

const Database = use('Database');
const User = use('App/Models/User');
const Chat = use('App/Models/Chat');
const UserChat = use('App/Models/UserChat');
const UserChatNotification = use('App/Models/UserChatNotification');
const ChatMessage = use('App/Models/ChatMessage');
const ChatRecentMessage = use('App/Models/ChatRecentMessage');
const ChatMessageReaction = use('App/Models/ChatMessageReaction');
const ChatLastCleared = use('App/Models/ChatLastCleared');
const ChatLastRead = use('App/Models/ChatLastRead');
const ChatLink = use('App/Models/ChatLink');
const ChatEntryLog = use('App/Models/ChatEntryLog');
const ChatPrivateKeyRequest = use('App/Models/ChatPrivateKeyRequest');
const ChatGameMessageSchedule = use('App/Models/ChatGameMessageSchedule');
const ChatBlockedUser = use('App/Models/ChatBlockedUser');
const Guest = use('App/Models/Guest');
const FavoriteGame = use('App/Models/FavoriteGame');
const Notification = use('App/Models/Notification');

const AwsKeyController = use('App/Controllers/Http/AwsKeyController');
const RedisRepository = require('../../Repositories/Redis');
const NatsChatRepository = require('../../Repositories/NatsChat');
const WebsocketChatRepository = require('../../Repositories/WebsocketChat');

const UserSchema = require('../../Schemas/User');
const ChatSchema = require('../../Schemas/Chat');
const ChatLinkSchema = require('../../Schemas/ChatLink');
const ChatEntryLogSchema = require('../../Schemas/ChatEntryLog');
const GuestSchema = require('../../Schemas/Guest');
const GameSchema = require('../../Schemas/Game');
const MessageSchema = require('../../Schemas/Message');
const ReactionSchema = require('../../Schemas/Reaction');
const DefaultSchema = require('../../Schemas/Default');
const ContactSchema = require('../../Schemas/Contact');
const ChatPrivateKeyRequestSchema = require('../../Schemas/ChatPrivateKeyRequest');
const ChatNotificationSchema = require('../../Schemas/ChatNotification');

const { v4: uuidv4 } = require('uuid');;
const { log } = require('../../Common/logger');

const MAXIMUM_GROUP_SIZE = 37;

class ChatRepository {
  async fetchChats({ requestingUserId, onlyGroups }) {
    const chatsQuery = await Database
      .select('user_chats.chat_id', 'user_chats.user_id', 'user_chats.muted', 'chats.self_destruct', 'user_chats.deleted_messages', 'user_chats.created_at', 'user_chats.updated_at', 'chats.isPrivate', 'chats.isGroup', 'chats.icon', 'chats.title', 'chats.public_key', 'chats.contacts', 'chats.owners', 'chats.moderators', 'chats.guests', 'chats.individual_game_id', 'chats.game_id', 'chats.game_message', 'chat_last_reads.last_read_message_id', ' chat_last_cleareds.last_cleared_message_id')
      .from('user_chats')
      .leftJoin('chats', 'user_chats.chat_id', 'chats.id')
      .leftJoin('chat_last_reads', function () { this.on('chat_last_reads.chat_id', 'user_chats.chat_id').andOn('chat_last_reads.user_id', 'user_chats.user_id') })
      .leftJoin('chat_last_cleareds', function () { this.on('chat_last_cleareds.chat_id', 'user_chats.chat_id').andOn('chat_last_cleareds.user_id', 'user_chats.user_id') })
      .where('user_chats.user_id', requestingUserId);
    if (onlyGroups) chatsQuery.andWhere('chats.isGroup', true);
    const chats = await chatsQuery.map(chat => new ChatSchema({
      chatId: chat.chat_id,
      muted: chat.muted,
      isPrivate: chat.isPrivate,
      isGroup: chat.isGroup,
      gameId: chat.game_id,
      gameMessage: chat.game_message,
      individualGameId: chat.individual_game_id,
      selfDestruct: chat.self_destruct,
      deletedMessages: chat.deleted_messages,
      lastRead: chat.last_read_message_id,
      lastCleared: chat.last_cleared_message_id,
      icon: chat.icon,
      title: chat.title,
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
      .select('user_chats.chat_id', 'user_chats.user_id', 'user_chats.muted', 'chats.self_destruct', 'user_chats.deleted_messages', 'user_chats.created_at', 'user_chats.updated_at', 'chats.isPrivate', 'chats.isGroup', 'chats.icon', 'chats.title', 'chats.public_key', 'chats.contacts', 'chats.owners', 'chats.moderators', 'chats.guests', 'chats.individual_game_id', 'chats.game_id', 'chats.game_message', 'chat_last_reads.last_read_message_id', ' chat_last_cleareds.last_cleared_message_id')
      .from('user_chats')
      .leftJoin('chats', 'user_chats.chat_id', 'chats.id')
      .leftJoin('chat_last_reads', function () { this.on('chat_last_reads.chat_id', 'user_chats.chat_id').andOn('chat_last_reads.user_id', 'user_chats.user_id') })
      .leftJoin('chat_last_cleareds', function () { this.on('chat_last_cleareds.chat_id', 'user_chats.chat_id').andOn('chat_last_cleareds.user_id', 'user_chats.user_id') })
      .where('user_chats.user_id', requestingUserId)
      .andWhere('user_chats.chat_id', requestedChatId)
      .first());
    if (!chat) return { chat: 'NOT_FOUND' };
    const lastReadsObject = {};
    const lastReadsRaw = (await ChatLastRead.query().where('user_id', '!=', requestingUserId).andWhere('chat_id', requestedChatId).fetch()).toJSON();
    lastReadsRaw.forEach(lastRead => lastReadsObject[lastRead.user_id] = lastRead.last_read_message_id);
    const chatSchema = new ChatSchema({
      chatId: chat.chat_id,
      muted: chat.muted,
      isPrivate: chat.isPrivate,
      isGroup: chat.isGroup,
      gameId: chat.game_id,
      gameMessage: chat.game_message,
      individualGameId: chat.individual_game_id,
      selfDestruct: chat.self_destruct,
      deletedMessages: chat.deleted_messages,
      lastRead: chat.last_read_message_id,
      lastCleared: chat.last_cleared_message_id,
      lastReads: lastReadsObject,
      icon: chat.icon,
      title: chat.title,
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

  async fetchChannel({ requestedChannelId }) {
    let channel = (await Database.from('chats').where('channel_id', requestedChannelId).first());
    if (!channel) {
      channel = new Chat();
      channel.channel_id = requestedChannelId;
      channel.contacts = JSON.stringify([]);
      channel.guests = JSON.stringify([]);
      channel.owners = JSON.stringify([]);
      channel.moderators = JSON.stringify([]);
      channel.self_destruct = false;
      channel.isPrivate = false;
      channel.isGroup = false;
      await channel.save();
    }
    const { messages } = await this.fetchMessages({ requestedChatId: channel.id });
    const chatSchema = new ChatSchema({
      messages,
      chatId: channel.id,
      channelId: requestedChannelId,
      muted: channel.muted,
      isPrivate: channel.isPrivate,
      isGroup: channel.isGroup,
      gameId: channel.game_id,
      gameMessage: channel.game_message,
      individualGameId: channel.individual_game_id,
      selfDestruct: channel.self_destruct,
      deletedMessages: channel.deleted_messages,
      lastRead: channel.last_read_message_id,
      lastCleared: channel.last_cleared_message_id,
      icon: channel.icon,
      title: channel.title,
      publicKey: channel.public_key,
      contacts: channel.contacts,
      guests: channel.guests,
      owners: channel.owners,
      moderators: channel.moderators,
      createdAt: channel.created_at,
      updatedAt: channel.updated_at,
    });
    return { chat: chatSchema };
  }

  async fetchMessages({ requestedChatId, requestedMessageIds, requestedPage }) {
    let query = ChatMessage.query()
    if (requestedMessageIds) {
      query = query.where('chat_messages.id', 'in', requestedMessageIds).orderBy('chat_messages.id', 'desc').fetch();
    } else {
      query = query.where('chat_messages.chat_id', requestedChatId)
      .andWhere('chat_messages.key_receiver', null)
      .orderBy('chat_messages.id', 'desc');
      if (requestedPage === "ALL") query = query.fetch();
      else query = query.paginate(requestedPage || 1, 10);
    }
    const result = (await query).toJSON();
    const reactionData = requestedChatId && await ChatMessageReaction.query().where('chat_id', requestedChatId).fetch();
    const chatReactions = reactionData ? reactionData.toJSON() : [];
    const messages = (result.data ? result.data : result).map(message => {
      const messageReactions = chatReactions
        .filter(reaction => reaction.message_id === message.id)
        .map(reaction => new ReactionSchema({
          id: reaction.id,
          chatId: message.chat_id,
          messageId: message.id,
          uuid: message.uuid,
          reactionId: reaction.reaction_id,
          senderId: reaction.sender_id,
          senderName: reaction.sender_name,
        }));
      return new MessageSchema({
        messageId: message.id,
        uuid: message.uuid,
        chatId: message.chat_id,
        senderId: message.sender_id,
        keyReceiver: message.key_receiver,
        senderName: message.sender_name,
        title: message.title,
        unencryptedContent: message.unencrypted_content,
        content: message.content,
        backup: message.backup,
        deleted: message.deleted,
        edited: message.edited,
        selfDestruct: message.self_destruct,
        isAttachment: message.is_attachment,
        isReply: !!message.replyId,
        replyId: message.reply_id,
        replyContent: message.reply_content,
        replyBackup: message.reply_backup,
        reactions: messageReactions,
        createdAt: message.created_at,
        updatedAt: message.updated_at,
      })
    });
    return { messages };
  }

  async fetchUnreadMessages({ requestingUserId, count }) {
    if (count) {
      const unreadMessages = await this.countNotifications({ requestingUserId });
      return { unreadMessages };
    }
    const { chats } = await this.fetchChats({ requestingUserId });
    const lastReadsRaw = await ChatLastRead.query().where('user_id', requestingUserId).fetch();
    if (!lastReadsRaw) return { unreadMessages: [] };
    const lastReads = lastReadsRaw.toJSON();
    const lastReadId = (chatId) => (lastReads.find(lastRead => lastRead.chat_id === chatId) || {}).last_read_message_id;
    const unreadMessages = [];
    const requests = chats.map(async chat => ({ lastReadId: lastReadId(chat.chatId), message: await this.fetchLastMessage({ requestedChatId: chat.chatId }) }));
    const responses = await Promise.all(requests);
    responses.forEach(response => {
      const { lastReadId, message } = response;
      if (!message) return;
      if (!lastReadId || (parseInt(message.id) > parseInt(lastReadId))) unreadMessages.push(new MessageSchema({
        messageId: message.id,
        uuid: message.uuid,
        chatId: message.chat_id,
        senderId: message.sender_id,
        keyReceiver: message.key_receiver,
        senderName: message.sender_name,
        title: message.title,
        unencryptedContent: message.unencrypted_content,
        content: message.content,
        backup: message.backup,
        deleted: message.deleted,
        edited: message.edited,
        selfDestruct: message.self_destruct,
        isAttachment: message.is_attachment,
        isReply: !!message.replyId,
        replyId: message.reply_id,
        replyContent: message.reply_content,
        replyBackup: message.reply_backup,
        createdAt: message.created_at,
        updatedAt: message.updated_at,
      }));
    });

    return { unreadMessages };
  }

  async countNotifications({ requestingUserId }) {
    const response = await Database
      .from('user_chat_notifications')
      .where({ 'user_id': requestingUserId })
      .andWhere({ 'has_read': 0 })
      .count();
    return response[0]['count(*)'];
  }

  async countLastMessages({ requestingUserId }) {
    const response = await Database.raw(`
      select (
        select count(*)
        from chat_messages
        where chat_id = chat_last_reads.chat_id
        and id > chat_last_reads.last_read_message_id
      ) as unread_count
      from chat_last_reads
      where user_id = ?
   `, requestingUserId);
   const unreadMessages = response[0].map((result) => result.unread_count);
    return !!unreadMessages ? unreadMessages.reduce((prv, cur) => prv + cur, 0) : 0;
  }

  async fetchLastMessage({ requestedChatId }) {
    const lastMessageRaw = await ChatMessage.query()
      .whereNull('key_receiver')
      .andWhere('chat_id', requestedChatId)
      .orderBy('id', 'desc')
      .limit(1).first();
    return lastMessageRaw && lastMessageRaw.toJSON();
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
      uuid: message.uuid,
      chatId: message.chat_id,
      senderId: message.sender_id,
      keyReceiver: message.key_receiver,
      senderName: message.sender_name,
      title: message.title,
      unencryptedContent: message.unencrypted_content,
      content: message.content,
      backup: message.backup,
      deleted: message.deleted,
      edited: message.edited,
      selfDestruct: message.self_destruct,
      isAttachment: message.is_attachment,
      isReply: !!message.replyId,
      replyId: message.reply_id,
      replyContent: message.reply_content,
      replyBackup: message.reply_backup,
      createdAt: message.created_at,
      updatedAt: message.updated_at,
    }));
    return { encryptionMessages };
  }

  async createChat({ requestingUserId, contacts, owners, title, icon, publicKey, isGroup, individualGameId, gameId, gameSchedule }) {
    contacts = [...new Set([requestingUserId, ...contacts])].sort();
    if (contacts.length > MAXIMUM_GROUP_SIZE) throw new Error('Maximum Group Size Reached!');
    const { chats } = await this.fetchChats({ requestingUserId });
    const guests = [];

    const existingChat = !isGroup && chats.find(chat => contacts.every((id, index) => id === chat.contacts[index]));
    if (existingChat && !existingChat.isGroup) return { chat: existingChat };

    const existingGameChat = individualGameId && chats.find(chat => chat.individualGameId === individualGameId);
    if (existingGameChat) {
      const requestedChatId = existingGameChat.chatId;
      const { contacts: fullContacts } = await this.addContactsToChat({ requestedChatId, contacts });
      existingGameChat.fullContacts = fullContacts;
      existingGameChat.contacts = [...new Set([...existingGameChat.contacts, ...contacts])].sort();
      return { chat: existingGameChat }
    }

    let gameMessage = null;
    if (individualGameId) {
      const game = await Database.select('schedule_games.id', 'schedule_games.start_date_time', 'schedule_games.game_names_id', 'schedule_games.accept_msg', 'game_names.id', 'game_names.game_name')
        .from('schedule_games')
        .leftJoin('game_names', 'game_names.id', 'schedule_games.game_names_id')
        .where('schedule_games.id', individualGameId)
        .first()
      if (!game) throw new Error('Game not found!');
      const gameName = game.game_name;
      gameSchedule = game.start_date_time;
      title = `${gameName} (${moment(gameSchedule).format('YYYY-MM-DD HH:mm:ss')})`;
      gameMessage = game.accept_msg;
    }

    const forceSelfDestruct = (await User.query().where('id', '=', requestingUserId).first()).toJSON().chat_auto_self_destruct;

    const chat = new Chat();
    if (title) chat.title = title;
    if (icon) chat.icon = icon;
    if (publicKey) chat.public_key = publicKey;
    chat.isGroup = isGroup;
    chat.individual_game_id = individualGameId;
    chat.game_id = gameId;
    chat.game_message = gameMessage;
    chat.contacts = JSON.stringify(contacts || []);
    chat.guests = JSON.stringify(guests || []);
    chat.owners = JSON.stringify(owners || []);
    chat.moderators = JSON.stringify(owners || []);
    chat.self_destruct = !!forceSelfDestruct || !!individualGameId;
    await chat.save();

    const { contacts: fullContacts } = await this.fetchChatContactsByIds({ requestingUserId, contactIds: contacts });
    const chatSchema = new ChatSchema({
      chatId: chat.id,
      contacts,
      fullContacts,
      guests,
      owners,
      moderators: owners,
      title,
      icon,
      publicKey,
      isGroup,
      individualGameId,
      gameId,
      gameMessage,
      createdAt: chat.created_at,
      updatedAt: chat.updated_at,
    });

    for (const userId of contacts) {
      const userChat = new UserChat();
      userChat.chat_id = chat.id;
      userChat.user_id = userId;
      userChat.deleted_messages = '[]';
      await userChat.save();
    }

    if (isGroup) {
      const createLink = async () => {
        const link = new ChatLink();
        link.chat_id = chat.id;
        link.uuid = uuidv4();
        link.expiry = null;
        await link.save();
      };
      await createLink();
      await createLink();
      await createLink();
    }

    if (individualGameId) {
      await this.scheduleGameMessage({ chatId: chat.id, schedule: gameSchedule });
      await this._setSelfDestruct({ requestedChatId: chat.id, selfDestruct: true });
    }

    this._notifyChatEvent({ chatId: chat.id, action: 'newChat', payload: chatSchema });
    return { chat: chatSchema };
  }

  async fetchBlockedUsers({ requestingUserId }) {
    const blockedUsersRaw = await Database
      .select('blocked_user_id', 'alias')
      .from('chat_blocked_users')
      .leftJoin('users', 'chat_blocked_users.blocked_user_id', 'users.id')
      .where('user_id', requestingUserId);
    if (!blockedUsersRaw) return { blockedUsers: [] };
    const blockedUsers = blockedUsersRaw.map(user => new UserSchema({ userId: user.blocked_user_id, alias: user.alias }));
    return { blockedUsers };
  }

  async blockUser({ requestingUserId, requestedUserId }) {
    const existingBlockedUser = await ChatBlockedUser.query().where('user_id', requestingUserId).andWhere('blocked_user_id', requestedUserId).first();
    if (existingBlockedUser) return this.fetchBlockedUsers({ requestingUserId });
    const blockedUser = new ChatBlockedUser();
    blockedUser.user_id = requestingUserId;
    blockedUser.blocked_user_id = requestedUserId;
    await blockedUser.save();
    return this.fetchBlockedUsers({ requestingUserId });
  }

  async unblockUser({ requestingUserId, requestedUserId }) {
    const existingBlockedUser = await ChatBlockedUser.query().where('user_id', requestingUserId).andWhere('blocked_user_id', requestedUserId).first();
    if (!existingBlockedUser) return this.fetchBlockedUsers({ requestingUserId });
    await existingBlockedUser.delete();
    return this.fetchBlockedUsers({ requestingUserId });
  }

  async updateChat({ requestingUserId, requestedChatId, icon, title, owners, moderators, muted, isPrivate, markAsRead, selfDestruct, publicKey}) {
    if (markAsRead) await this._markAsRead({ requestingUserId, requestedChatId });
    if (selfDestruct !== undefined) return await this._setSelfDestruct({ requestingUserId, requestedChatId, selfDestruct });
    if (muted !== undefined) await UserChat.query().where('chat_id', requestedChatId).andWhere('user_id', requestingUserId).update({ muted });
    if (isPrivate !== undefined) await Chat.query().where('id', requestedChatId).update({ isPrivate });
    if (icon !== undefined) await Chat.query().where('id', requestedChatId).update({ icon });
    if (title !== undefined) await Chat.query().where('id', requestedChatId).update({ title });
    if (owners !== undefined) await Chat.query().where('id', requestedChatId).update({ owners: JSON.stringify(owners) });
    if (publicKey !== undefined) await Chat.query().where('id', requestedChatId).update({ public_key: publicKey });
    if (moderators !== undefined) {
      await this._addChatNotificationModerator({ requestingUserId, requestedChatId, moderators });
      await Chat.query().where('id', requestedChatId).update({ moderators: JSON.stringify(moderators) });
    }
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
    const chatResponse = (await Chat.query().where('id', requestedChatId).first());
    if (!chatResponse) return { contacts: [] }
    const chat = chatResponse.toJSON();
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

  async fetchChatContactsByIds({ requestingUserId, contactIds }) {
    if (!Array.isArray(contactIds)) return { contacts: [] };
    const contactsQuery = contactIds.filter(contactId => contactId !== requestingUserId);
    const rawContacts = await Database.from('users').where('id', 'in', contactsQuery);
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

  async deleteChat({ requestingUserId, requestedChatId, forceDelete }) {
    const chatModel = (await Chat.query().where('id', requestedChatId).first());
    const chat = chatModel.toJSON();
    const contacts = JSON.parse(chat.contacts || '[]');
    const guests = JSON.parse(chat.guests || '[]');
    const owners = JSON.parse(chat.owners || '[]');
    if (!forceDelete && !owners.includes(requestingUserId)) throw new Error('Only Owners can Delete Chat');
    const keyController = new AwsKeyController();
    await keyController.removeChatGroupProfileKey(requestedChatId);
    await keyController.removeChatAttachmentKey(requestedChatId);
    await chatModel.delete();
    await Notification.query().where('chat_id', requestedChatId).delete();
    contacts.forEach(userId => this._notifyChatEvent({ userId, action: 'deleteChat', payload: { chatId: requestedChatId } }));
    guests.forEach(guestId => this._notifyChatEvent({ guestId, action: 'deleteChat', payload: { chatId: requestedChatId } }));
    return new DefaultSchema({ success: true });
  }

  async searchGroup({ requestingUserId, groupName, requestedPage }) {
    const query = Database
      .select('user_chats.chat_id', 'user_chats.user_id', 'user_chats.muted', 'chats.self_destruct', 'user_chats.deleted_messages', 'user_chats.created_at', 'user_chats.updated_at', 'chats.isPrivate', 'chats.isGroup', 'chats.icon', 'chats.title', 'chats.public_key', 'chats.contacts', 'chats.owners', 'chats.moderators', 'chats.guests', 'chats.individual_game_id', 'chats.game_id', 'chats.game_message')
      .from('user_chats')
      .leftJoin('chats', 'user_chats.chat_id', 'chats.id')
      .where('user_chats.user_id', requestingUserId)
      .andWhere('chats.isGroup', true);
    if (groupName) query.andWhere('title', 'like', '%' + groupName + '%');
    if (requestedPage !== "ALL") query.offset((requestedPage || 0) * 10).limit(10);
    const results = await query;
    if (!results) return { groups: [] };
    const groups = results.toJSON ? results.toJSON() : results.map(chat => new ChatSchema({
      chatId: chat.chat_id,
      muted: chat.muted,
      isPrivate: chat.isPrivate,
      isGroup: chat.isGroup,
      gameId: chat.game_id,
      gameMessage: chat.game_message,
      individualGameId: chat.individual_game_id,
      selfDestruct: chat.self_destruct,
      deletedMessages: chat.deleted_messages,
      lastRead: chat.last_read_message_id,
      lastCleared: chat.last_cleared_message_id,
      icon: chat.icon,
      title: chat.title,
      publicKey: chat.public_key,
      contacts: chat.contacts,
      guests: chat.guests,
      owners: chat.owners,
      moderators: chat.moderators,
      messages: chat.messages,
      createdAt: chat.created_at,
      updatedAt: chat.updated_at,
    }));
    return { groups };
  }

  async fetchContactsPaginated({ requestingUserId, requestedPage, status, search }) {
    let query = Database.from('friends')
      .innerJoin('users', 'users.id', 'friends.friend_id')
      .where({ user_id: requestingUserId })
    if (status) query = query.andWhere({  status: status })
    if (search) query = query.andWhere('alias', 'like', `%${search}%`)
    const results = await query.offset(requestedPage * 10).limit(10);
    if (!results) return { contacts: [] };
    const contacts = results.map(contact => new ContactSchema({
      contactId: contact.friend_id,
      icon: contact.profile_img,
      name: contact.alias,
      status: contact.status,
      lastSeen: contact.last_seen,
      publicKey: contact.public_key,
    }));
    const count = status ? (await Database.from('friends').innerJoin('users', 'users.id', 'friends.friend_id').where({ user_id: requestingUserId }).andWhere({ status }).count())[0]['count(*)'] : 0
    return { contacts, count };
  }

  async fetchContactsByGame({ requestingUserId, status, gameId }) {
    const query = Database
    .select('friends.friend_id', 'users.profile_img', 'users.alias', 'users.status', 'users.last_seen', 'users.public_key')
    .from('game_experiences')
    .leftJoin('friends', 'friends.friend_id', 'game_experiences.user_id')
    .leftJoin('users', 'users.id', 'friends.friend_id')
    .where('friends.user_id', requestingUserId)
    .andWhere('game_experiences.game_names_id', gameId)
    .andWhere('users.status', status)
    .union([
      Database
      .select('friends.friend_id', 'users.profile_img', 'users.alias', 'users.status', 'users.last_seen', 'users.public_key')
      .from('esports_experiences')
      .leftJoin('friends', 'friends.friend_id', 'esports_experiences.user_id')
      .leftJoin('users', 'users.id', 'friends.friend_id')
      .where('friends.user_id', requestingUserId)
      .andWhere('esports_experiences.game_names_id', gameId)
      .andWhere('users.status', status)
    ]);
    const results = await query;
    if (!results) return { contacts: [] };
    const contacts = results.map(contact => new ContactSchema({
      contactId: contact.friend_id,
      icon: contact.profile_img,
      name: contact.alias,
      status: contact.status,
      lastSeen: contact.last_seen,
      publicKey: contact.public_key,
    }));
    return { contacts };
  }

  async fetchGroupsPaginated({ requestingUserId, requestedPage, gameId, search }) {
    let query = Database
      .select('user_chats.chat_id', 'user_chats.user_id', 'user_chats.muted', 'chats.self_destruct', 'user_chats.deleted_messages', 'user_chats.created_at', 'user_chats.updated_at', 'chats.isPrivate', 'chats.isGroup', 'chats.icon', 'chats.title', 'chats.public_key', 'chats.contacts', 'chats.owners', 'chats.moderators', 'chats.guests', 'chats.individual_game_id', 'chats.game_id', 'chats.game_message')
      .from('user_chats')
      .leftJoin('chats', 'user_chats.chat_id', 'chats.id')
      .where('user_chats.user_id', requestingUserId)
      .andWhere('chats.isGroup', true)
    if (search) query = query.andWhere('chats.title', 'like', `%${search}%`)
    if (gameId) query = query.andWhere('chats.game_id', gameId)
    const results = await query.offset(requestedPage * 10).limit(10);
    if (!results) return { groups: [] };
    const groups = results.toJSON ? results.toJSON() : results.map(chat => new ChatSchema({
      chatId: chat.chat_id,
      muted: chat.muted,
      isPrivate: chat.isPrivate,
      isGroup: chat.isGroup,
      gameId: chat.game_id,
      gameMessage: chat.game_message,
      individualGameId: chat.individual_game_id,
      selfDestruct: chat.self_destruct,
      deletedMessages: chat.deleted_messages,
      lastRead: chat.last_read_message_id,
      lastCleared: chat.last_cleared_message_id,
      icon: chat.icon,
      title: chat.title,
      publicKey: chat.public_key,
      contacts: chat.contacts,
      guests: chat.guests,
      owners: chat.owners,
      moderators: chat.moderators,
      messages: chat.messages,
      createdAt: chat.created_at,
      updatedAt: chat.updated_at,
    }));
    return { groups };
  }

  async fetchGamesPaginated({ requestingUserId, requestedPage, search }) {
    let esportsQuery = Database
      .select('esports_experiences.user_id', 'game_names.user_id as owner_id', 'game_names_id', 'game_name', 'game_img')
      .from('esports_experiences')
      .leftJoin('game_names', 'game_names.id', 'esports_experiences.game_names_id')
      .where('esports_experiences.user_id', requestingUserId)

      let experiencesQuery = Database
      .select('game_experiences.user_id', 'game_names.user_id as owner_id', 'game_names_id', 'game_name', 'game_img')
      .from('game_experiences')
      .leftJoin('game_names', 'game_names.id', 'game_experiences.game_names_id')
      .where('game_experiences.user_id', requestingUserId)

    if (search) {
      esportsQuery = esportsQuery.andWhere('game_names.game_name', 'like', `%${search}%`)
      experiencesQuery = experiencesQuery.andWhere('game_names.game_name', 'like', `%${search}%`)
    }

    const query = esportsQuery.union(experiencesQuery)
    const rawGames = await query.offset(requestedPage * 10).limit(10);
    const games = rawGames.map(game => new GameSchema({ gameId: game.game_names_id, userId: game.user_id, ownerId: game.owner_id, name: game.game_name, icon: game.game_img }));
    const favoriteGamesRaw = await FavoriteGame.query().where('user_id', requestingUserId).fetch();
    const favoriteGames = (favoriteGamesRaw && favoriteGamesRaw.toJSON()) || [];
    games.forEach(game => game.isFavorite = favoriteGames.find(favorite => favorite.game_names_id === game.gameId));
    return { games };
  }

  async searchPaginated({ requestingUserId, requestedPage, search }) {
    const contactsRequest = this.fetchContactsPaginated({ requestingUserId, requestedPage, search })
    const groupsRequest = this.fetchGroupsPaginated({ requestingUserId, requestedPage, search })
    const gamesRequest = this.fetchGamesPaginated({ requestingUserId, requestedPage, search })
    const { contacts } = await contactsRequest;
    const { groups } = await groupsRequest;
    const { games } = await gamesRequest;
    return { contacts, groups, games }
  }

  async fetchChatNotifications({ requestingUserId, requestedPage, requestedType }) {
    let query = UserChatNotification.query().where({ 'user_id': requestingUserId });
    if (requestedType !== "ALL") query = query.andWhere('type', 'in', requestedType.split(','));
    if (requestedPage === "ALL") query = query.fetch();
    else query = query.paginate(requestedPage || 1, 10);
    const result = (await query).toJSON();
    const notifications = (result.data ? result.data : result).map(notification => new ChatNotificationSchema(notification));
    return { notifications };
  }

  async markChatNotificationAsRead({ requestingUserId, id }) {
    if (id === 'ALL') await UserChatNotification.query().where('user_id', requestingUserId).update({ has_read: true });
    await UserChatNotification.query().where('id', id).update({ has_read: true });
    const { unreadMessages: chats } = await this.fetchUnreadMessages({ requestingUserId, count: true })
    await this.publishNotifications({ userId: requestingUserId, notifications: { chats } })
    return new DefaultSchema({ success: true });
  }

  async deleteChatNotifications({ requestingUserId }) {
    await UserChatNotification.query().where('user_id', requestingUserId).delete();
    const { unreadMessages: chats } = await this.fetchUnreadMessages({ requestingUserId, count: true })
    await this.publishNotifications({ userId: requestingUserId, notifications: { chats } })
    return new DefaultSchema({ success: true });
  }

  async exitGroup({ requestingUserId, requestedChatId, requestedUserId }) {
    const userToRemove = parseInt(requestedUserId || requestingUserId);
    const { chat } = await this.fetchChatInfo({ requestedChatId });
    const isKickingGuest = chat.guests.includes(userToRemove);
    if (requestedUserId && !isKickingGuest && !chat.moderators.includes(parseInt(requestingUserId))) throw new Error('Only Moderators can Kick Users.');
    const contacts = chat.contacts.filter(contactId => parseInt(contactId) !== parseInt(userToRemove));
    if (!contacts.length) return this.deleteChat({ requestingUserId, requestedChatId, forceDelete: true });
    const isOwner = chat.owners.find(contactId => parseInt(contactId) === parseInt(userToRemove));
    const owners = chat.owners.filter(contactId => parseInt(contactId) !== parseInt(userToRemove));
    const moderators = chat.moderators.filter(contactId => parseInt(contactId) !== parseInt(userToRemove));
    const guests = chat.guests.filter(contactId => parseInt(contactId) !== parseInt(userToRemove));
    if (isOwner) owners.push(moderators[0] || contacts[0]);
    if (isOwner && !moderators.includes(owners[0])) moderators.push(owners[0]);
    await Chat.query().where('id', requestedChatId).update({ contacts: JSON.stringify(contacts), moderators: JSON.stringify(moderators), guests: JSON.stringify(guests), owners: JSON.stringify(owners) });
    !isKickingGuest && await UserChat.query().where('chat_id', requestedChatId).andWhere('user_id', userToRemove).delete();
    const alias = isKickingGuest ? `Guest #${userToRemove}` : (await User.query().where('id', '=', userToRemove).first()).toJSON().alias;
    const entryLog = await this._insertEntryLog(requestedChatId, alias, !!requestedUserId, !requestedUserId, false, false);
    if (requestedUserId && !isKickingGuest) this._addChatNotificationKicked({ requestingUserId, requestedUserId, chat });
    chat.contacts.forEach(userId => this._notifyChatEvent({ userId, action: isKickingGuest ? 'guestLeft' : 'userLeft', payload: { userId: userToRemove, guestId: userToRemove, chatId: requestedChatId, entryLog } }));
    chat.guests.forEach(guestId => this._notifyChatEvent({ guestId, action: isKickingGuest ? 'guestLeft' : 'userLeft', payload: { userId: userToRemove, guestId: userToRemove, chatId: requestedChatId, entryLog } }));
    if (isKickingGuest) {
      const guest = await Guest.find(userToRemove);
      return new GuestSchema({ publicKey: guest.public_key, uuid: guest.uuid, guestId: guest.id });
    }
    return new DefaultSchema({ success: true });
  }

  async addContactsToChat({ requestedChatId, contacts, fromLink }) {
    const { chat } = await this.fetchChatInfo({ requestedChatId });
    if (!chat.isGroup) throw new Error('Cannot add users to a normal chat.');
    const diffContacts = contacts.filter(contactId => !chat.contacts.includes(contactId));
    if (!diffContacts.length) return { error: 'Contacts are Already in Chat.' };
    diffContacts.forEach(contactId => !chat.contacts.includes(contactId) && chat.contacts.push(contactId));
    if (chat.contacts.length > MAXIMUM_GROUP_SIZE) throw new Error('Maximum Group Size Reached!');
    diffContacts.forEach(async userId => {
      const userChat = new UserChat();
      userChat.chat_id = chat.chatId;
      userChat.user_id = userId;
      userChat.deleted_messages = '[]';
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
    const joinedUsers = fullContacts.filter(contact => diffContacts.includes(contact.contactId));
    const logRequests = joinedUsers.map(contact => this._insertEntryLog(requestedChatId, contact.name, false, false, !fromLink, fromLink));
    const entryLogs = await Promise.all(logRequests);
    chat.entryLogs = [...chat.entryLogs, entryLogs];
    this._notifyChatEvent({ chatId: requestedChatId, action: 'newChat', payload: chat });
    this._notifyChatEvent({ chatId: requestedChatId, action: 'userJoined', payload: { contacts: fullContacts, chatId: requestedChatId, entryLog: entryLogs[0] } });
    return { contacts: fullContacts };
  }

  async sendMessage({ requestingUserId, requestedChatId, senderName, backup, content, keyReceiver, attachment, replyId, replyContent, replyBackup, uuid, forceSelfDestruct }) {
    const { chat } = await this.fetchChat({ requestingUserId, requestedChatId });
    const { contacts } = chat.isGroup ? { contacts: [] } : await this.fetchChatContacts({ requestingUserId, requestedChatId });
    const contact = contacts.find(contact => contact.contactId !== requestingUserId) || {};
    const messageData = {
      uuid,
      sender_id: requestingUserId,
      key_receiver: keyReceiver,
      sender_name: senderName,
      title: chat.isGroup ? chat.title : contact.name || senderName,
      backup: backup,
      content: content,
      attachment: attachment,
      self_destruct: chat.selfDestruct || forceSelfDestruct,
      is_attachment: !!attachment,
      reply_id: replyId,
      reply_content: replyContent,
      reply_backup: replyBackup,
    };
    const message = await Chat.find(requestedChatId).then(chat => chat.messages().create(messageData));
    const messageSchema = new MessageSchema({
      messageId: message.id,
      uuid: message.uuid,
      chatId: requestedChatId,
      senderId: requestingUserId,
      keyReceiver: message.key_receiver,
      senderName: message.sender_name,
      title: message.title,
      unencryptedContent: message.unencrypted_content,
      content: message.content,
      backup: message.backup,
      deleted: message.deleted,
      edited: message.edited,
      selfDestruct: message.self_destruct,
      isAttachment: message.is_attachment,
      isReply: !!message.replyId,
      replyId: message.reply_id,
      replyContent: message.reply_content,
      replyBackup: message.reply_backup,
      createdAt: message.created_at,
      updatedAt: message.updated_at,
    });
    this._notifyChatEvent({ chatId: requestedChatId, action: 'newMessage', payload: messageSchema });
    if (!chat.isGroup) this._addChatNotificationMessage({ requestingUserId, requestedChatId, chat, content });
    else if (!message.key_receiver) this._addChatGroupNotificationMessage({ requestingUserId, requestedChatId, chat, content });
    this.saveRecentMessage(messageSchema);
    return { message: messageSchema };
  }

  async fetchRecentMessages({ requestingUserId }) {
    const chats = await Database.select('chat_id').from('user_chats').where('user_chats.user_id', requestingUserId);
    const chatIds = (chats || []).map(chat => chat.chat_id);
    const recentMessages = await ChatRecentMessage.query().where('chat_id', 'in', chatIds).fetch();
    const requestedMessageIds = ((recentMessages && recentMessages.toJSON()) || []).map(recentMessage => recentMessage.message_id);
    return this.fetchMessages({ requestedMessageIds });
  }

  async saveRecentMessage(message) {
    if (message.keyReceiver) return;
    await ChatRecentMessage.query().where({ chat_id: message.chatId }).delete();
    const recentMessage = new ChatRecentMessage()
    recentMessage.chat_id = message.chatId;
    recentMessage.message_id = message.messageId;
    return recentMessage.save();
  }

  async sendMessageFromMyGToUser({ requestingUserId, requestedUserId, content }) {
    const { chat } = await this.createChat({ requestingUserId, contacts: [requestedUserId] });
    return this.sendMessageFromMyG({ requestedChatId: chat.chatId, content });
  }

  async publishOnMainChannel(content) {
    const { chat } = await this.fetchChannel({ requestedChannelId: 'main' })
    await this.sendMessageFromMyG({ requestedChatId: chat.chatId, content })
  }

  async sendMessageFromMyG({ requestedChatId, content }) {
    const messageData = {
      sender_id: 0,
      sender_name: "myG",
      title: 'myG',
      backup: '',
      content: '',
      unencrypted_content: content,
    };
    const message = await Chat.find(requestedChatId).then(chat => chat.messages().create(messageData));
    const messageSchema = new MessageSchema({
      messageId: message.id,
      uuid: message.uuid,
      chatId: message.chat_id,
      senderId: message.sender_id,
      title: message.title,
      keyReceiver: message.key_receiver,
      title: message.sender_name,
      senderName: messageData.sender_name,
      unencryptedContent: message.unencrypted_content,
      createdAt: message.created_at,
      updatedAt: message.updated_at,
    });
    this._notifyChatEvent({ chatId: requestedChatId, action: 'newMessage', payload: messageSchema });
    return { message: messageSchema };
  }

  async editMessage({ requestingUserId, requestedChatId, requestedMessageId, backup, content, reEncrypting }) {
    const message = await ChatMessage.find(requestedMessageId);
    if (content) message.content = content;
    if (backup) message.backup = backup;
    message.edited = !reEncrypting;
    await message.save();
    const messageSchema = new MessageSchema({
      messageId: message.id,
      uuid: message.uuid,
      chatId: requestedChatId,
      senderId: requestingUserId,
      senderName: message.sender_name,
      title: message.title,
      unencryptedContent: message.unencrypted_content,
      content: message.content,
      backup: message.backup,
      deleted: message.deleted,
      edited: message.edited,
      selfDestruct: message.selfDestruct,
      isAttachment: message.is_attachment,
      isReply: !!message.replyId,
      replyId: message.reply_id,
      replyContent: message.reply_content,
      replyBackup: message.reply_backup,
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
      uuid: message.uuid,
      chatId: requestedChatId,
      senderId: message.sender_id,
      senderName: message.sender_name,
      title: message.title,
      unencryptedContent: message.unencrypted_content,
      content: message.content,
      backup: message.backup,
      deleted: message.deleted,
      edited: message.edited,
      selfDestruct: message.self_destruct,
      isAttachment: message.is_attachment,
      isReply: !!message.replyId,
      replyId: message.reply_id,
      replyContent: message.reply_content,
      replyBackup: message.reply_backup,
      createdAt: message.created_at,
      updatedAt: message.updated_at,
    });
    const security_check = await Database.from('admins').where({ user_id: requestingUserId, permission_level: 1 }).first();
    const isAdmin = security_check != undefined ? true : false;
    if (isAdmin || messageSchema.senderId === requestingUserId) {
      await new AwsKeyController().removeChatAttachmentKey(requestedChatId, requestedMessageId);
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

  async fetchReaction({ requestingUserId, messageId, reactionId }) {
    return ChatMessageReaction.query().where('message_id', messageId).andWhere('sender_id', requestingUserId).andWhere('reaction_id', reactionId).first();
  }

  async addReaction({ requestingUserId, chatId, messageId, reactionId, senderName }) {
    const existingReaction = await this.fetchReaction({ requestingUserId, messageId, reactionId });
    if (existingReaction) return new DefaultSchema({ success: false, error: 'REACTION_ALREADY_PRESENT' });
    if (!senderName) senderName = (await User.query().where('id', '=', requestingUserId).first()).toJSON().alias;
    const reactionData = new ChatMessageReaction();
    reactionData.chat_id = chatId;
    reactionData.message_id = messageId;
    reactionData.reaction_id = reactionId;
    reactionData.sender_name = senderName;
    reactionData.sender_id = requestingUserId;
    await reactionData.save();
    const reaction = new ReactionSchema({ id: reactionData.id, chatId, messageId, reactionId, senderName, senderId: requestingUserId });
    this._notifyChatEvent({ chatId, action: 'reactionAdded', payload: reaction });
    return new DefaultSchema({ success: true });
  }

  async removeReaction({ requestingUserId, chatId, messageId, reactionId }) {
    const existingReaction = await this.fetchReaction({ requestingUserId, messageId, reactionId });
    if (!existingReaction) return new DefaultSchema({ success: false, error: 'REACTION_NOT_PRESENT' });
    await existingReaction.delete();
    const reactionData = existingReaction.toJSON();
    const reaction = new ReactionSchema({ id: reactionData.id, chatId, messageId, reactionId, senderName: reactionData.sender_name, senderId: requestingUserId });
    this._notifyChatEvent({ chatId, action: 'reactionRemoved', payload: reaction });
    return new DefaultSchema({ success: true });
  }

  async setTyping({ requestingUserId, requestedChatId, isTyping }) {
    const senderName = (await User.query().where('id', '=', requestingUserId).first()).toJSON().alias;
    this._notifyChatEvent({ chatId: requestedChatId, action: 'typing', payload: { userId: requestingUserId, chatId: requestedChatId, isTyping, senderName } });
    return new DefaultSchema({ success: true });
  }

  async fetchChatInfo({ requestedChatId }) {
    const chat = await Chat.find(requestedChatId);
    const chatSchema = new ChatSchema({
      chatId: chat.id,
      isPrivate: chat.isPrivate,
      isGroup: chat.isGroup,
      gameId: chat.game_id,
      gameMessage: chat.game_message,
      individualGameId: chat.individual_game_id,
      icon: chat.icon,
      title: chat.title,
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
      guestId: request.guest_id,
      publicKey: request.public_key,
      createdAt: request.created_at,
      updatedAt: request.updated_at,
    }));
    return { requests };
  }

  async requestGroupPrivateKey({ userId, guestId, chatId, publicKey }) {
    const request = new ChatPrivateKeyRequest();
    request.user_id = userId;
    request.guest_id = guestId;
    request.chat_id = chatId;
    request.public_key = publicKey;
    await request.save();
    return new DefaultSchema({ success: true });
  }

  async confirmGroupPrivateKey({ userId, guestId, chatId }) {
    if (userId) await ChatPrivateKeyRequest.query().where('user_id', userId).andWhere('chat_id', chatId).delete();
    if (guestId) await ChatPrivateKeyRequest.query().where('guest_id', guestId).andWhere('chat_id', chatId).delete();
    return new DefaultSchema({ success: true });
  }

  async acceptGameGroupInvitation({ requestedUserId, requestedGameId }) {
    const { chat } = await this.fetchChatByGameId({ requestedGameId });
    await this.addContactsToChat({ requestedChatId: chat.chatId, contacts: [requestedUserId] });
    return new DefaultSchema({ success: true });
  }

  async fetchChatByGameId({ requestedGameId }) {
    const chat = (await Chat.query().where('game_id', requestedGameId).first()).toJSON();
    const chatSchema = new ChatSchema({
      chatId: chat.id,
      isPrivate: chat.isPrivate,
      isGroup: chat.isGroup,
      gameId: chat.game_id,
      gameMessage: chat.game_message,
      individualGameId: chat.individual_game_id,
      icon: chat.icon,
      title: chat.title,
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

  async fetchChatByIndividualGameId({ requestingUserId, requestedGameId }) {
    let chat = null;
    const response = (await Chat.query().where('individual_game_id', requestedGameId).first());
    if (!response) {
      const attendees = await Database.from('attendees').where('schedule_games_id', requestedGameId).select(['user_id']);
      const userIds = attendees.map(({ user_id }) => user_id);
      const games = await Database
        .from('schedule_games')
        .leftJoin('game_names', 'schedule_games.game_names_id', 'game_names.id')
        .where('schedule_games.id', requestedGameId)
        .select(['schedule_games.user_id', 'game_names.game_name', 'game_names.game_name_fields_img', 'game_names.id', 'schedule_games.start_date_time']);
      const game = games[0];
      const owner = game.user_id;
      const title = game.game_name;
      const icon = game.game_name_fields_img;
      const contacts = userIds;
      const owners = [owner];
      const isGroup = true;
      const individualGameId = requestedGameId;
      const gameId = game.id;
      const gameSchedule = game.start_date_time;
      const created = await this.createChat({ requestingUserId: owner, contacts, owners, title, icon, isGroup, individualGameId, gameId, gameSchedule });
      chat = created.chat;
    } else {
      chat = response.toJSON();
      if (!chat.contacts.includes(requestingUserId)) {
        await this.addContactsToChat({ requestedChatId: chat.id, contacts: [requestingUserId] });
      }
    }
    const chatSchema = new ChatSchema({
      chatId: chat.id,
      isPrivate: chat.isPrivate,
      isGroup: chat.isGroup,
      gameId: chat.game_id,
      gameMessage: chat.game_message,
      individualGameId: chat.individual_game_id,
      icon: chat.icon,
      title: chat.title,
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

  async scheduleGameMessage({ chatId, schedule }) {
    const gameMessageSchedule = new ChatGameMessageSchedule();
    gameMessageSchedule.chat_id = chatId;
    gameMessageSchedule.schedule = schedule;
    await gameMessageSchedule.save();
    await RedisRepository.updateGameMessageSchedule({ chatId, schedule });
  }

  async clearGameMessageSchedule({ chatIds }) {
    await ChatGameMessageSchedule.query().where('chat_id', 'in', chatIds).delete();
  }

  async clearChannelHistory() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const { chat } = await this.fetchChannel({ requestedChannelId: 'main' });
    await ChatMessage.query().where('chat_id', chat.chatId).andWhere('created_at', '<=', yesterday).delete();
  }

  async handleGameMessages() {
    const lock = await RedisRepository.lock('HANDLE_GAME_MESSAGES', 1000 * 45);
    if (!lock) return;
    const { schedule } = await RedisRepository.getGameMessageSchedule();
    const oneHourFromNow = Date.now() + 1000 * 60 * 60;
    const messagesToSend = (schedule || []).filter(entry => new Date(entry.schedule).getTime() < oneHourFromNow);
    if (messagesToSend.length) await this.sendGameMessages(messagesToSend);
  }

  async sendGameMessages(messagesToSend) {
    const chatIds = messagesToSend.map(message => message.chatId);
    chatIds.forEach(chatId => this._notifyChatEvent({ chatId, action: 'gameStarting', payload: chatId }))
    await RedisRepository.clearGameMessageSchedule({ chatIds });
    await this.clearGameMessageSchedule({ chatIds });
  }

  async handleExpiredAttachments() {
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    const expiredAttachmentsRaw = await ChatMessage.query().where('is_attachment', true).andWhere('created_at', '<=', fiveDaysAgo).fetch();
    const expiredAttachments = expiredAttachmentsRaw && expiredAttachmentsRaw.toJSON() || [];
    const keyController = new AwsKeyController();
    for (const message of expiredAttachments) {
      await keyController.removeChatAttachmentKey(message.chat_id, message.id);
      await this.deleteMessage({ requestingUserId: message.sender_id, requestedChatId: message.chat_id, requestedMessageId: message.id });
    }
  }

  async _addChatNotificationModerator({ requestingUserId, requestedChatId, moderators }) {
    const { chat } = await this.fetchChatInfo({ requestedChatId });
    const alias = (await User.query().where('id', '=', requestingUserId).first()).toJSON().alias;
    const oldModerators = chat.moderators;
    const added = moderators.filter(moderator => !oldModerators.includes(moderator));
    const removed = oldModerators.filter(moderator => !moderators.includes(moderator));
    const type = added[0] ? "PROMOTED" : "DEMOTED";
    this._addChatNotification({
      chatId: requestedChatId,
      userId: added[0] || removed[0] || requestingUserId,
      senderId: requestingUserId,
      senderAlias: alias,
      type,
      content: chat.title,
    })
  }

  async _addChatNotificationKicked({ requestingUserId, requestedUserId, chat }) {
    const alias = (await User.query().where('id', '=', requestingUserId).first()).toJSON().alias;
    this._addChatNotification({
      chatId: chat.chatId,
      userId: requestedUserId,
      senderId: requestingUserId,
      senderAlias: alias,
      type: "KICKED",
      content: chat.title,
    });
  }

  async _addChatNotificationMessage({ requestingUserId, requestedChatId, chat, content }) {
    if (!chat.contacts) return
    const otherUserId = chat.contacts.filter(contactId => contactId !== requestingUserId)[0];
    const status = (await User.query().where('id', '=', otherUserId).first()).toJSON().status;
    if (status === "offline") {
      const user = (await User.query().where('id', '=', requestingUserId).first()).toJSON();
      this._addChatNotification({
        chatId: requestedChatId,
        userId: otherUserId,
        senderId: requestingUserId,
        senderAlias: user.alias,
        senderIcon: user.profile_img,
        type: "MESSAGE",
        content: content,
      });
    }
  }

  async _addChatGroupNotificationMessage({ requestingUserId, requestedChatId, chat, content }) {
    const otherUsersIds = chat.contacts.filter(contactId => contactId !== requestingUserId);
    const user = (await User.query().where('id', '=', requestingUserId).first()).toJSON();
    for (const otherUserId of otherUsersIds) {
      const status = (await User.query().where('id', '=', otherUserId).first()).toJSON().status;
      if (status === "offline") {
        await this._addChatNotification({
          chatId: requestedChatId,
          userId: otherUserId,
          senderId: requestingUserId,
          senderAlias: user && user.alias,
          senderIcon: user && user.profile_img,
          groupTitle: chat.title,
          groupIcon: chat.icon,
          type: "GROUP_MESSAGE",
          content: content,
        });
      }
    }
  }

  async _addChatNotification({ chatId, userId, senderId, senderAlias, type, content, senderIcon, groupTitle, groupIcon }) {
    const notification = new UserChatNotification();
    notification.chat_id = chatId;
    notification.user_id = userId;
    notification.sender_id = senderId;
    notification.sender_alias = senderAlias;
    notification.type = type;
    notification.content = content;
    notification.sender_icon = senderIcon;
    notification.group_title = groupTitle;
    notification.group_icon = groupIcon;
    notification.count = await this._getChatNotificationCount({ chatId, userId, type });
    notification.has_read = false;
    await notification.save();
    const payload = new ChatNotificationSchema(notification);
    log('CHAT', `Adding Chat Notification: ${JSON.stringify(payload)}`);
    await this._notifyChatEvent(({ userId, action: 'chatNotification', payload }));
    const { unreadMessages: chats } = await this.fetchUnreadMessages({ requestingUserId: userId, count: true })
    await this.publishNotifications({ userId, notifications: { chats } })
  }

  async _getChatNotificationCount({ chatId, userId, type }) {
    if (!chatId) return 0;
    const notification = await UserChatNotification.query().where('chat_id', chatId).andWhere('user_id', userId).andWhere('type', type).andWhere('has_read', false).fetch();
    const notificationData = notification && notification.toJSON && notification.toJSON()[0];
    const count = notificationData && notificationData.count || 0;
    await UserChatNotification.query().where('chat_id', chatId).andWhere('user_id', userId).andWhere('type', type).delete();
    return count + 1;
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
    const { chat } = await this.fetchChatInfo({ requestedChatId });
    const isOwner = !chat.isGroup || chat.owners.find(contactId => parseInt(contactId) === parseInt(requestingUserId));
    const isModerator = !chat.isGroup || chat.moderators.find(contactId => parseInt(contactId) === parseInt(requestingUserId));
    const canSetSelfDestruct = isOwner || isModerator;
    if (canSetSelfDestruct) {
      await Chat.query().where('id', requestedChatId).update({ self_destruct: selfDestruct });
      const payload = { chatId: requestedChatId, selfDestruct };
      this._notifyChatEvent({ chatId: requestedChatId, action: 'selfDestruct', payload });
    }
    return new DefaultSchema({ success: canSetSelfDestruct });
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
      isGroup: chat.isGroup,
      gameId: chat.game_id,
      gameMessage: chat.game_message,
      individualGameId: chat.individual_game_id,
    });
    this._notifyChatEvent({ chatId: requestedChatId, action: 'chatUpdated', payload: chatSchema });
  }

  async _notifyChatEvent({ userId, guestId, chatId, contactId, action, payload }) {
    if (payload.userId) payload.userId = parseInt(payload.userId);
    if (payload.chatId) payload.chatId = parseInt(payload.chatId);
    if (payload.contactId) payload.contactId = parseInt(payload.contactId);
    const logKey = (userId && `User ${userId}`) || (chatId && `Chat ${chatId}`) || (contactId && `Contacts from User ${contactId}`);
    log('CHAT', `Broadcasting ${action} event to ${logKey} with Payload: ${JSON.stringify(payload)}`);
    if (userId) return this.broadcast('chat:auth:*', `chat:auth:${userId}`, `chat:${action}`, payload);
    if (guestId) return this.broadcast('chat:guest:*', `chat:guest:${guestId}`, `chat:${action}`, payload);
    if (chatId) {
      const result =  await Chat.find(chatId);
      if (!result) return;
      const chat = result.toJSON();
      if (chat.channel_id) {
        return this.broadcast('chat:channel:*', `chat:channel:${chat.channel_id}`, `chat:${action}`, payload)
      }
      const contacts = JSON.parse(chat.contacts);
      const guests = JSON.parse(chat.guests);
      contacts.forEach(contactId => this.broadcast('chat:auth:*', `chat:auth:${contactId}`, `chat:${action}`, payload));
      guests.forEach(guestId => this.broadcast('chat:guest:*', `chat:guest:${guestId}`, `chat:${action}`, payload));
      return;
    }
    if (contactId) {
      const contacts = (await Database.from('friends').where({ user_id: contactId })).map(contact => contact.friend_id);
      contacts.forEach(contactId => this.broadcast('chat:auth:*', `chat:auth:${contactId}`, `chat:${action}`, payload));
    }
  }

  async publishNotifications({ userId, notifications }) {
    return this.broadcast('chat:auth:*', `chat:auth:${userId}`, `chat:notification`, notifications);
  }

  async broadcastWebsocket(channelId, id, type, data) {
    return WebsocketChatRepository.broadcast(channelId, id, type, data);
  }

  async broadcastNats(channelId, id, type, data) {
    return NatsChatRepository.publish({ channelId, id, type, data });
  }

  async broadcast(channelId, id, type, data) {
    this.broadcastWebsocket(channelId, id, type, data);
    this.broadcastNats(channelId, id, type, data);
  }

}

module.exports = new ChatRepository();
