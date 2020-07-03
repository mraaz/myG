
const ChatRepository = require('../../Repositories/Chat');
const UserRepository = require('../../Repositories/User');

class MessengerRepository {
  async prepareMessenger({ requestingUserId }) {
    const chatsRequest = ChatRepository.fetchChats({ requestingUserId });
    const contactsRequest = UserRepository.fetchContacts({ requestingUserId });
    const gamesRequest = UserRepository.fetchUserGames({ requestingUserId });
    const statusRequest = UserRepository.fetchStatus({ requestingUserId });
    const blockedUsersRequest = ChatRepository.fetchBlockedUsers({ requestingUserId });
    const settingsRequest = UserRepository.fetchSettings({ requestingUserId });
    const { chats } = await chatsRequest;
    const { contacts } = await contactsRequest;
    const { games } = await gamesRequest;
    const { status } = await statusRequest;
    const { blockedUsers } = await blockedUsersRequest;
    const { settings } = await settingsRequest;
    return { chats, contacts, games, status, blockedUsers, settings };
  }
}

module.exports = new MessengerRepository();