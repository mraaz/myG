function forceInt(value) {
  return parseInt(value) || null
}

function forceFloat(value) {
  return parseFloat(value) || null
}

function forceString(value) {
  return value ? `${value}` : null
}

function forceArray(value) {
  if (Array.isArray(value)) return value
  const parsed = forceJson(value)
  if (Array.isArray(parsed)) return parsed
  return []
}

function forceJson(value) {
  try {
    return JSON.parse(value)
  } catch (_) {
    return {}
  }
}

function forceBoolean(value) {
  return !!value
}

function forceDate(value) {
  const date = new Date(value)
  if (date.toString() === 'Invalid Date') return new Date(0)
  return date
}

function forceStatus(value) {
  const validStatus = ['online', 'playing', 'afk', 'offline']
  if (!validStatus.includes(value)) return null
  return value
}

module.exports = {
  forceInt,
  forceFloat,
  forceString,
  forceArray,
  forceJson,
  forceBoolean,
  forceDate,
  forceStatus,
}
