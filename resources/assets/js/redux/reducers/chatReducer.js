
import logger from '../../common/logger';
import { reEncryptMessages, sendGroupKeys } from '../../common/encryption';
import { encryptMessage, decryptMessage, deserializeKey } from '../../integration/encryption';
import { requestGroupPrivateKey, confirmGroupPrivateKey } from '../../integration/http/guest';
import notifyToast from '../../common/toast';

export default function reducer(state = {
  userId: null,
  chats: [],
  contacts: [],
  unreadMessages: [],
  preparingMessenger: false,
  guestLink: null,
  blockedUsers: [],
}, action) {
  switch (action.type) {

    case "PREPARE_MESSENGER_PENDING": {
      return {
        ...state,
        preparingMessenger: true,
      };
    }

    case "PREPARE_MESSENGER_FULFILLED": {
      logger.log('CHAT', `Redux -> Messenger Ready (Chat): `, action.payload);
      const { userId } = action.meta;
      const chats = action.payload.chats.map(chat => {
        const previousChat = state.chats.find(candidate => candidate.chatId === chat.chatId) || {};
        const previousMessages = previousChat.messages || [];
        return {
          ...chat,
          ...previousChat,
          messages: previousMessages,
          closed: previousChat.closed || !previousMessages.length,
          deletedMessages: chat.deletedMessages,
        }
      });
      const openChats = chats.filter(candidate => !candidate.closed);
      if (openChats.length > 4) Array.from(Array(openChats.length - 4)).forEach((_, index) => openChats[index].closed = true);
      return {
        ...state,
        userId,
        chats,
        contacts: action.payload.contacts,
        preparingMessenger: false,
        publicKey: (action.payload.encryption || {}).publicKey,
        privateKey: (action.payload.encryption || {}).privateKey,
      };
    }

    case "PREPARE_CHAT_FULFILLED": {
      logger.log('CHAT', `Redux -> Chat ${action.meta.chatId} Ready (Chat): `, action.payload, action.meta);
      const { chatId, userId } = action.meta;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const existingChat = chats.find(candidate => candidate.chatId === chatId);
      const chat = existingChat || action.payload.chat;
      if (!existingChat) chats.push(chat);
      chat.fullContacts = action.payload.contacts;
      chat.links = action.payload.links;
      chat.entryLogs = action.payload.entryLogs;
      chat.noMoreMessages = false;
      chat.loadingMessages = false;
      chat.owners = action.payload.chat.owners;
      chat.moderators = action.payload.chat.moderators;
      chat.guests = action.payload.chat.guests;
      const messages = action.payload.messages
        .filter(message => message.messageId > action.payload.chat.lastCleared)
        .filter(message => !action.payload.chat.deletedMessages.includes(message.messageId))
        .filter(message => !chat.blockedUsers.includes(message.senderId))
        .sort((m1, m2) => parseInt(m1.messageId) - parseInt(m2.messageId));
      if (!chat.blocked) chat.messages = messages;
      if (chat.gameStarting) chat.messages.push(chat.gameStarting);
      if (action.payload.chat.isGroup) {
        const privateKey = receiveGroupKey(chat, action.payload.encryptionMessages, userId, state.privateKey);
        if (privateKey) {
          chat.privateKey = privateKey;
          const privateKeyRequests = action.payload.requests || [];
          if (privateKeyRequests.length) sendGroupKeys(chatId, userId, privateKeyRequests, privateKey, state.privateKey);
        }
        else requestGroupPrivateKey(userId, chatId, state.publicKey);
      }
      return {
        ...state,
        chats,
      };
    }

    case "FETCH_CHAT_MESSAGES_PENDING": {
      logger.log('CHAT', `Redux -> Loading More Messages: `, action.payload, action.meta);
      const { chatId } = action.meta;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      chat.loadingMessages = true;
      return {
        ...state,
        chats,
      };
    }

    case "FETCH_CHAT_MESSAGES_FULFILLED": {
      logger.log('CHAT', `Redux -> Loaded More Messages: `, action.payload, action.meta);
      const { chatId } = action.meta;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      const chatMessages = chat.messages.map(message => message.messageId);
      const nextMessages = action.payload.messages.filter(message => !chatMessages.includes(message.messageId));
      const messages = [...nextMessages, ...chat.messages]
        .filter(message => message.messageId > chat.lastCleared)
        .filter(message => !chat.deletedMessages.includes(message.messageId))
        .filter(message => !message.keyReceiver)
        .filter(message => !chat.blockedUsers.includes(message.senderId))
        .sort((m1, m2) => parseInt(m1.messageId) - parseInt(m2.messageId));
      chat.noMoreMessages = !action.payload.messages.length;
      chat.loadingMessages = false;
      chat.messages = messages;
      return {
        ...state,
        chats,
      };
    }

    case "FETCH_UNREAD_MESSAGES_FULFILLED": {
      logger.log('CHAT', `Redux -> Unread Messages: `, action.payload);
      const { unreadMessages: newUnreadMessages } = action.payload;
      const unreadMessages = JSON.parse(JSON.stringify(state.unreadMessages));
      newUnreadMessages.forEach(message => !unreadMessages.find(unread => unread.messageId === message.messageId) && unreadMessages.push(message));
      return {
        ...state,
        unreadMessages,
      };
    }

    case "CLEAR_UNREAD_INDICATOR": {
      logger.log('CHAT', `Redux -> Clearing Unread Indicator`);
      const unreadMessages = JSON.parse(JSON.stringify(state.unreadMessages));
      unreadMessages.forEach(unreadMessage => unreadMessage.read = true);
      return {
        ...state,
        unreadMessages,
      };
    }

    case "OPEN_CHAT": {
      logger.log('CHAT', `Redux -> Open Chat: `, action.payload);
      const chatId = action.payload.chatId;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      chat.closed = false;
      chat.minimised = false;
      chat.maximised = false;
      const openChats = chats.filter(candidate => !candidate.closed && candidate.chatId !== chatId);
      if (openChats.length > 3) Array.from(Array(openChats.length - 3)).forEach((_, index) => openChats[index].closed = true);
      return {
        ...state,
        chats,
      }
    }

    case "CLOSE_CHAT": {
      logger.log('CHAT', `Redux -> Close Chat: `, action.payload);
      const chatId = action.payload.chatId;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      chat.closed = true;
      return {
        ...state,
        chats,
      }
    }

    case "CREATE_CHAT_FULFILLED": {
      logger.log('CHAT', `Redux -> Created Chat: `, action.payload, action.meta);
      const encryption = action.meta.encryption || {};
      const created = action.payload.chat;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chatAlreadyExists = chats.map(chat => parseInt(chat.chatId)).includes(parseInt(created.chatId));
      if (!chatAlreadyExists) chats.push(created);
      const chat = chats.find(candidate => candidate.chatId === created.chatId);
      chat.closed = !!chat.individualGameId;
      chat.minimised = false;
      chat.maximised = false;
      if (!chatAlreadyExists) Object.assign(chat, encryption);
      if (!chatAlreadyExists) prepareGroupKeysToSend(chat, parseInt(action.meta.userId), state.contacts, state.publicKey, state.privateKey);
      if (!chat.closed) {
        const openChats = chats.filter(candidate => !candidate.closed && candidate.chatId !== created.chatId);
        if (openChats.length > 3) Array.from(Array(openChats.length - 3)).forEach((_, index) => openChats[index].closed = true);
      }
      return {
        ...state,
        chats,
      };
    }

    case "NEW_CHAT": {
      logger.log('CHAT', `Redux -> New Chat: `, action.payload);
      const { chat } = action.payload;
      const isGameGroupInvite = chat.individualGameId && !(chat.owners || []).includes(state.userId);
      chat.closed = !isGameGroupInvite && !chat.isGroup && (chat.messages || []).length === 0;
      const chats = JSON.parse(JSON.stringify(state.chats));
      if (chats.map(chat => chat.chatId).includes(chat.chatId)) return state;
      chats.push(chat);
      if (!chat.closed) {
        const openChats = chats.filter(candidate => !candidate.closed && candidate.chatId !== chat.chatId);
        if (openChats.length > 3) Array.from(Array(openChats.length - 3)).forEach((_, index) => openChats[index].closed = true);
      }
      return {
        ...state,
        chats,
      };
    }

    case "NEW_MESSAGE": {
      logger.log('CHAT', `Redux -> New Message: `, action.payload, action.meta);
      const message = action.payload.message;
      const userId = action.meta.userId;
      const chatId = message.chatId;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      const unreadMessages = JSON.parse(JSON.stringify(state.unreadMessages));
      if (!chat) return state;
      if (chat.blocked) return state;
      if (chat.blockedUsers.includes(message.senderId)) return state;
      if (!chat.muted && !window.focused && message.senderId !== userId) playMessageSound();
      if (window.document.hidden) window.document.title = `(${parseInt(((/\(([^)]+)\)/.exec(window.document.title) || [])[1] || 0)) + 1}) myG`;
      if (!chat.muted && !message.keyReceiver) {
        const openChats = chats.filter(candidate => !candidate.closed && candidate.chatId !== chatId);
        if (openChats.length <= 3) chat.closed = false;
        else unreadMessages.push(message);
      }
      if (!chat.messages) chat.messages = [];
      if (!message.keyReceiver) chat.messages.push(message);
      if (message.keyReceiver === userId) {
        const privateKey = receiveGroupKey(chat, [message], userId, state.privateKey);
        if (privateKey) chat.privateKey = privateKey;
      }
      return {
        ...state,
        chats,
        unreadMessages,
      };
    }

    case "UPDATE_MESSAGE": {
      logger.log('CHAT', `Redux -> Update Message: `, action.payload);
      const message = action.payload.message;
      const chatId = message.chatId;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (chat.blocked) return state;
      const updated = chat.messages.find(candidate => candidate.messageId === message.messageId);
      if (updated) {
        updated.content = message.content;
        updated.backup = message.backup;
        updated.edited = message.edited;
        updated.deleted = message.deleted;
      }
      else {
        chat.messages.push(message);
      }
      chat.messages = chat.messages.sort((m1, m2) => parseInt(m1.messageId) - parseInt(m2.messageId));
      return {
        ...state,
        chats,
      };
    }

    case "UPDATE_LINK_FULFILLED": {
      logger.log('CHAT', `Redux -> Link Updated: `, action.payload, action.meta);
      const chatId = parseInt(action.meta.chatId);
      const uuid = action.meta.uuid;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      const index = chat.links.indexOf(chat.links.find(link => link.uuid === uuid));
      chat.links.splice(index, 1, action.payload.link);
      return {
        ...state,
        chats,
      };
    }

    case "ON_MESSAGES_DELETED": {
      logger.log('CHAT', `Redux -> On Messages Deleted: `, action.payload);
      const chatId = parseInt(action.payload.chatId);
      const messages = action.payload.messages;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (chat.blocked) return state;
      messages.forEach(message => {
        const toDelete = chat.messages.find(candidate => candidate.messageId === message.messageId);
        const index = chat.messages.indexOf(toDelete);
        chat.messages.splice(index, 1);
      });
      return {
        ...state,
        chats,
      };
    }

    case "ON_REACTION_ADDED": {
      logger.log('CHAT', `Redux -> On Reaction Added: `, action.payload);
      const chatId = parseInt(action.payload.chatId);
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      const message = chat.messages.find(message => message.messageId === action.payload.messageId);
      if (message) message.reactions.push(action.payload);
      return {
        ...state,
        chats,
      };
    }

    case "ON_REACTION_REMOVED": {
      logger.log('CHAT', `Redux -> On Reaction Removed: `, action.payload);
      const chatId = parseInt(action.payload.chatId);
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      const message = chat.messages.find(message => message.messageId === action.payload.messageId);
      if (message) message.reactions = message.reactions.filter(reaction => reaction.id !== action.payload.id);
      return {
        ...state,
        chats,
      };
    }

    case "ON_CHAT_DELETED": {
      logger.log('CHAT', `Redux -> On Chat Deleted: `, action.payload);
      const chatId = parseInt(action.payload.chatId);
      const chats = JSON.parse(JSON.stringify(state.chats)).filter(chat => parseInt(chat.chatId) !== parseInt(chatId));
      if (state.guestId) notifyToast('This Group has been deleted.');
      return {
        ...state,
        chats,
      };
    }

    case "UPDATE_CHAT_FULFILLED": {
      logger.log('CHAT', `Redux -> Chat Updated: `, action.meta);
      const { chatId, muted, isPrivate, blocked, blockedUsers, title, icon, selfDestruct } = action.meta;
      if (blocked === undefined && muted === undefined && title === undefined && icon === undefined && selfDestruct === undefined && isPrivate === undefined && blockedUsers === undefined) return state;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (blocked !== undefined) chat.blocked = blocked;
      if (muted !== undefined) chat.muted = muted;
      if (isPrivate !== undefined) chat.isPrivate = isPrivate;
      if (title !== undefined) chat.title = title;
      if (icon !== undefined) chat.icon = icon;
      if (selfDestruct !== undefined) chat.selfDestruct = selfDestruct;
      if (blockedUsers !== undefined) chat.blockedUsers = blockedUsers;
      return {
        ...state,
        chats,
      };
    }

    case "FETCH_BLOCKED_USERS_FULFILLED": {
      logger.log('CHAT', `Redux -> Blocked Users Updated: `, action.payload);
      const blockedUsers = action.payload.blockedUsers;
      return {
        ...state,
        blockedUsers,
      };
    }

    case "BLOCK_USER_FULFILLED": {
      logger.log('CHAT', `Redux -> Blocked User - `, action.payload);
      const blockedUsers = action.payload.blockedUsers;
      return {
        ...state,
        blockedUsers,
      };
    }

    case "UNBLOCK_USER_FULFILLED": {
      logger.log('CHAT', `Redux -> Unblocked User - `, action.payload);
      const blockedUsers = action.payload.blockedUsers;
      return {
        ...state,
        blockedUsers,
      };
    }

    case "ON_CHAT_UPDATED": {
      logger.log('CHAT', `Redux -> On Chat Updated: `, action.payload, action.meta);
      const { chatId, title, icon, owners, moderators, guests, isPrivate } = action.payload.chat;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (title !== undefined) chat.title = title;
      if (icon !== undefined) chat.icon = icon;
      if (owners !== undefined) chat.owners = owners;
      if (moderators !== undefined) chat.moderators = moderators;
      if (guests !== undefined) chat.guests = guests;
      if (isPrivate !== undefined) chat.isPrivate = isPrivate;
      return {
        ...state,
        chats,
      };
    }

    case "ADD_CONTACTS_TO_CHAT_FULFILLED": {
      if (action.payload.error) return state;
      logger.log('CHAT', `Redux -> Contacts Added: `, action.payload, action.meta);
      const { chatId } = action.meta;
      const { contacts } = action.payload;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (!chat.contacts.includes(contacts[0].contactId)) chat.contacts.push(contacts[0].contactId);
      if (!chat.fullContacts.map(contact => contact.contactId).includes(contacts[0].contactId)) chat.fullContacts.push(contacts[0]);
      return {
        ...state,
        chats,
      };
    }

    case "CLEAR_CHAT_FULFILLED": {
      logger.log('CHAT', `Redux -> Chat Cleared: ${action.meta.chatId}`);
      const chatId = action.meta.chatId;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      chat.messages = [];
      return {
        ...state,
        chats,
      };
    }

    case "DELETE_MESSAGE_FULFILLED": {
      logger.log('CHAT', `Redux -> Deleted Message: `, action.meta);
      const { chatId, messageId, origin } = action.meta;
      if (origin === 'sent') return state;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      chat.messages = chat.messages.filter(message => message.messageId !== messageId);
      return {
        ...state,
        chats,
      };
    }

    case "ON_TYPING": {
      logger.log('CHAT', `Redux -> Typing: `, action.meta, action.payload);
      const { chatId, userId, isTyping } = action.payload;
      const { userId: thisUserId } = action.meta;
      if (userId === thisUserId) return state;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (!chat.typing) chat.typing = [];
      const userTypingIndex = chat.typing.indexOf(userId);
      const isUserAlreadyTyping = userTypingIndex !== -1;
      if (isTyping && isUserAlreadyTyping) return state;
      if (!isTyping && !isUserAlreadyTyping) return state;
      if (isTyping && !isUserAlreadyTyping) chat.typing.push(userId);
      if (!isTyping && isUserAlreadyTyping) chat.typing.splice(userTypingIndex, 1);
      return {
        ...state,
        chats,
      };
    }

    case "EXIT_GROUP_FULFILLED": {
      logger.log('CHAT', `Redux -> User Exited Group: `, action.meta);
      const { chatId } = action.meta;
      const chats = JSON.parse(JSON.stringify(state.chats)).filter(chat => parseInt(chat.chatId) !== parseInt(chatId));
      return {
        ...state,
        chats,
      };
    }

    case "ON_USER_JOINED": {
      logger.log('CHAT', `Redux -> User Joined Group: `, action.payload, action.meta);
      const { chatId, contacts, entryLog } = action.payload;
      const { userId: thisUserId } = action.meta;
      const contact = contacts.filter(contact => contact.contactId !== thisUserId)[0];
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (!chat) return state;
      if (entryLog && !chat.entryLogs) chat.entryLogs = [];
      if (entryLog) chat.entryLogs.push(entryLog);
      if (contact && !chat.contacts.includes(contact.contactId)) chat.contacts.push(contact.contactId);
      if (contact && chat.fullContacts && !chat.fullContacts.map(contact => contact.contactId).includes(contact.contactId)) chat.fullContacts.push(contact);
      if (contact) sendGroupKeys(chatId, parseInt(thisUserId), contacts, chat.privateKey, state.privateKey);
      return {
        ...state,
        chats,
      };
    }

    case "ON_USER_LEFT": {
      logger.log('CHAT', `Redux -> User Left Group: `, action.payload, action.meta);
      const { chatId, userId, entryLog } = action.payload;
      const { userId: thisUserId } = action.meta;
      if (parseInt(userId) === parseInt(thisUserId)) {
        const chats = JSON.parse(JSON.stringify(state.chats)).filter(chat => parseInt(chat.chatId) !== parseInt(chatId));
        return {
          ...state,
          chats,
        };
      }
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (!chat) return state;
      if (!chat.entryLogs) chat.entryLogs = [];
      chat.entryLogs.push(entryLog);
      chat.contacts = chat.contacts.filter(contactId => parseInt(contactId) !== parseInt(userId));
      chat.fullContacts = chat.fullContacts.filter(contact => parseInt(contact.contactId) !== parseInt(userId));
      return {
        ...state,
        chats,
      };
    }

    case "ON_GUEST_JOINED": {
      logger.log('CHAT', `Redux -> Guest Joined Group: `, action.payload, action.meta);
      const { chatId, guest, entryLog } = action.payload;
      const { userId: thisUserId } = action.meta;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (!chat) return state;
      if (!chat.guests.includes(guest.guestId)) chat.guests.push(guest.guestId);
      if (!chat.entryLogs) chat.entryLogs = [];
      chat.entryLogs.push(entryLog);
      sendGroupKeys(chatId, thisUserId, [guest], chat.privateKey, state.privateKey);
      return {
        ...state,
        chats,
      };
    }

    case "ON_GUEST_LEFT": {
      logger.log('CHAT', `Redux -> Guest Left Group: `, action.payload, action.meta);
      const { chatId, guestId, entryLog } = action.payload;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => parseInt(candidate.chatId) === parseInt(chatId));
      if (!chat) return state;
      if (!chat.entryLogs) chat.entryLogs = [];
      chat.entryLogs.push(entryLog);
      chat.guests = chat.guests.filter(thisGuestId => thisGuestId !== guestId);
      return {
        ...state,
        chats,
      };
    }

    case "ON_GAME_STARTING": {
      logger.log('CHAT', `Redux -> Game Starting: `, action.payload, action.meta);
      const chatId = action.payload.chatId;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (!chat) return state;
      playMessageSound();
      if (window.document.hidden) window.document.title = `(${parseInt(((/\(([^)]+)\)/.exec(window.document.title) || [])[1] || 0)) + 1}) myG`;
      chat.closed = false;
      chat.minimised = false;
      chat.maximised = false;
      const openChats = chats.filter(candidate => !candidate.closed && candidate.chatId !== chatId);
      if (openChats.length > 3) Array.from(Array(openChats.length - 3)).forEach((_, index) => openChats[index].closed = true);
      if (!chat.messages) chat.messages = [];
      const message = "This game is about to start.";
      const gameStarting = {
        messageId: Number.MAX_SAFE_INTEGER,
        chatId: chatId,
        senderId: null,
        keyReceiver: null,
        senderName: "myG",
        content: encryptMessage(message, chat.publicKey, deserializeKey(chat.privateKey)),
        backup: null,
        deleted: false,
        edited: false,
        selfDestruct: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      chat.messages.push(gameStarting);
      chat.gameStarting = gameStarting;
      return {
        ...state,
        chats,
      };
    }

    case "MARK_AS_READ": {
      logger.log('CHAT', `Redux -> Mark As Read: `, action.meta, action.payload);
      const { userId: thisUserId } = action.meta;
      const { userId, chatId, lastRead } = action.payload;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (userId === thisUserId) chat.lastRead = lastRead;
      else {
        if (!chat.lastReads) chat.lastReads = {};
        chat.lastReads[userId] = lastRead;
      }
      return {
        ...state,
        chats,
      };
    }

    case "SELF_DESTRUCT": {
      logger.log('CHAT', `Redux -> Self Destruct: `, action.payload);
      const { chatId, selfDestruct } = action.payload;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      chat.selfDestruct = selfDestruct;
      return {
        ...state,
        chats,
      };
    }

    case "PUBLIC_KEY_UPDATED": {
      logger.log('CHAT', `Redux -> Public Key Updated (Chat): `, action.payload, action.meta);
      const { userId: thisUserId } = action.meta;
      const { userId: updatedUserId, chatId, publicKey } = action.payload;
      const { privateKey } = state;
      if (parseInt(updatedUserId) === parseInt(thisUserId)) return state;
      if (!chatId) return contactPublicKeyUpdated(state, updatedUserId, publicKey);
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      const lastFriendRead = new Date(chat.friendReadDate);
      const unreadMessages = [];
      chat.messages.slice(0).reverse().some(message => {
        const messageDate = new Date(message.createdAt);
        if (messageDate > lastFriendRead && message.senderId === thisUserId) {
          unreadMessages.push(message);
          return false;
        }
        return true;
      });
      reEncryptMessages(unreadMessages, publicKey, privateKey);
      if (chat.isGroup && chat.fullContacts) {
        const updatedUser = chat.fullContacts.find(contact => parseInt(contact.contactId) === parseInt(updatedUserId));
        updatedUser.publicKey = publicKey;
        sendGroupKeys(chat.chatId, thisUserId, [updatedUser], chat.privateKey, privateKey);
      }
      return {
        ...state,
        chats,
      };
    }

    case "CHAT_STATE_UPDATED": {
      logger.log('CHAT', `Redux -> Chat State Updated: `, action.payload);
      const chatId = action.meta.chatId;
      const { maximised, minimised } = action.payload;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const chat = chats.find(candidate => candidate.chatId === chatId);
      if (!chat) return state;
      if (minimised !== undefined) chat.minimised = minimised;
      if (maximised !== undefined) chat.maximised = maximised;
      return {
        ...state,
        chats,
      };
    }

    case "REGISTER_GUEST_FULFILLED": {
      logger.log('GUEST', `Redux -> Guest Registered (Chat): `, action.payload, action.meta);
      const { guest: { guestId }, chat, chat: { chatId } } = action.payload;
      const { publicKey, privateKey } = action.meta;
      const chats = JSON.parse(JSON.stringify(state.chats));
      const existingChat = chats.find(candidate => candidate.chatId === chatId);
      if (!existingChat) chats.push(chat);
      return {
        ...state,
        guestId,
        publicKey,
        privateKey,
        chats,
      };
    }

    case "GENERATE_KEYS_FULFILLED": {
      if (state.guestLink) setTimeout(() => window.location.replace(state.guestLink));
      return {
        ...state,
        guestLink: null,
        publicKey: action.payload.encryption.publicKey,
        privateKey: action.payload.encryption.privateKey,
      };
    }

    case "VALIDATE_PIN_FULFILLED": {
      if (state.guestLink) setTimeout(() => window.location.replace(state.guestLink));
      return {
        ...state,
        guestLink: null,
        publicKey: action.payload.encryption.publicKey,
        privateKey: action.payload.encryption.privateKey,
      };
    }

    case "SET_GUEST_LINK": {
      logger.log('CHAT', `Redux -> Setting Guest Link: `, action.payload);
      return {
        ...state,
        guestLink: action.payload
      };
    }

    default: return state;

  }
}

function playMessageSound() {
  try {
    new Audio('/assets/sound/notification.mp3').play();
  } catch (error) {
    console.error('Error While Playing Message Notification:', error);
  }
}

function prepareGroupKeysToSend(group, userId, userContacts, userPublicKey, userPrivateKey) {
  if (!group.isGroup) return;
  const chatContacts = group.contacts.filter(contactId => userId !== parseInt(contactId));
  const getContact = contactId => userContacts.find(contact => parseInt(contact.contactId) === parseInt(contactId));
  const contacts = chatContacts.map(contactId => getContact(contactId));
  contacts.push({ contactId: userId, publicKey: userPublicKey });
  sendGroupKeys(group.chatId, userId, contacts, group.privateKey, userPrivateKey);
}

function receiveGroupKey(group, messages, userId, userPrivateKey) {
  if (!group.isGroup) return;
  const message = messages[0];
  if (!message || !message.content || message.keyReceiver !== userId) return;
  const privateKey = decryptMessage(message.content, userPrivateKey);
  if (!privateKey) return;
  confirmGroupPrivateKey(userId, group.chatId);
  return deserializeKey(JSON.parse(privateKey));
}

function contactPublicKeyUpdated(state, contactId, publicKey) {
  const contacts = JSON.parse(JSON.stringify(state.contacts));
  const contact = contacts.find(contact => parseInt(contact.contactId) === parseInt(contactId));
  if (contact) contact.publicKey = publicKey;
  return { ...state, contacts };
}