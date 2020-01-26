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

}

module.exports = UserChatController;
