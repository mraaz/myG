
import { isOneDayBehind, isYesterday, convertUTCDateToLocalDate } from './date';

export function enrichMessagesWithDates(messages) {
  const enrichedMessages = [];
  let lastDate = new Date();
  messages.slice().reverse().forEach(message => {
    if (isOneDayBehind(lastDate, convertUTCDateToLocalDate(new Date(message.created_at)))) {
      lastDate = convertUTCDateToLocalDate(new Date(message.created_at));
      enrichedMessages.push({ 
        id: lastDate.getTime(), 
        date: lastDate,
        isDateDivisor: true, 
        isYesterday: isYesterday(lastDate),
      });
    }
    enrichedMessages.push(message);
  });
  return enrichedMessages.reverse();
}