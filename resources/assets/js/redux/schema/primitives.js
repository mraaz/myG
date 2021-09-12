export function forceInt(value) {
  return parseInt(value) !== NaN ? parseInt(value) : null
}

export function forceFloat(value) {
  return parseFloat(value) !== NaN ? parseFloat(value) : null
}

export function forceString(value) {
  return value ? `${value}` : null
}

export function forceArray(value) {
  if (Array.isArray(value)) return value
  const parsed = forceJson(value)
  if (Array.isArray(parsed)) return parsed
  return []
}

export function forceJson(value) {
  try {
    return JSON.parse(value)
  } catch (_) {
    return {}
  }
}

export function forceBoolean(value) {
  return !!value
}

export function forceDate(value) {
  const date = new Date(value)
  if (date.toString() === 'Invalid Date') return new Date(0)
  return date
}

export function forceStatus(value) {
  const validStatus = ['online', 'playing', 'afk', 'offline']
  if (!validStatus.includes(value)) return null
  return value
}

export function forceObject(value) {
  if (value && Object.keys(value).length) return value
  return {}
}
