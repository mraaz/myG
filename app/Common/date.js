function howLongAgo(date) {
  const delta = Date.now() - date
  const seconds = Math.floor(delta / 1000)
  let interval = Math.floor(seconds / 31536000)

  if (interval > 1) {
    return interval + ' years'
  }

  interval = Math.floor(seconds / 2592000)
  if (interval > 1) {
    return interval + ' months'
  }

  interval = Math.floor(seconds / 86400)
  if (interval > 1) {
    return interval + ' days'
  }

  interval = Math.floor(seconds / 3600)
  if (interval > 1) {
    return interval + ' hours'
  }

  interval = Math.floor(seconds / 60)
  if (interval > 1) {
    return interval + ' minutes'
  }

  return Math.floor(seconds) + ' seconds'
}

function toSQLDateTime(date) {
  const isoDate = new Date(date).toISOString()
  const utcDate = new Date(isoDate.replace('T', ' ').split('.')[0])
  const day = utcDate.getDate()
  const month = utcDate.getMonth() + 1
  const year = utcDate.getFullYear()
  const hours = utcDate.getHours()
  const minutes = utcDate.getMinutes()
  const seconds = utcDate.getSeconds()
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

function formatDateTimeFromNow(date) {
  if (!date) return new Date(0)
  if (!date.getHours) date = new Date(date)
  if (isToday(date)) {
    const hoursDiff = date.getHours() - new Date().getHours()
    if (hoursDiff === 0) return `now`
    if (hoursDiff <= 30) return `${hoursDiff}hrs from now`
  }
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}

function formatDateTime(date) {
  if (!date) return new Date(0)
  if (!date.getHours) date = new Date(date)
  const hours = formatAMPM(date)
  if (isToday(date)) return hours
  if (isYesterday(date)) return `Yesterday ${hours}`
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${year}-${month}-${day} ${hours}`
}

function formatAMPM(date) {
  if (!date) return new Date(0)
  if (!date.getHours) date = new Date(date)
  let hours = date.getHours()
  let minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours ? hours : 12
  minutes = minutes < 10 ? '0' + minutes : minutes
  return hours + ':' + minutes + ' ' + ampm
}

function isToday(someDate) {
  if (!someDate) return new Date(0)
  if (!someDate.getHours) someDate = new Date(someDate)
  const today = new Date()
  return someDate.getDate() == today.getDate() && someDate.getMonth() == today.getMonth() && someDate.getFullYear() == today.getFullYear()
}

function isYesterday(someDate) {
  if (!someDate) return new Date(0)
  if (!someDate.getHours) someDate = new Date(someDate)
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
  return (
    someDate.getDate() == yesterday.getDate() &&
    someDate.getMonth() == yesterday.getMonth() &&
    someDate.getFullYear() == yesterday.getFullYear()
  )
}

module.exports = { howLongAgo, toSQLDateTime, formatDateTimeFromNow, formatDateTime, formatAMPM, isToday }
