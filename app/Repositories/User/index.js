
const Database = use('Database');
const User = use('App/Models/User');
const UserChat = use('App/Models/UserChat');

const StatusSchema = require('../../Schemas/Status');
const ContactSchema = require('../../Schemas/Contact');
const DefaultSchema = require('../../Schemas/Default');

const ChatRepository = require('../Chat');

class UserRepository {

  async storePublicKey({ requestingUserId, publicKey }) {
    const { public_key: previousKey } = (await User.query().where('id', '=', requestingUserId).first()).toJSON();
    if (previousKey !== publicKey) {
      const chats = (await UserChat.query().where('user_id', requestingUserId).fetch()).toJSON();
      chats.forEach(chat => ChatRepository._notifyChatEvent({ chatId: chat.chat_id, action: 'encryption', payload: { publicKey, userId: requestingUserId, chatId: chat.chat_id } }));
    }
    await User.query().where('id', '=', requestingUserId).update({ public_key: publicKey })
    return new DefaultSchema({ success: true });
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
    ChatRepository._notifyChatEvent({ contactId: requestingUserId, action: 'status', payload: { contactId: requestingUserId, status: requestedStatus, lastSeen: changes.last_seen } })
    return { status: new StatusSchema({ value: requestedStatus, locked: shouldLockStatus }) };
  }

}

module.exports = new UserRepository();