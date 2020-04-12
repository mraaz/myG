
const Guest = use('App/Models/Guest');
const Chat = use('App/Models/Chat');
const ChatLink = use('App/Models/ChatLink');
const ChatRepository = require('../Chat');
const GuestSchema = require('../../Schemas/Guest');
const ChatLinkSchema = require('../../Schemas/ChatLink');
const MessageSchema = require('../../Schemas/Message');
const DefaultSchema = require('../../Schemas/Default');

const MAXIMUM_GROUP_SIZE = 37;

class GuestRepository {

  async register({ requestedChatId, requestedAlias, publicKey }) {
    const guestEntry = new Guest();
    guestEntry.public_key = publicKey;
    guestEntry.chat_id = requestedChatId;
    await guestEntry.save();
    const guest = new GuestSchema({ publicKey, guestId: guestEntry.id });
    const requestingGuestId = guest.guestId;
    const { chat } = await this.addGuestToChat({ requestingGuestId, requestedChatId, requestedAlias, publicKey });
    return { guest, chat };
  }

  async unregister({ requestingGuestId }) {
    const guest = await Guest.find(requestingGuestId);
    await this.removeGuestFromChat({ requestingGuestId, requestedChatId: guest.chat_id });
    await guest.delete();
    return new DefaultSchema({ success: true });
  }

  async addGuestToChat({ requestingGuestId, requestedChatId, requestedAlias, publicKey }) {
    const guest = new GuestSchema({ publicKey, guestId: requestingGuestId, guestAlias: requestedAlias });
    const { chat } = await ChatRepository.fetchChatInfo({ requestedChatId });
    if (chat.guests.includes(guest.guestId)) return { error: 'Guest is Already in Chat.' };
    chat.guests.push(guest.guestId);
    if (chat.contacts.length + chat.guests.length > MAXIMUM_GROUP_SIZE) throw new Error('Maximum Group Size Reached!');
    await Chat.query().where('id', requestedChatId).update({ guests: JSON.stringify(chat.guests) });
    const entryLog = await ChatRepository._insertEntryLog(requestedChatId, `${guest.guestName}`, false, false, false, true);
    ChatRepository._notifyChatEvent({ chatId: requestedChatId, action: 'newChat', payload: chat });
    ChatRepository._notifyChatEvent({ chatId: requestedChatId, action: 'guestJoined', payload: { guest, chatId: requestedChatId, entryLog } });
    return { chat };
  }

  async removeGuestFromChat({ requestedChatId, requestingGuestId }) {
    const { chat } = await ChatRepository.fetchChatInfo({ requestedChatId });
    if (!chat.guests.includes(requestingGuestId)) return { error: 'Guest was not in Chat.' };
    chat.guests = chat.guests.filter(guestId => guestId !== requestingGuestId);
    await Chat.query().where('id', requestedChatId).update({ guests: JSON.stringify(chat.guests) });
    const entryLog = await ChatRepository._insertEntryLog(requestedChatId, `Guest #${requestingGuestId}`, false, true, false, false);
    ChatRepository._notifyChatEvent({ chatId: requestedChatId, action: 'guestLeft', payload: { guestId: requestingGuestId, chatId: requestedChatId, entryLog } });
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

  async fetchChat({ requestedChatId }) {
    return ChatRepository.fetchChatInfo({ requestedChatId });
  }

  async fetchMessages({ requestedChatId, requestedPage }) {
    return ChatRepository.fetchMessages({ requestedChatId, requestedPage });
  }

  async fetchEncryptionMessages({ requestingGuestId, requestedChatId }) {
    return ChatRepository.fetchEncryptionMessages({ requestingUserId: requestingGuestId, requestedChatId });
  }

  async sendMessage({ requestedChatId, senderName, guestId, backup, content }) {
    const messageData = {
      sender_id: guestId,
      sender_name: senderName,
      backup: backup,
      content: content,
      self_destruct: true,
    };
    const message = await Chat.find(requestedChatId).then(chat => chat.messages().create(messageData));
    const messageSchema = new MessageSchema({
      messageId: message.id,
      chatId: requestedChatId,
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
    });
    ChatRepository._notifyChatEvent({ chatId: requestedChatId, action: 'newMessage', payload: messageSchema });
    return { message: messageSchema };
  }

  async fetchEntryLogs({ requestedChatId }) {
    return ChatRepository.fetchEntryLogs({ requestedChatId });
  }

  async fetchGroupPrivateKeyRequests({ chatId }) {
    return ChatRepository.fetchGroupPrivateKeyRequests({ chatId });
  }

  async requestGroupPrivateKey({ userId, chatId, publicKey }) {
    return ChatRepository.requestGroupPrivateKey({ userId, chatId, publicKey });
  }

  async confirmGroupPrivateKey({ userId, chatId }) {
    return ChatRepository.confirmGroupPrivateKey({ userId, chatId });
  }

}

module.exports = new GuestRepository();