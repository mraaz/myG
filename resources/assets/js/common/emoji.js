import { getEmojiDataFromNative, emojiIndex } from 'emoji-mart'
import data from 'emoji-mart/data/all.json'

export function convertColonsToEmojis(text) {
  const possibleEmojis = text.match(/:([^:]*):/g) || []
  for (const possibleEmoji of possibleEmojis) {
    const colons = possibleEmoji.replace(':', '').replace(':', '')
    const emoji = emojiIndex.search(colons)[0]
    if (emoji) text = text.replace(possibleEmoji, emoji.native)
  }
  return text
}

export function convertEmojisToColons(text) {
  while (text.match(/([\uD800-\uDBFF][\uDC00-\uDFFF])/)) {
    const emoji = text.match(/([\uD800-\uDBFF][\uDC00-\uDFFF])/)[0]
    text = text.replace(/([\uD800-\uDBFF][\uDC00-\uDFFF])/, getEmojiDataFromNative(emoji, 'apple', data).colons)
  }
  return text
}
