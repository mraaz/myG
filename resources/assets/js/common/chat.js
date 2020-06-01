import { store } from "../redux/Store";
import { openChatAction } from "../redux/actions/chatAction";
import { isOneDayBehind, isYesterday } from './date';

export function withDatesAndLogsAndLastReads(messages, entryLogs, contactsMap, lastReads) {
  entryLogs = entryLogs.sort((e1, e2) => e1.createdAt - e2.createdAt);
  const enrichedMessages = [];
  let lastDate = new Date();
  const reversedMessages = messages.slice().reverse();
  const reversedEntryLogs = entryLogs.slice().reverse();
  const lastReadContacts = {};
  Object.keys(lastReads).forEach(contactId => {
    const messageId = lastReads[contactId];
    if (!lastReadContacts[messageId]) lastReadContacts[messageId] = [];
    if (contactsMap[contactId]) lastReadContacts[messageId].push(contactsMap[contactId]);
  });
  reversedMessages.forEach(message => {
    if (isOneDayBehind(lastDate, new Date(message.createdAt))) {
      lastDate = new Date(message.createdAt);
      enrichedMessages.push({ 
        id: lastDate.getTime(), 
        messageId: lastDate.getTime(), 
        date: lastDate,
        isDateDivisor: true, 
        isYesterday: isYesterday(lastDate),
      });
    }
    const entryLog = reversedEntryLogs[0];
    if (entryLog && new Date(message.createdAt) < new Date(entryLog.createdAt)) {
      enrichedMessages.push({ ...entryLog, isEntryLog: true, messageId: `EntryLog-${entryLog.id}` });
      reversedEntryLogs.splice(0, 1);
    }
    if (lastReadContacts[message.messageId]) {
      enrichedMessages.push({ isLastRead: true, contacts: lastReadContacts[message.messageId], messageId: `LastRead-${message.messageId}` });
    }
    enrichedMessages.push(message);
  });
  reversedEntryLogs.forEach(entryLog => enrichedMessages.push({ ...entryLog, isEntryLog: true, messageId: `EntryLog-${entryLog.id}` }));
  return enrichedMessages.reverse();
}

export function openChat(chatId) {
  store.dispatch(openChatAction(chatId));
}