'use strict'

const UserChat = use('App/Models/UserChat');
const UserController = use('./UserController');
const ChatController = use('./ChatController');
const { formatDateTime, toSQLDateTime } = require('../../Common/date');
const { broadcast } = require('../../Common/socket');

class UserChatController {

  async create({ auth, request }) {
    const chat = await new ChatController().create();
    const data = request.only(['members']);
    data.members.forEach(async id => {
      const userChat = new UserChat();
      userChat.chat_id = chat.id;
      userChat.user_id = id;
      userChat.deleted_messages = '[]';
      await userChat.save();
      broadcast('user_chat:*', `user_chat:${id}`, 'user_chat:newChat', { chatId: chat.id, userId: auth.user.id });
    });
    return chat;
  }

  async update({ params, request, auth }) {
    const chat = await this.fetchChat(params.chatId, auth.user.id);
    const data = request.only(['muted', 'blocked']);
    if (data.muted !== undefined) chat.muted = data.muted;
    if (data.blocked !== undefined) chat.blocked = data.blocked;
    await chat.save();
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

    const icon = friend.user[0].profile_img;
    const title = `${friend.user[0].first_name} ${friend.user[0].last_name}`;
    const subtitle = this.getSubtitle(friend.user[0].online, friend.user[0].last_seen);
    const publicKey = friend.user[0].public_key;
    const muted = chat.toJSON().muted;
    const blocked = chat.toJSON().blocked;

    const clearedDate = new Date(chat.toJSON().cleared_date.toISOString().replace("T", " ").split('.')[0]);
    const deletedMessages = JSON.parse(chat.toJSON().deleted_messages);
    const filteredMessages = messages
      .filter(message => new Date(message.created_at) > clearedDate)
      .filter(message => !deletedMessages.includes(`${message.id}`));

    return {
      icon,
      title,
      subtitle,
      publicKey,
      friendId: friend.friendId,
      muted,
      blocked,
      clearedDate,
      messages: filteredMessages,
    };

  }

  async fetchFriend(auth, chatId, userId) {
    const friendChat = await this.fetchFriendChat(chatId, userId);
    const friendId = friendChat.toJSON().user_id;
    const userController = new UserController();
    const friend = await userController.profile({
      auth,
      request: {
        params: {
          id: friendId
        }
      }
    });
    friend.friendId = friendId;
    return friend;
  }

  getSubtitle(online, lastSeen) {
    return online ? 'Online' : `${formatDateTime(lastSeen)}`;
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
