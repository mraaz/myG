
const Database = use('Database');
const User = use('App/Models/User');
const UserChat = use('App/Models/UserChat');

const StatusSchema = require('../../Schemas/Status');
const ContactSchema = require('../../Schemas/Contact');
const DefaultSchema = require('../../Schemas/Default');
const GameSchema = require('../../Schemas/Game');

const ChatRepository = require('../Chat');

class UserRepository {

  async storePublicKey({ requestingUserId, publicKey }) {
    const { public_key: previousKey } = (await User.query().where('id', '=', requestingUserId).first()).toJSON();
    if (previousKey !== publicKey) {
      const [{ contacts }, chats] = await Promise.all([
        this.fetchContacts({ requestingUserId }),
        UserChat.query().where('user_id', requestingUserId).fetch().then(response => response.toJSON())
      ]);
      contacts.forEach(contact => ChatRepository._notifyChatEvent({ userId: contact.contactId, action: 'encryption', payload: { publicKey, userId: requestingUserId } }));
      chats.forEach(chat => ChatRepository._notifyChatEvent({ chatId: chat.chat_id, action: 'encryption', payload: { publicKey, userId: requestingUserId, chatId: chat.chat_id } }));
    }
    await User.query().where('id', '=', requestingUserId).update({ public_key: publicKey })
    return new DefaultSchema({ success: true });
  }

  async fetchGames({ requestingUserIds }) {
    const rawGames = await Database
      .select('game_experiences.user_id', 'game_names_id', 'game_name', 'game_img')
      .from('game_experiences')
      .leftJoin('game_names', 'game_names.id', 'game_experiences.game_names_id')
      .where('game_experiences.user_id', 'in', requestingUserIds)
      .union([
        Database
          .select('esports_experiences.user_id', 'game_names_id', 'game_name', 'game_img')
          .from('esports_experiences')
          .leftJoin('game_names', 'game_names.id', 'esports_experiences.game_names_id')
          .where('esports_experiences.user_id', 'in', requestingUserIds)
      ]);
    const games = rawGames.map(game => new GameSchema({ gameId: game.game_names_id, userId: game.user_id, name: game.game_name, icon: game.game_img }));
    const byUserIds = requestingUserIds.map(userId => ({ userId, games: this._uniqBy(games.filter(game => game.userId === userId), game => game.gameId) }));
    const gameMap = {};
    byUserIds.forEach(game => gameMap[game.userId] = game.games);
    return { games: gameMap };
  }

  async fetchContacts({ requestingUserId }) {
    const friends = (await Database.from('friends')
      .innerJoin('users', 'users.id', 'friends.friend_id')
      .where({ user_id: requestingUserId })
      .orderBy('friends.created_at', 'desc'));
    const contacts = friends.map(friend => new ContactSchema({
      contactId: friend.friend_id,
      icon: friend.profile_img,
      name: friend.alias,
      status: friend.status,
      lastSeen: friend.last_seen,
      publicKey: friend.public_key,
    }));
    const requestingUserIds = contacts.map(contact => contact.contactId);
    const { games } = await this.fetchGames({ requestingUserIds });
    contacts.forEach(contact => contact.games = games[contact.contactId] || []);
    return { contacts };
  }

  async fetchContact({ requestedContactId }) {
    const contact = (await User.query().where('id', '=', requestedContactId).first()).toJSON();
    const contactSchema = new ContactSchema({
      contactId: requestedContactId,
      icon: contact.profile_img,
      name: contact.alias,
      status: contact.status,
      lastSeen: contact.last_seen,
      publicKey: contact.public_key,
    });
    return { contact: contactSchema };
  }

  async fetchStatus({ requestingUserId }) {
    const { status, last_status, status_locked } = (await User.query().where('id', '=', requestingUserId).first()).toJSON();
    const activeStatus = last_status !== 'online' ? last_status : status;
    const activeLock = last_status !== 'online' ? true : status_locked;
    if (activeLock) await this.updateStatus({ requestingUserId, requestedStatus: activeStatus, forceStatus: activeLock });
    return { status: new StatusSchema({ value: activeStatus, locked: activeLock }) };
  }

  async updateStatus({ requestingUserId, requestedStatus, forceStatus }) {
    const { status: currentStatus, status_locked } = (await User.query().where('id', '=', requestingUserId).first()).toJSON();
    const cannotChangeStatus = requestedStatus !== 'offline' && !forceStatus && status_locked;
    if (cannotChangeStatus) return { status: new StatusSchema({ value: currentStatus, locked: status_locked }) };
    const shouldLockStatus = requestedStatus !== 'online' && forceStatus;
    const changes = { status: requestedStatus, status_locked: shouldLockStatus };
    if (forceStatus) changes.last_status = requestedStatus;
    if (requestedStatus === 'offline') changes.last_seen = new Date();
    await User.query().where('id', '=', requestingUserId).update(changes);
    ChatRepository._notifyChatEvent({ contactId: requestingUserId, action: 'status', payload: { contactId: requestingUserId, status: requestedStatus, lastSeen: changes.last_seen } });
    return { status: new StatusSchema({ value: requestedStatus, locked: shouldLockStatus }) };
  }

  async searchUsers({ requestingUserId, query }) {
    const response = await User.query().where('alias', 'like', '%' + query + '%').fetch();
    if (!response) return { users: [] };
    const users = response.toJSON()
      .filter(user => parseInt(user.id) !== parseInt(requestingUserId))
      .map(user => new ContactSchema({
        contactId: user.id,
        icon: user.profile_img,
        name: user.alias,
        status: user.status,
        lastSeen: user.last_seen,
        publicKey: user.public_key,
      }));
    return { users };
  }

  _uniqBy(a, key) {
    var seen = {};
    return a.filter(function (item) {
      var k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
  }

}

module.exports = new UserRepository();