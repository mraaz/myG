
export function howLongAgo(date) {

  if (!date) return new Date(0);
  if (!date.getHours) date = new Date(date);

  const delta = new Date() - date;
  const seconds = Math.floor(delta / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }

  if (seconds < 5) return 'now'

  return Math.floor(seconds) + " seconds ago";

}

export function formatDateTime(date) {
  if (!date) return new Date(0);
  if (!date.getHours) date = new Date(date);
  const hours = formatAMPM(date);
  if (isToday(date)) return hours;
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month}-${day} ${hours}`;
}

export function formatDate(date) {
  if (!date) return new Date(0);
  if (!date.getHours) date = new Date(date);
  const year = date.getFullYear();
  const dateString = date.toLocaleDateString('en-GB', {
    day : 'numeric',
    month : 'short',
    year : 'numeric'
  }).split(' ').join('-');
  return dateString.slice(0, dateString.length - 4) + (year - 2000);
}

export function formatAMPM(date) {
  if (!date) return new Date(0);
  if (!date.getHours) date = new Date(date);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
}

export function isToday(someDate) {
  if (!someDate) return new Date(0);
  if (!someDate.getHours) someDate = new Date(someDate);
  const today = new Date()
  return someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
}

export function isYesterday(someDate) {
  if (!someDate) return new Date(0);
  if (!someDate.getHours) someDate = new Date(someDate);
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  return someDate.getDate() == yesterday.getDate() &&
    someDate.getMonth() == yesterday.getMonth() &&
    someDate.getFullYear() == yesterday.getFullYear()
}

export function isOneDayBehind(date1, date2) {
  const compareDate = new Date(date1);
  const comparingDate = new Date(date2);
  compareDate.setHours(0);
  compareDate.setMinutes(0);
  compareDate.setSeconds(0);
  compareDate.setMilliseconds(0);
  comparingDate.setHours(0);
  comparingDate.setMinutes(0);
  comparingDate.setSeconds(0);
  comparingDate.setMilliseconds(0);
  compareDate.setDate(compareDate.getDate() - 1);
  return comparingDate <= compareDate;
}