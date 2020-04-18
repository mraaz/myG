
import { getEmojiDataFromNative, emojiIndex } from 'emoji-mart';
import data from 'emoji-mart/data/all.json'

export function convertColonsToEmojis(text) {
  while (text.match(/:([^:]*):/)) {
    const colons = text.match(/:([^:]*):/)[0].replace(':', '').replace(':', '');
    text = text.replace(
      /:([^:]*):/,
      emojiIndex.search(colons)[0].native
    );
  }
  return text;
}

export function convertEmojisToColons(text) {
  while (text.match(/([\uD800-\uDBFF][\uDC00-\uDFFF])/)) {
    const emoji = text.match(/([\uD800-\uDBFF][\uDC00-\uDFFF])/)[0];
    text = text.replace(
      /([\uD800-\uDBFF][\uDC00-\uDFFF])/,
      getEmojiDataFromNative(emoji, 'apple', data).colons
    );
  }
  return text;
}