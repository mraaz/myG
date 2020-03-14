
import { isOneDayBehind, isYesterday, convertUTCDateToLocalDate } from './date';

export function withDatesAndLogs(messages, entryLogs) {
  entryLogs = entryLogs.sort((e1, e2) => e1.createdAt - e2.createdAt);
  const enrichedMessages = [];
  let lastDate = new Date();
  const reversedMessages = messages.slice().reverse();
  const reversedEntryLogs = entryLogs.slice().reverse();
  reversedMessages.forEach(message => {
    if (isOneDayBehind(lastDate, convertUTCDateToLocalDate(new Date(message.createdAt)))) {
      lastDate = convertUTCDateToLocalDate(new Date(message.createdAt));
      enrichedMessages.push({ 
        id: lastDate.getTime(), 
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
    enrichedMessages.push(message);
  });
  reversedEntryLogs.forEach(entryLog => enrichedMessages.push({ ...entryLog, isEntryLog: true, messageId: `EntryLog-${entryLog.id}` }));
  return enrichedMessages.reverse();
}