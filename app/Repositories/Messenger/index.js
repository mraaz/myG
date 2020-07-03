
const ChatRepository = require('../../Repositories/Chat');
const UserRepository = require('../../Repositories/User');

class MessengerRepository {
  async prepareMessenger({ requestingUserId }) {
    const statusRequest = UserRepository.fetchStatus({ requestingUserId });
    const blockedUsersRequest = ChatRepository.fetchBlockedUsers({ requestingUserId });
    const settingsRequest = UserRepository.fetchSettings({ requestingUserId });

    const { status } = await statusRequest;
    const { blockedUsers } = await blockedUsersRequest;
    const { settings } = await settingsRequest;

    return { status, blockedUsers, settings };
  }
}

module.exports = new MessengerRepository();