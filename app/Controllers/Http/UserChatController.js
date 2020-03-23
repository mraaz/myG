'use strict'

const { log } = require('../../Common/logger');
const UserRepository = require('../../Repositories/User');

class UserChatController {

  async storePublicKey({ auth, request, response }) {
    const requestingUserId = auth.user.id;
    const publicKey = request.only('publicKey').publicKey;
    log('USER', `User ${requestingUserId} storing Public Key ${publicKey}`);
    const { success, error } = await UserRepository.storePublicKey({ requestingUserId, publicKey });
    return response.send({ success, error });
  }

  async fetchGames({ auth, response }) {
    const requestingUserIds = [auth.user.id];
    log('USER', `User ${requestingUserIds} requesting Games`);
    const { games } = await UserRepository.fetchGames({ requestingUserIds });
    return response.send({ games });
  }

  async favoriteGame({ auth, params, response }) {
    const requestingUserId = auth.user.id;
    const requestedGameId = params.gameId;
    log('USER', `User ${requestingUserId} favoriting Game ${requestedGameId}`);
    const { success, error } = await UserRepository.favoriteGame({ requestingUserId, requestedGameId });
    return response.send({ success, error });
  }

  async unfavoriteGame({ auth, params, response }) {
    const requestingUserId = auth.user.id;
    const requestedGameId = params.gameId;
    log('USER', `User ${requestingUserId} unfavoriting Game ${requestedGameId}`);
    const { success, error } = await UserRepository.unfavoriteGame({ requestingUserId, requestedGameId });
    return response.send({ success, error });
  }

  async updateGameIcon({ auth, params, request, response }) {
    const requestingUserId = auth.user.id;
    const requestedGameId = params.gameId;
    const icon = request.only(['icon']).icon;
    log('USER', `User ${requestingUserId} updating Icon for Game ${requestedGameId}`);
    const { success, error } = await UserRepository.updateGameIcon({ requestingUserId, requestedGameId, icon });
    return response.send({ success, error });
  }

  async fetchContacts({ auth, response }) {
    const requestingUserId = auth.user.id;
    log('USER', `User ${requestingUserId} requesting Contacts`);
    const { contacts } = await UserRepository.fetchContacts({ requestingUserId });
    return response.send({ contacts });
  }

  async fetchContact({ auth, params, response }) {
    const requestingUserId = auth.user.id;
    const requestedContactId = params.contactId;
    log('USER', `User ${requestingUserId} requesting Contact ${requestedContactId}`);
    const { contact } = await UserRepository.fetchContact({ requestingUserId, requestedContactId });
    return response.send({ contact });
  }

  async fetchStatus({ auth, response }) {
    const requestingUserId = auth.user.id;
    log('USER', `User ${requestingUserId} requesting Status`);
    const { status } = await UserRepository.fetchStatus({ requestingUserId });
    return response.send({ status });
  }

  async updateStatus({ auth, request, response }) {
    const requestingUserId = auth.user.id;
    const requestedStatus = request.only('status').status;
    const forceStatus = request.only(['forceStatus']).forceStatus;
    log('USER', `User ${requestingUserId} changing Status to ${requestedStatus} (${forceStatus ? 'Forced' : 'Not Forced'})`);
    const { status } = await UserRepository.updateStatus({ requestingUserId, requestedStatus, forceStatus });
    return response.send({ status });
  }

  async searchUsers({ auth, request, response }) {
    const requestingUserId = auth.user.id;
    const query = request.only('query').query;
    log('USER', `User ${requestingUserId} searching for other users with ${query}`);
    const { users } = await UserRepository.searchUsers({ requestingUserId, query });
    return response.send({ users });
  }

}

module.exports = UserChatController;
