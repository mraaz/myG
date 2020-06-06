export const STATUS_ARRAY = ['online', 'playing', 'afk', 'offline']
export const STATUS_ENUM = { ONLINE: 'online', PLAYING: 'playing', AFK: 'afk', OFFLINE: 'offline' }

export function compareStatus(s1, s2) {
  if (s1 === s2) return 0
  const p1 = STATUS_ARRAY.indexOf(s1)
  const p2 = STATUS_ARRAY.indexOf(s2)
  return p1 > p2
}
