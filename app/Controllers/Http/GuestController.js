'use strict'

const { log } = require('../../Common/logger')
const GuestRepository = require('../../Repositories/Guest')

class GuestController {
  async register({ request, response }) {
    log('GUEST', `Registering Guest`)
    const requestedChatId = request.only(['chatId']).chatId
    const requestedAlias = request.only(['alias']).alias
    const uuid = request.only(['uuid']).uuid
    const publicKey = request.only(['publicKey']).publicKey
    const { guest, chat } = await GuestRepository.register({ requestedChatId, requestedAlias, publicKey, uuid })
    return response.send({ guest, chat })
  }

  async fetchLink({ params, response }) {
    const requestedLinkUuid = params.uuid
    log('GUEST', `Guest requesting Link ${requestedLinkUuid}`)
    const { link } = await GuestRepository.fetchLink({ requestedLinkUuid })
    return response.send({ link })
  }

  async fetchChat({ params, response }) {
    const requestedChatId = params.chatId
    log('GUEST', `Guest requesting Chat ${requestedChatId}`)
    const { chat } = await GuestRepository.fetchChat({ requestedChatId })
    return response.send({ chat })
  }

  async fetchMessages({ params, request, response }) {
    const requestedChatId = params.chatId
    const requestedPage = request.only(['page']).page || 0
    log('GUEST', `Guest requesting Messages for Chat ${requestedChatId}`)
    const { messages } = await GuestRepository.fetchMessages({ requestedChatId, requestedPage })
    return response.send({ messages })
  }

  async fetchEncryptionMessages({ params, response }) {
    const requestingGuestId = params.guestId
    const requestedChatId = params.chatId
    log('GUEST', `Guest ${requestingGuestId} requesting Messages for Chat ${requestedChatId}`)
    const { encryptionMessages } = await GuestRepository.fetchEncryptionMessages({ requestingGuestId, requestedChatId })
    return response.send({ encryptionMessages })
  }

  async sendMessage({ params, request, response }) {
    const guestId = params.guestId
    const requestedChatId = params.chatId
    const { backup, content } = request.only('encryptedContent').encryptedContent
    const { replyId, replyContent, replyBackup } = request.only(['replyId', 'replyContent', 'replyBackup'])
    const senderName = request.only('senderName').senderName
    const uuid = request.only('uuid').uuid
    log('GUEST', `Guest ${guestId} sending encrypted Message for Chat ${requestedChatId}`)
    const { message } = await GuestRepository.sendMessage({
      requestedChatId,
      senderName,
      guestId,
      backup,
      content,
      replyId,
      replyContent,
      replyBackup,
      uuid,
    })
    return response.send({ message })
  }

  async editMessage({ params, request, response }) {
    const guestId = params.guestId
    const requestedChatId = params.chatId
    const requestedMessageId = params.messageId
    const { backup, content } = request.only('encryptedContent').encryptedContent
    log('GUEST', `Guest ${guestId} editing encrypted Message ${requestedMessageId} for Chat ${requestedChatId}`)
    const { message } = await GuestRepository.editMessage({ guestId, requestedChatId, requestedMessageId, backup, content })
    return response.send({ message })
  }

  async deleteMessage({ params, response }) {
    const guestId = params.guestId
    const requestedChatId = params.chatId
    const requestedMessageId = params.messageId
    log('GUEST', `Guest ${guestId} deleting Message ${requestedMessageId} for Chat ${requestedChatId}`)
    const { message } = await GuestRepository.deleteMessage({ guestId, requestedChatId, requestedMessageId })
    return response.send({ message })
  }

  async markLastReadGuest({ params, response }) {
    const { guestId, chatId } = params
    log('GUEST', `Guest ${guestId} marking last read for Chat ${chatId}`)
    const { success, error } = await GuestRepository.markLastReadGuest({ guestId, chatId })
    return response.send({ success, error })
  }

  async addReaction({ params, request, response }) {
    const guestId = params.guestId
    const chatId = params.chatId
    const messageId = params.messageId
    const reactionId = request.only('reactionId').reactionId
    const senderName = request.only('senderName').senderName
    log('GUEST', `Guest ${guestId} adding Reaction ${reactionId} to Message ${messageId} for Chat ${chatId}`)
    const { success, error } = await GuestRepository.addReaction({ guestId, chatId, messageId, reactionId, senderName })
    return response.send({ success, error })
  }

  async removeReaction({ params, response }) {
    const guestId = params.guestId
    const chatId = params.chatId
    const messageId = params.messageId
    const reactionId = params.reactionId
    log('GUEST', `Guest ${guestId} removing Reaction ${reactionId} to Message ${messageId} for Chat ${chatId}`)
    const { success, error } = await GuestRepository.removeReaction({ guestId, chatId, messageId, reactionId })
    return response.send({ success, error })
  }

  async fetchEntryLogs({ params, response }) {
    const requestedChatId = params.chatId
    log('GUEST', `Guest requesting Entry Logs for Chat ${requestedChatId}`)
    const { entryLogs } = await GuestRepository.fetchEntryLogs({ requestedChatId })
    return response.send({ entryLogs })
  }

  async fetchChatContacts({ params, response }) {
    const requestedChatId = params.chatId
    log('GUEST', `Guest requesting Contacts for Chat ${requestedChatId}`)
    const { contacts } = await GuestRepository.fetchChatContacts({ requestedChatId })
    return response.send({ contacts })
  }

  async fetchGroupPrivateKeyRequests({ params, response }) {
    const { chatId } = params
    log('CHAT', `Fetching Private Key Requests for Group ${chatId}`)
    const { requests } = await GuestRepository.fetchGroupPrivateKeyRequests({ chatId })
    return response.send({ requests })
  }

  async requestGroupPrivateKey({ params, request, response }) {
    const { guestId, chatId } = params
    const { publicKey } = request.only(['publicKey'])
    log('CHAT', `User ${guestId} requesting Group ${chatId} Private Key`)
    const { success, error } = await GuestRepository.requestGroupPrivateKey({ guestId, chatId, publicKey })
    return response.send({ success, error })
  }

  async confirmGroupPrivateKey({ params, response }) {
    const { guestId, chatId } = params
    log('CHAT', `User ${guestId} confirming Group ${chatId} Private Key`)
    const { success, error } = await GuestRepository.confirmGroupPrivateKey({ guestId, chatId })
    return response.send({ success, error })
  }
}

module.exports = GuestController
