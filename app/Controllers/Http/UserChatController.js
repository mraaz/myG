'use strict'

const User = use('App/Models/User');
const UserChat = use('App/Models/UserChat');
const UserController = use('./UserController');
const ChatController = use('./ChatController');
const { formatDateTime, toSQLDateTime } = require('../../Common/date');
const { broadcast } = require('../../Common/socket');

class UserChatController {

  async create({ auth, request, response }) {

    const members = request.only(['members']).members;
    const friend = members.find(member => member !== auth.user.id);

    const existingChatId = await this.findChatIdWithFriend(auth.user.id, friend);
    if (existingChatId) {
      const existingChat = { chatId: existingChatId, userId: auth.user.id, friendId: friend };
      members.forEach(id => broadcast('user_chat:*', `user_chat:${id}`, 'user_chat:newChat', existingChat));
      return response.send({ chat: existingChat });
    }

    const chat = await new ChatController().create();
    await this.createUserChat(chat.id, members[0], auth.user.id, members[1]);
    await this.createUserChat(chat.id, members[1], auth.user.id, members[0]);
    return response.send({ chat: { chatId: chat.id, userId: auth.user.id, friendId: friend } });

  }

  async createUserChat(chatId, userId, ownerId, friendId) {
    const userChat = new UserChat();
    userChat.chat_id = chatId;
    userChat.user_id = userId;
    userChat.deleted_messages = '[]';
    await userChat.save();
    broadcast('user_chat:*', `user_chat:${userId}`, 'user_chat:newChat', { chatId: chatId, userId: ownerId, friendId: friendId });
  }

  async update({ params, request, auth }) {
    const data = request.only(['muted', 'blocked', 'markAsRead', 'selfDestruct']);
    if (data.markAsRead) return this.markAsRead({ params, auth });
    if (data.selfDestruct !== undefined) return this.setSelfDestruct({ params, auth }, data.selfDestruct);
    const chat = await this.fetchChat(params.chatId, auth.user.id);
    if (data.muted !== undefined) chat.muted = data.muted;
    if (data.blocked !== undefined) chat.blocked = data.blocked;
    await chat.save();
    return chat;
  }

  async updateStatus({ request, auth }) {
    const userId = auth.user.id;
    const user = await User.query().where('id', '=', userId).first();
    const status = request.only ? request.only(['status']).status : request.status;
    const forceStatus = request.only ? request.only(['forceStatus']).forceStatus : request.forceStatus;
    const currentStatus = user.toJSON().status;
    const status_locked = user.toJSON().status_locked;
    if (status === currentStatus) {
      return {
        status: currentStatus,
        isStatusLocked: status_locked,
      };
    }
    if (status !== 'offline' && !forceStatus && status_locked) {
      return {
        status: currentStatus,
        isStatusLocked: !!status_locked,
      };
    }
    const data = { status, status_locked: status !== 'online' && forceStatus };
    const lastSeen = status === 'offline' && new Date();
    if (status === 'offline') data.last_seen = lastSeen;
    await User.query().where('id', '=', userId).update(data);
    const chats = await this.fetchChats({ auth: { user: { id: userId } } });
    const subtitle = this.getSubtitle(status, lastSeen);
    chats.forEach(chat => {
      broadcast('chat:*', `chat:${chat.chatId}`, 'chat:info', {
        userId,
        subtitle,
      });
    });
    return {
      status,
      isStatusLocked: !!status_locked,
    }
  }

  async markAsRead({ params, auth }) {
    const chat = await this.fetchChat(params.chatId, auth.user.id);
    chat.read_date = toSQLDateTime(new Date());
    await chat.save();
    broadcast('chat:*', `chat:${chat.toJSON().chat_id}`, 'chat:info', {
      userId: auth.user.id,
      readDate: chat.toJSON().read_date,
      friendReadDate: chat.toJSON().read_date,
    });
    return chat;
  }

  async setSelfDestruct({ params, auth }, selfDestruct) {
    const chat = await this.fetchChat(params.chatId, auth.user.id);
    const friendChat = await this.fetchFriendChat(params.chatId, auth.user.id);
    chat.self_destruct = selfDestruct;
    friendChat.self_destruct = selfDestruct;
    await chat.save();
    await friendChat.save();
    broadcast('chat:*', `chat:${chat.toJSON().chat_id}`, 'chat:info', {
      userId: auth.user.id,
      selfDestruct: chat.toJSON().self_destruct,
    });
    return chat;
  }

  async deleteMessages({ params, auth }) {
    const chat = await this.fetchChat(params.chatId, auth.user.id);
    chat.cleared_date = toSQLDateTime(new Date());
    await chat.save();
    return chat;
  }

  async fetchChats({ auth }) {
    const chats = await UserChat
      .query()
      .where('user_id', auth.user.id)
      .fetch();
    return chats.toJSON().map(chat => {
      chat.chatId = chat.chat_id;
      chat.userId = chat.user_id;
      delete chat.user_id;
      delete chat.chat_id;
      return chat;
    });
  }

  async fetchChatInfo({ auth, params }) {

    const [chat, friend, messages] = await Promise.all([
      this.fetchChat(params.chatId, auth.user.id),
      this.fetchFriend(auth, params.chatId, auth.user.id),
      new ChatController().fetchMessages(params.chatId),
    ]);

    const friendId = friend.user[0].id;
    const friendReadDate = friend.user[0].readDate;
    const icon = friend.user[0].profile_img;
    const title = `${friend.user[0].first_name} ${friend.user[0].last_name}`;
    const subtitle = this.getSubtitle(friend.user[0].status, friend.user[0].last_seen);
    const publicKey = friend.user[0].public_key;
    const muted = chat.toJSON().muted;
    const blocked = chat.toJSON().blocked;
    const status = friend.user[0].status;
    const selfDestruct = chat.toJSON().self_destruct;

    const clearedDate = new Date(chat.toJSON().cleared_date);
    const readDate = new Date(chat.toJSON().read_date);
    const deletedMessages = JSON.parse(chat.toJSON().deleted_messages);
    const filteredMessages = messages
      .filter(message => new Date(message.created_at) > clearedDate)
      .filter(message => !deletedMessages.includes(`${message.id}`));

    return {
      icon,
      title,
      subtitle,
      publicKey,
      friendId,
      muted,
      blocked,
      selfDestruct,
      clearedDate,
      readDate,
      friendReadDate,
      status,
      messages: filteredMessages,
    };

  }

  async fetchFriend(auth, chatId, userId) {
    const friendChat = await this.fetchFriendChat(chatId, userId);
    const friendId = friendChat.toJSON().user_id;
    const friendReadDate = new Date(friendChat.toJSON().read_date);
    const userController = new UserController();
    const friend = await userController.profile({
      auth,
      request: {
        params: {
          id: friendId
        }
      }
    });
    friend.user[0].readDate = friendReadDate;
    return friend;
  }

  getSubtitle(status, lastSeen) {
    return status === 'offline' ? `${formatDateTime(lastSeen)}` : `${status}`;
  }

  async findChatIdWithFriend(userId, friendId) {
    const userChatIds = (await this.findChatsFromUser(userId)).toJSON().map(chat => chat.chat_id);
    const friendChatIds = (await this.findChatsFromUser(friendId)).toJSON().map(chat => chat.chat_id);
    return userChatIds.find(chatId => friendChatIds.includes(chatId));
  }

  findChatsFromUser(userId) {
    return UserChat
      .query()
      .where('user_id', userId)
      .fetch();
  }

  fetchChat(chatId, userId) {
    return UserChat
      .query()
      .where('chat_id', chatId)
      .andWhere('user_id', userId)
      .first();
  }

  fetchFriendChat(chatId, userId) {
    return UserChat
      .query()
      .where('chat_id', chatId)
      .andWhere('user_id', '!=', userId)
      .first();
  }

}

module.exports = UserChatController;
