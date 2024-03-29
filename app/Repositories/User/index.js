
const Database = use('Database');
const User = use('App/Models/User');
const UserChat = use('App/Models/UserChat');
const FavoriteGame = use('App/Models/FavoriteGame');
const GameName = use('App/Models/GameName');
const Settings = use('App/Models/Setting');

const StatusSchema = require('../../Schemas/Status');
const ContactSchema = require('../../Schemas/Contact');
const SettingsSchema = require('../../Schemas/Settings');
const DefaultSchema = require('../../Schemas/Default');
const GameSchema = require('../../Schemas/Game');

const ChatRepository = require('../Chat');
const EncryptionRepository = require('../Encryption');
const EmailController = require('../../Controllers/Http/EmailController');

class UserRepository {

  async storePublicKey({ requestingUserId, publicKey }) {
    const { public_key: previousKey } = (await User.query().where('id', '=', requestingUserId).first()).toJSON();
    if (previousKey !== publicKey) {
      const [{ contacts }, chats] = await Promise.all([
        this.fetchContacts({ requestingUserId }),
        UserChat.query().where('user_id', requestingUserId).fetch().then(response => response.toJSON())
      ]);
      ChatRepository._notifyChatEvent({ userId: requestingUserId, action: 'encryption', payload: { publicKey, userId: requestingUserId } });
      contacts.forEach(contact => ChatRepository._notifyChatEvent({ userId: contact.contactId, action: 'encryption', payload: { publicKey, userId: requestingUserId } }));
      chats.forEach(chat => ChatRepository._notifyChatEvent({ chatId: chat.chat_id, action: 'encryption', payload: { publicKey, userId: requestingUserId, chatId: chat.chat_id } }));
    }
    await User.query().where('id', '=', requestingUserId).update({ public_key: publicKey })
    return new DefaultSchema({ success: true });
  }

  async sendEncryptionEmail({ requestingUserId, publicKey, pin }) {
    const user = (await User.query().where('id', '=', requestingUserId).first()).toJSON();
    if (user.public_key === publicKey) return new DefaultSchema({ success: false, error: "Key is the same." });
    if (!user.email) return new DefaultSchema({ success: false, error: "User doesn't have an email" });
    const fifteenMinutesAgo = Date.now() - 1000 * 60 * 15
    const newUser = new Date(user.created_at).getTime() > fifteenMinutesAgo;
    if (newUser) await new EmailController().welcome_email(await EncryptionRepository.decryptField(user.email), pin, user.alias);
    else await new EmailController().encryption_email(await EncryptionRepository.decryptField(user.email), pin);
    return new DefaultSchema({ success: true });
  }

  async sendEncryptionReminderEmail({ requestingUserId, pin }) {
    const user = (await User.query().where('id', '=', requestingUserId).first()).toJSON();
    if (!user.email) return new DefaultSchema({ success: false, error: "User doesn't have an email" });
    await new EmailController().encryption_email(await EncryptionRepository.decryptField(user.email), pin);
    return new DefaultSchema({ success: true });
  }

  async fetchUserGames({ requestingUserId }) {
    const query = Database
    .select('game_experiences.user_id', 'game_names.user_id as owner_id', 'game_names_id', 'game_name', 'game_img')
    .from('game_experiences')
    .leftJoin('game_names', 'game_names.id', 'game_experiences.game_names_id')
    .where('game_experiences.user_id', requestingUserId)
    .union([
      Database
        .select('esports_experiences.user_id', 'game_names.user_id as owner_id', 'game_names_id', 'game_name', 'game_img')
        .from('esports_experiences')
        .leftJoin('game_names', 'game_names.id', 'esports_experiences.game_names_id')
        .where('esports_experiences.user_id', requestingUserId)
    ]);
    const rawGames = await query;
    const games = rawGames.map(game => new GameSchema({ gameId: game.game_names_id, userId: game.user_id, ownerId: game.owner_id, name: game.game_name, icon: game.game_img }));
    const favoriteGamesRaw = await FavoriteGame.query().where('user_id', requestingUserId).fetch();
    const favoriteGames = (favoriteGamesRaw && favoriteGamesRaw.toJSON()) || [];
    games.forEach(game => game.isFavorite = favoriteGames.find(favorite => favorite.game_names_id === game.gameId));
    return { games };
  }

  async fetchGames({ requestingUserIds }) {
    const query = Database
    .select('game_experiences.user_id', 'game_names.user_id as owner_id', 'game_names_id', 'game_name', 'game_img')
    .from('game_experiences')
    .leftJoin('game_names', 'game_names.id', 'game_experiences.game_names_id')
    .where('game_experiences.user_id', 'in', requestingUserIds)
    .union([
      Database
        .select('esports_experiences.user_id', 'game_names.user_id as owner_id', 'game_names_id', 'game_name', 'game_img')
        .from('esports_experiences')
        .leftJoin('game_names', 'game_names.id', 'esports_experiences.game_names_id')
        .where('esports_experiences.user_id', 'in', requestingUserIds)
    ]);
    const rawGames = await query;
    const games = rawGames.map(game => new GameSchema({ gameId: game.game_names_id, userId: game.user_id, ownerId: game.owner_id, name: game.game_name, icon: game.game_img }));
    const byUserIds = requestingUserIds.map(userId => ({ userId, games: this._uniqBy(games.filter(game => game.userId === userId), game => game.gameId) }));
    const gameMap = {};
    byUserIds.forEach(game => gameMap[game.userId] = game.games);
    if (requestingUserIds.length === 1) {
      const favoriteGamesRaw = await FavoriteGame.query().where('user_id', requestingUserIds[0]).fetch();
      const favoriteGames = (favoriteGamesRaw && favoriteGamesRaw.toJSON()) || [];
      gameMap[requestingUserIds[0]].forEach(game => game.isFavorite = favoriteGames.find(favorite => favorite.game_names_id === game.gameId));
    }
    return { games: gameMap };
  }

  async favoriteGame({ requestingUserId, requestedGameId }) {
    await this.unfavoriteGame({ requestingUserId, requestedGameId });
    const favoriteGame = new FavoriteGame();
    favoriteGame.user_id = requestingUserId;
    favoriteGame.game_names_id = requestedGameId;
    await favoriteGame.save();
    return new DefaultSchema({ success: true });
  }

  async unfavoriteGame({ requestingUserId, requestedGameId }) {
    await FavoriteGame.query().where('user_id', requestingUserId).andWhere('game_names_id', requestedGameId).delete();
    return new DefaultSchema({ success: true });
  }

  async updateGameIcon({ requestingUserId, requestedGameId, icon }) {
    const game = await GameName.query().where('id', requestedGameId).first();
    if (!game || parseInt(game.toJSON().user_id) !== requestingUserId) return new DefaultSchema({ success: false });
    game.game_img = icon;
    await game.save();
    return new DefaultSchema({ success: true });
  }

  async countContacts({ requestingUserId }) {
    const online = (await Database.from('friends').innerJoin('users', 'users.id', 'friends.friend_id').where({ user_id: requestingUserId }).andWhere({ status: 'online' }).count())[0]['count(*)']
    const playing = (await Database.from('friends').innerJoin('users', 'users.id', 'friends.friend_id').where({ user_id: requestingUserId }).andWhere({ status: 'playing' }).count())[0]['count(*)']
    const afk = (await Database.from('friends').innerJoin('users', 'users.id', 'friends.friend_id').where({ user_id: requestingUserId }).andWhere({ status: 'afk' }).count())[0]['count(*)']
    const offline = (await Database.from('friends').innerJoin('users', 'users.id', 'friends.friend_id').where({ user_id: requestingUserId }).andWhere({ status: 'offline' }).count())[0]['count(*)']
    return { online, playing, afk, offline };
  }

  async fetchContacts({ requestingUserId }) {
    const query = Database.from('friends')
      .innerJoin('users', 'users.id', 'friends.friend_id')
      .where({ user_id: requestingUserId })
      .orderBy('friends.created_at', 'desc');
    const friends = await query;
    const contacts = friends.map(friend => new ContactSchema({
      contactId: friend.friend_id,
      icon: friend.profile_img,
      name: friend.alias,
      status: friend.status,
      lastSeen: friend.last_seen,
      publicKey: friend.public_key,
    }));
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
    const { status: currentStatus, status_locked, alias } = (await User.query().where('id', '=', requestingUserId).first()).toJSON();
    const cannotChangeStatus = requestedStatus !== 'offline' && !forceStatus && status_locked;
    if (cannotChangeStatus) return { status: new StatusSchema({ value: currentStatus, locked: status_locked }) };
    const shouldLockStatus = requestedStatus !== 'online' && forceStatus;
    const changes = { status: requestedStatus, status_locked: shouldLockStatus };
    if (forceStatus) changes.last_status = requestedStatus;
    if (requestedStatus === 'offline') changes.last_seen = new Date();
    await User.query().where('id', '=', requestingUserId).update(changes);
    ChatRepository._notifyChatEvent({ contactId: requestingUserId, action: 'status', payload: { alias, contactId: requestingUserId, status: requestedStatus, lastSeen: changes.last_seen } });
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

  async fetchSettings({ requestingUserId }) {
    let response = await Settings.query().where('user_id', requestingUserId).first();
    if (!response) {
      response = new Settings();
      response.user_id = requestingUserId;
      response.push_notification = 1;
      await response.save();
    }
    const settings = new SettingsSchema(response.toJSON());
    return { settings };
  }

  async togglePushNotifications({ requestingUserId }) {
    const { settings } = await this.fetchSettings({ requestingUserId });
    await Settings.query().where('user_id', requestingUserId).update({ push_notification: settings.pushNotificationsEnabled ? 0 : 1 });
    settings.pushNotificationsEnabled = !settings.pushNotificationsEnabled;
    return { settings };
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
