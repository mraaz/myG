/**
 * Regex based function which is designed to take the stringified contents of a draft editor, and extract out all
 * types of mentions. Current extracts Hashtags and User mentions, denoted with '#' and '@' symbols respectively.
 * @param {string} text Stringified contents of the EditorContents of a draftjs editor.
 * @returns {MentionCollections} An object containing typed lists of hashtag and user mentions.
 */
export const getCurrentlyListedMentionsAndHashtags = (text) => {
  const hashtagList = text.match(/#\w*/g)
  const mentionsList = text.match(/@\w*/g)
  return { hashtagList, mentionsList }
}

/**
 * Takes a array of mentions added to draftjs over its instances runtime, and checks it against the current list of mentions when submitted.
 * Removes any duplicated mentions, along with any mentions which no longer exists in the submitted list (required as there is no onRemove cta).
 * @param {*} mentionsArray A list of mentions objects
 * @param {*} plainTextMentionsArray A list of mentions in plain text
 * @param {*} prefix The prefix used in this mentions instance, either '#' or '@'
 * @returns {[*]}
 */
export const reduceMentions = (mentionsArray, plainTextMentionsArray, prefix) =>
  mentionsArray.reduce((list, mention) => {
    if (
      plainTextMentionsArray &&
      plainTextMentionsArray.includes(`${prefix}${mention.name}`) &&
      !list.find((savedMention) => savedMention.name === mention.name)
    ) {
      return [...list, mention]
    }
    return list
  }, [])

/** TYPES BELOW */

/**
 * @typedef MentionCollections
 * @type {object}
 * @property {Object[]} hashtagList - A collection of hashtag mentions.
 * @property {Object[]} mentionsList - A collection of user mentions.
 */
