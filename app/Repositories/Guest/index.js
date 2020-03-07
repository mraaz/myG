
const Guest = use('App/Models/Guest');
const Chat = use('App/Models/Chat');
const ChatRepository = require('../Chat');
const GuestSchema = require('../../Schemas/Guest');
const DefaultSchema = require('../../Schemas/Default');

const extractGuestId = guestId => parseInt(guestId.replace('Guest #', ''));
const MAXIMUM_GROUP_SIZE = 37;

class GuestRepository {

  async register({ requestedChatId, publicKey }) {
    const guestEntry = new Guest();
    guestEntry.public_key = publicKey;
    await guestEntry.save();
    const guest = new GuestSchema({ publicKey, guestId: guestEntry.id });
    const requestingGuestId = guest.guestId;
    const { chat } = await this.addGuestToChat({ requestingGuestId, requestedChatId, publicKey });
    return { guestId: requestingGuestId, chat };
  }

  async unregister({ requestingGuestId, requestedChatId }) {
    const chat = await this.removeGuestFromChat({ requestingGuestId, requestedChatId });
    await Guest.find(extractGuestId(requestingGuestId)).delete();
    return new DefaultSchema({ success: true, chat });
  }

  async addGuestToChat({ requestingGuestId, requestedChatId, publicKey }) {
    const guest = new GuestSchema({ publicKey, guestId: requestingGuestId });
    const { chat } = await ChatRepository.fetchChatInfo({ requestedChatId });
    if (chat.guests.includes(guest.guestId)) return { error: 'Guest is Already in Chat.' };
    chat.guests.push(guest.guestId);
    if (chat.contacts.length + chat.guests.length > MAXIMUM_GROUP_SIZE) throw new Error('Maximum Group Size Reached!');
    await Chat.query().where('id', requestedChatId).update({ guests: JSON.stringify(chat.guests) });
    ChatRepository._notifyChatEvent({ userId: guest.guestId, action: 'newChat', payload: chat });
    chat.contacts.forEach(userId => ChatRepository._notifyChatEvent({ userId, action: 'guestJoined', payload: { guest, chatId: requestedChatId } }));
    chat.guests.forEach(userId => ChatRepository._notifyChatEvent({ userId, action: 'guestJoined', payload: { guest, chatId: requestedChatId } }));
    return { chat };
  }

  async removeGuestFromChat({ requestedChatId, requestingGuestId }) {
    const guest = new GuestSchema({ guestId: requestingGuestId });
    const { chat } = await ChatRepository.fetchChatInfo({ requestedChatId });
    if (!chat.guests.includes(guest.id)) return { error: 'Guest was not in Chat.' };
    chat.guests = chat.guests.filter(guestId => guestId !== guest.id);
    await Chat.query().where('id', requestedChatId).update({ guests: JSON.stringify(chat.guests) });
    chat.contacts.forEach(userId => ChatRepository._notifyChatEvent({ userId, action: 'guestLeft', payload: { guest, chatId: requestedChatId } }));
    chat.guests.forEach(userId => ChatRepository._notifyChatEvent({ userId, action: 'guestLeft', payload: { guest, chatId: requestedChatId } }));
    return { chat };
  }

}

module.exports = new GuestRepository();