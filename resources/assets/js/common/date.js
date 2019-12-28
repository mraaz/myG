
export function howLongAgo(date) {

  const delta = Date.now() - date;
  const seconds = Math.floor(delta / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }

  return Math.floor(seconds) + " seconds";

}

export function formatDateTime(date) {
  const hours = formatAMPM(date);
  if (isToday(date)) return hours;
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month}-${day} ${hours}`;
}

export function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

export function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
}

export function isToday(someDate) {
  const today = new Date()
  return someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
}

export function isYesterday(someDate) {
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

export function convertUTCDateToLocalDate(date) {
  return new Date(
    Date.UTC(date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  );
}