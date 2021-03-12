'use strict'

const { log } = require('../../Common/logger')
const ChatRepository = require('../../Repositories/Chat')
const MessengerRepository = require('../../Repositories/Messenger')
const LoggingRepository = require('../../Repositories/Logging')

class ChatController {
  async prepareMessenger({ auth, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const { contactCount, games, status, blockedUsers, settings } = await MessengerRepository.prepareMessenger({ requestingUserId })
      return response.send({ contactCount, games, status, blockedUsers, settings })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async fetchChats({ auth, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const onlyGroups = request.only('onlyGroups').onlyGroups
      log('CHAT', `User ${requestingUserId} requesting ${onlyGroups ? 'Groups' : 'Chats'}`)
      const { chats } = await ChatRepository.fetchChats({ requestingUserId, onlyGroups })
      return response.send({ chats })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async fetchChat({ auth, params, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedChatId = params.chatId
      log('CHAT', `User ${requestingUserId} requesting Chat ${requestedChatId}`)
      const { chat } = await ChatRepository.fetchChat({ requestingUserId, requestedChatId })
      return response.send({ chat })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async fetchChatByIndividualGameId({ auth, params, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedGameId = params.requestedGameId
      log('CHAT', `User ${requestingUserId} requesting Chat for Game ${requestedGameId}`)
      const { chat } = await ChatRepository.fetchChatByIndividualGameId({ requestingUserId, requestedGameId })
      return response.send({ chat })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async createChat({ auth, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const payload = request.only(['contacts', 'owners', 'title', 'icon', 'publicKey', 'isGroup', 'individualGameId', 'gameId'])
      const { contacts, owners, title, icon, publicKey, isGroup, individualGameId, gameId } = payload
      log('CHAT', `User ${requestingUserId} creating ${isGroup ? 'Group' : 'Chat'} with ${JSON.stringify(payload)}`)
      const { chat } = await ChatRepository.createChat({
        requestingUserId,
        contacts,
        owners,
        title,
        icon,
        publicKey,
        isGroup,
        individualGameId,
        gameId,
      })
      return response.send({ chat })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async updateChat({ auth, params, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedChatId = params.chatId
      const { muted, isPrivate, icon, title, owners, moderators, markAsRead, selfDestruct, publicKey } = request.only([
        'muted',
        'isPrivate',
        'icon',
        'title',
        'owners',
        'moderators',
        'markAsRead',
        'selfDestruct',
        'publicKey',
      ])
      log(
        'CHAT',
        `User ${requestingUserId} updating Chat ${requestedChatId} with ${JSON.stringify({
          muted,
          isPrivate,
          icon,
          title,
          owners,
          moderators,
          markAsRead,
          selfDestruct,
          publicKey,
        })}`
      )
      const result = await ChatRepository.updateChat({
        requestingUserId,
        requestedChatId,
        muted,
        isPrivate,
        icon,
        title,
        owners,
        moderators,
        markAsRead,
        selfDestruct,
        publicKey,
      })
      return response.send(result)
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async clearChat({ auth, params, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedChatId = params.chatId
      log('CHAT', `User ${requestingUserId} clearing Chat ${requestedChatId}`)
      const result = await ChatRepository.clearChat({ requestingUserId, requestedChatId })
      return response.send(result)
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async checkChatDestruction({ auth, params, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedChatId = params.chatId
      log('CHAT', `User ${requestingUserId} checking destruction for Chat ${requestedChatId}`)
      const result = await ChatRepository.checkChatDestruction({ requestedChatId })
      return response.send(result)
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async deleteChat({ auth, params, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedChatId = params.chatId
      log('CHAT', `User ${requestingUserId} deleting Chat ${requestedChatId}`)
      const result = await ChatRepository.deleteChat({ requestingUserId, requestedChatId })
      return response.send(result)
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async forceDeleteChat({ auth, params, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedChatId = params.chatId
      log('CHAT', `User ${requestingUserId} force deleting Chat ${requestedChatId}`)
      const result = await ChatRepository.deleteChat({ requestingUserId, requestedChatId, forceDelete: true })
      return response.send(result)
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async searchGroup({ auth, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const groupName = request.only('groupName').groupName
      const requestedPage = request.only(['page']).page || 0
      log('CHAT', `User ${requestingUserId} searching for Groups for page ${requestedPage || 0} with ${groupName}`)
      const { groups } = await ChatRepository.searchGroup({ requestingUserId, groupName, requestedPage })
      return response.send({ groups })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async fetchChatNotifications({ auth, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedPage = request.only(['page']).page || 0
      const requestedType = request.only(['type']).type || 'ALL'
      log('CHAT', `User ${requestingUserId} requesting Chat Notifications for page ${requestedPage} and type ${requestedType}`)
      const { notifications } = await ChatRepository.fetchChatNotifications({ requestingUserId, requestedPage, requestedType })
      return response.send({ notifications })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async markChatNotificationAsRead({ auth, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const id = request.only(['id']).id || 'ALL'
      log('CHAT', `User ${requestingUserId} marking Chat Notifications ${id} as read`)
      const { success } = await ChatRepository.markChatNotificationAsRead({ requestingUserId, id })
      return response.send({ success })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async deleteChatNotifications({ auth, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      log('CHAT', `User ${requestingUserId} clearing Chat Notifications`)
      const { success } = await ChatRepository.deleteChatNotifications({ requestingUserId })
      return response.send({ success })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async exitGroup({ auth, params, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedChatId = params.chatId
      log('CHAT', `User ${requestingUserId} exiting Group ${requestedChatId}`)
      const result = await ChatRepository.exitGroup({ requestingUserId, requestedChatId })
      return response.send(result)
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async removeFromGroup({ auth, params, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedUserId = params.userId
      const requestedChatId = params.chatId
      log('CHAT', `User ${requestedUserId} being removed from Group ${requestedChatId} by User ${requestingUserId}`)
      const result = await ChatRepository.exitGroup({ requestingUserId, requestedChatId, requestedUserId })
      return response.send(result)
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async fetchChatContacts({ auth, params, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedChatId = params.chatId
      log('CHAT', `User ${requestingUserId} requesting Chat Contacts for ${requestedChatId}`)
      const { contacts } = await ChatRepository.fetchChatContacts({ requestingUserId, requestedChatId })
      return response.send({ contacts })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async addContactsToChat({ auth, params, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedChatId = params.chatId
      const requestedContacts = request.only(['contacts']).contacts
      const fromLink = request.only(['fromLink']).fromLink
      log('CHAT', `User ${requestingUserId} adding ${JSON.stringify(requestedContacts)} to Chat ${requestedChatId}`)
      const { contacts, error } = await ChatRepository.addContactsToChat({
        requestingUserId,
        requestedChatId,
        contacts: requestedContacts,
        fromLink,
      })
      return response.send({ contacts, error })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async fetchMessages({ auth, params, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedChatId = params.chatId
      const requestedPage = request.only(['page']).page || 0
      log('CHAT', `User ${requestingUserId} requesting Messages for Chat ${requestedChatId}`)
      const { messages } = await ChatRepository.fetchMessages({ requestingUserId, requestedChatId, requestedPage })
      return response.send({ messages })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async fetchRecentMessages({ auth, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      log('CHAT', `User ${requestingUserId} requesting recent messages`)
      const { messages } = await ChatRepository.fetchRecentMessages({ requestingUserId })
      return response.send({ messages })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async fetchUnreadMessages({ auth, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const count = !!request._qs.count
      log('CHAT', `User ${requestingUserId} requesting Unread Messages ${count ? 'Count' : ''}`)
      const { unreadMessages } = await ChatRepository.fetchUnreadMessages({ requestingUserId, count })
      return response.send({ unreadMessages })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async fetchEncryptionMessages({ auth, params, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedChatId = params.chatId
      log('CHAT', `User ${requestingUserId} requesting Encryption Messages for Chat ${requestedChatId}`)
      const { encryptionMessages } = await ChatRepository.fetchEncryptionMessages({ requestingUserId, requestedChatId })
      return response.send({ encryptionMessages })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async sendMessage({ auth, params, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedChatId = params.chatId
      const { backup, content } = request.only('encryptedContent').encryptedContent
      const { replyId, replyContent, replyBackup } = request.only(['replyId', 'replyContent', 'replyBackup'])
      const senderName = request.only('senderName').senderName
      const keyReceiver = request.only('keyReceiver').keyReceiver
      const attachment = request.only('attachment').attachment
      const forceSelfDestruct = request.only('forceSelfDestruct').forceSelfDestruct
      const uuid = request.only('uuid').uuid
      log('CHAT', `User ${requestingUserId} sending encrypted ${keyReceiver ? 'Key' : 'Message'} for Chat ${requestedChatId}`)
      const { message } = await ChatRepository.sendMessage({
        requestingUserId,
        requestedChatId,
        senderName,
        keyReceiver,
        backup,
        content,
        attachment,
        replyId,
        replyContent,
        replyBackup,
        uuid,
        forceSelfDestruct,
      })
      return response.send({ message })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async editMessage({ auth, params, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedChatId = params.chatId
      const requestedMessageId = params.messageId
      const { backup, content } = request.only('encryptedContent').encryptedContent
      const reEncrypting = request.only('reEncrypting').reEncrypting
      log(
        'CHAT',
        `User ${requestingUserId} ${reEncrypting ? 're-encrypting' : 'editing'} Message ${requestedMessageId} for Chat ${requestedChatId}`
      )
      const { message } = await ChatRepository.editMessage({
        requestingUserId,
        requestedChatId,
        requestedMessageId,
        backup,
        content,
        reEncrypting,
      })
      return response.send({ message })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async deleteMessage({ auth, params, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedChatId = params.chatId
      const requestedMessageId = params.messageId
      log('CHAT', `User ${requestingUserId} deleting Message ${requestedMessageId} for Chat ${requestedChatId}`)
      const { message } = await ChatRepository.deleteMessage({ requestingUserId, requestedChatId, requestedMessageId })
      return response.send({ message })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async addReaction({ auth, params, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const chatId = params.chatId
      const messageId = params.messageId
      const reactionId = request.only('reactionId').reactionId
      log('CHAT', `User ${requestingUserId} adding Reaction ${reactionId} to Message ${messageId} for Chat ${chatId}`)
      const { success, error } = await ChatRepository.addReaction({ requestingUserId, chatId, messageId, reactionId })
      return response.send({ success, error })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async removeReaction({ auth, params, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const chatId = params.chatId
      const messageId = params.messageId
      const reactionId = params.reactionId
      log('CHAT', `User ${requestingUserId} removing Reaction ${reactionId} to Message ${messageId} for Chat ${chatId}`)
      const { success, error } = await ChatRepository.removeReaction({ requestingUserId, chatId, messageId, reactionId })
      return response.send({ success, error })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async setTyping({ auth, params, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedChatId = params.chatId
      const isTyping = request.only('isTyping').isTyping
      log('CHAT', `User ${requestingUserId} ${isTyping ? 'Is Typing' : 'Stopped Typing'} on Chat ${requestedChatId}`)
      const result = await ChatRepository.setTyping({ requestingUserId, requestedChatId, isTyping })
      return response.send(result)
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async fetchChatInfo({ auth, params, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedChatId = params.chatId
      log('CHAT', `User ${requestingUserId} requesting Group Info for Chat ${requestedChatId}`)
      const { chat } = await ChatRepository.fetchChatInfo({ requestingUserId, requestedChatId })
      return response.send({ chat })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async fetchBlockedUsers({ auth, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      log('CHAT', `User ${requestingUserId} requesting Blocked Users`)
      const { blockedUsers } = await ChatRepository.fetchBlockedUsers({ requestingUserId })
      return response.send({ blockedUsers })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async blockUser({ auth, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedUserId = request.only('blockedUserId').blockedUserId
      log('CHAT', `User ${requestingUserId} blocking User ${requestedUserId}`)
      const { blockedUsers } = await ChatRepository.blockUser({ requestingUserId, requestedUserId })
      return response.send({ blockedUsers })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async unblockUser({ auth, params, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedUserId = params.blockedUserId
      log('CHAT', `User ${requestingUserId} unblocking User ${requestedUserId}`)
      const { blockedUsers } = await ChatRepository.unblockUser({ requestingUserId, requestedUserId })
      return response.send({ blockedUsers })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async fetchLinks({ auth, params, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedChatId = params.chatId
      log('CHAT', `User ${requestingUserId} requesting Links for Chat ${requestedChatId}`)
      const { links } = await ChatRepository.fetchLinks({ requestingUserId, requestedChatId })
      return response.send({ links })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async fetchLink({ auth, params, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedLinkUuid = params.uuid
      log('CHAT', `User ${requestingUserId} requesting Link ${requestedLinkUuid}`)
      const { link } = await ChatRepository.fetchLink({ requestedLinkUuid })
      return response.send({ link })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async updateLink({ auth, params, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedChatId = params.chatId
      const requestedLinkUuid = params.uuid
      const { expiry, expire } = request.only(['expiry', 'expire'])
      log('CHAT', `User ${requestingUserId} updating link ${requestedLinkUuid} for Chat ${requestedChatId} - ${expiry} / ${expire}`)
      const { link } = await ChatRepository.updateLink({ requestedChatId, requestedLinkUuid, expiry, expire })
      return response.send({ link })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async fetchEntryLogs({ auth, params, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedChatId = params.chatId
      log('CHAT', `User ${requestingUserId} requesting Entry Logs for Chat ${requestedChatId}`)
      const { entryLogs } = await ChatRepository.fetchEntryLogs({ requestedChatId })
      return response.send({ entryLogs })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async acceptGameGroupInvitation({ auth, params, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedUserId = request.only(['userId']).userId
      const requestedGameId = params.gameId
      log('CHAT', `User ${requestingUserId} accepting to join Game Group ${requestedGameId}`)
      const { success, error } = await ChatRepository.acceptGameGroupInvitation({ requestedUserId, requestedGameId })
      return response.send({ success, error })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async fetchContactsPaginated({ auth, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const { status, page: requestedPage, gameId } = request.only(['status', 'page', 'gameId'])
      const search = request.only('search').search
      log('USER', `User ${requestingUserId} requesting Contacts with status ${status} and page ${requestedPage}`)
      if (gameId) {
        const { contacts } = await ChatRepository.fetchContactsByGame({ requestingUserId, status, gameId, search })
        return response.send({ contacts })
      }
      const { contacts, count } = await ChatRepository.fetchContactsPaginated({ requestingUserId, status, requestedPage, search })
      return response.send({ contacts, count })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async fetchGroupsPaginated({ auth, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedPage = request.only('page').page
      const gameId = request.only('gameId').gameId
      const search = request.only('search').search
      log('CHAT', `User ${requestingUserId} requesting Groups paginated`)
      const { groups } = await ChatRepository.fetchGroupsPaginated({ requestingUserId, requestedPage, gameId, search })
      return response.send({ groups })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async fetchGamesPaginated({ auth, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedPage = request.only('page').page
      const search = request.only('search').search
      log('CHAT', `User ${requestingUserId} requesting Games paginated`)
      const { games } = await ChatRepository.fetchGamesPaginated({ requestingUserId, requestedPage, search })
      return response.send({ games })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async searchPaginated({ auth, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const requestedPage = request.only('page').page
      const search = request.only('search').search
      log('CHAT', `User ${requestingUserId} searching for ${search} paginated`)
      const { contacts, groups, games } = await ChatRepository.searchPaginated({ requestingUserId, requestedPage, search })
      return response.send({ contacts, groups, games })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async fetchGroupPrivateKeyRequests({ auth, params, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const { chatId } = params
      log('CHAT', `User Fetching Private Key Requests for Group ${chatId}`)
      const { requests } = await ChatRepository.fetchGroupPrivateKeyRequests({ chatId })
      return response.send({ requests })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async requestGroupPrivateKey({ auth, params, request, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const { chatId } = params
      const { publicKey } = request.only(['publicKey'])
      log('CHAT', `User ${requestingUserId} requesting Group ${chatId} Private Key`)
      const { success, error } = await ChatRepository.requestGroupPrivateKey({ userId: requestingUserId, chatId, publicKey })
      return response.send({ success, error })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }

  async confirmGroupPrivateKey({ auth, params, response }) {
    try {
      const requestingUserId = auth.user.id
      if (!requestingUserId) throw new Error('Auth Error')
      const { chatId } = params
      log('CHAT', `User ${requestingUserId} confirming Group ${chatId} Private Key`)
      const { success, error } = await ChatRepository.confirmGroupPrivateKey({ userId: requestingUserId, chatId })
      return response.send({ success, error })
    } catch (error) {
      LoggingRepository.log({
        environment: process.env.NODE_ENV,
        type: 'error',
        source: 'backend',
        context: __filename,
        message: (error && error.message) || error,
      })
    }
  }
}

module.exports = ChatController
