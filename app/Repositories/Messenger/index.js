
const ChatRepository = require('../../Repositories/Chat');
const UserRepository = require('../../Repositories/User');

class MessengerRepository {
  async prepareMessenger({ requestingUserId }) {
    const contactCountRequest = UserRepository.countContacts({ requestingUserId });
    const gamesRequest = UserRepository.fetchUserGames({ requestingUserId });
    const statusRequest = UserRepository.fetchStatus({ requestingUserId });
    const blockedUsersRequest = ChatRepository.fetchBlockedUsers({ requestingUserId });
    const settingsRequest = UserRepository.fetchSettings({ requestingUserId });
    const contactCount = await contactCountRequest;
    const { games } = await gamesRequest;
    const { status } = await statusRequest;
    const { blockedUsers } = await blockedUsersRequest;
    const { settings } = await settingsRequest;
    return { contactCount, games, status, blockedUsers, settings };
  }
}

module.exports = new MessengerRepository();