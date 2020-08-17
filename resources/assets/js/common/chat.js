import axios from 'axios'
import { store } from '../redux/Store'
import { openChatAction, createChatAction } from '../redux/actions/chatAction'
import { isOneDayBehind, isYesterday } from './date'
import { getAssetUrl } from './assets'

export function withDatesAndLogsAndLastReads(messages, entryLogs, contactsMap, lastReads, guestId) {
  entryLogs = entryLogs.sort((e1, e2) => e1.createdAt - e2.createdAt)
  const enrichedMessages = []
  let lastDate = new Date()
  const reversedMessages = messages.slice().reverse()
  const reversedEntryLogs = entryLogs.slice().reverse()
  const lastReadContacts = {}
  Object.keys(lastReads).forEach((contactId) => {
    const messageId = lastReads[contactId]
    if (!lastReadContacts[messageId]) lastReadContacts[messageId] = []
    if (`${contactId}`.startsWith('Guest')) {
      const id = contactId.split('Guest #')[1]
      if (parseInt(id) !== parseInt(guestId)) {
        lastReadContacts[messageId].push({
          contactId,
          icon: getAssetUrl('ic_guest_icon'),
          name: contactId,
        })
      }
    }
    if (contactsMap[contactId]) lastReadContacts[messageId].push(contactsMap[contactId])
  })
  reversedMessages.forEach((message) => {
    if (isOneDayBehind(lastDate, new Date(message.createdAt))) {
      lastDate = new Date(message.createdAt)
      enrichedMessages.push({
        id: lastDate.getTime(),
        messageId: lastDate.getTime(),
        date: lastDate,
        isDateDivisor: true,
        isYesterday: isYesterday(lastDate),
      })
    }
    const entryLog = reversedEntryLogs[0]
    if (entryLog && new Date(message.createdAt) < new Date(entryLog.createdAt)) {
      enrichedMessages.push({ ...entryLog, isEntryLog: true, messageId: `EntryLog-${entryLog.id}` })
      reversedEntryLogs.splice(0, 1)
    }
    if (lastReadContacts[message.messageId]) {
      enrichedMessages.push({ isLastRead: true, contacts: lastReadContacts[message.messageId], messageId: `LastRead-${message.messageId}` })
    }
    enrichedMessages.push(message)
  })
  reversedEntryLogs.forEach((entryLog) => enrichedMessages.push({ ...entryLog, isEntryLog: true, messageId: `EntryLog-${entryLog.id}` }))
  const unreversedMessages = enrichedMessages.reverse()
  return unreversedMessages
}

export function openChat(chatId) {
  store.dispatch(openChatAction(chatId))
}

export function openChatForGame(gameId) {
  axios.get(`/api/chat_by_game/${gameId}`).then((response) => {
    const chat = response && response.data && response.data.chat
    const chatId = response && response.data && response.data.chat && response.data.chat.chatId
    if (chat && chatId) store.dispatch(openChatAction(chatId, chat))
  })
}

export function openChatById(chatId) {
  axios.get(`/api/chat/${chatId}`).then((response) => {
    const chat = response && response.data && response.data.chat
    const chatId = response && response.data && response.data.chat && response.data.chat.chatId
    if (chat && chatId) store.dispatch(openChatAction(chatId, chat))
  })
}

export function openChatByContact(contactId) {
  const userId = store.getState().user.userId;
  store.dispatch(createChatAction([parseInt(contactId)], parseInt(userId)));
}
