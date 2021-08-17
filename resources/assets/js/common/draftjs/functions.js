import { EditorState, ContentState, convertFromRaw, convertToRaw } from 'draft-js'

import { isJSON } from '../json'

/**
 * @typedef MentionCollections
 * @type {object}
 * @property {Object[]} hashtagList - A collection of hashtag mentions.
 * @property {Object[]} mentionsList - A collection of user mentions.
 */

/**
 * @typedef MyGProcessedEditorContent
 * @type {object}
 * @property {string} content
 * @property {string[]} hashtags
 * @property {string[]} mentions
 */

/**
 * Debounce Function, used to delay the activation of another function by a specified amount of time, or until cleared for a new request.
 * Does not handle throwing away old requests.
 * @param {Function} callback The callback function to be delayed.
 * @param {number} delay The amount of time to delay the function by, in milliseconds.
 */
export const debounceActivation = (callback, delay) => {
  let timer
  return function () {
    let self = this
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback.apply(self, args)
    }, delay)
  }
}

/**
 * Takes a post, comment or reply in string format and returns a `EditorState` object. If the provided string post is
 * a JSON object, it is assumed to have been a DraftJS post previously, and is extracted as such. If it is not JSON
 * then it is assumed to be plaintext, and as such is converted into a EditorState object (if the post is edited and
 * saved, its database entry will now be a JSON string).
 * If the post is invalid JSON, a error will be logged and a empty `EditorState` object created in its place.
 *
 * @param {string} post The post, comment or reply, in string format. May or may not be a DraftJS JSON object.
 * @returns {EditorState} The post, but converted to a object that can be read by DraftJS.
 */
export const convertToEditorState = (post) => {
  try {
    if (isJSON(post)) {
      return EditorState.createWithContent(convertFromRaw(JSON.parse(post)))
    }
    return EditorState.createWithContent(ContentState.createFromText(post))
  } catch (e) {
    console.error('Unable to create post. Creating empty post in its place.', e, post)
    return EditorState.createEmpty()
  }
}

/**
 * Regex based function which is designed to take the stringified contents of a draft editor, and extract out all
 * types of mentions. Current extracts Hashtags and User mentions, denoted with '#' and '@' symbols respectively.
 *
 * @param {string} text Stringified contents of the EditorContents of a draftjs editor.
 * @returns {MentionCollections} An object containing typed lists of hashtag and user mentions.
 */
export const getCurrentlyListedMentionsAndHashtags = (text) => {
  return {
    hashtagList: text.match(/#\w*/g),
    mentionsList: text.match(/@\w*/g)
  }
}

/**
 * Takes a array of mentions added to draftjs over its instances runtime, and checks it against the current list of mentions when submitted.
 * Removes any duplicated mentions, along with any mentions which no longer exists in the submitted list (required as there is no onRemove cta).
 *
 * @param {*} mentionsArray A list of mentions objects
 * @param {*} plainTextMentionsArray A list of mentions in plain text
 * @param {string} prefix The prefix used in this mentions instance, either '#' or '@'
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

/**
 *
 * @param {EditorState} editorState
 * @returns {MyGProcessedEditorContent}
 */
export const prepareDraftsEditorForSave = (editorState, initialHashtagList = [], initialMentionsList = []) => {
  const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
  const { hashtagList, mentionsList } = getCurrentlyListedMentionsAndHashtags(editorState.getCurrentContent().getPlainText())
  const hashtags = reduceMentions(initialHashtagList, hashtagList, '#')
  const mentions = reduceMentions(initialMentionsList, mentionsList, '@')

  return {
    content,
    hashtags,
    mentions
  }
}

/**
 * Does a deep clone of the editorState object so that it can be used in another place while minimizing chances of bugs.
 * This is probably overkill.
 *
 * @param {EditorState} editorState
 * @returns A cloned copy of the editor state object
 */
export const cloneEditorState = (editorState) =>
  EditorState.createWithContent(convertFromRaw(convertToRaw(editorState.getCurrentContent())))

/**
 * Used to determine if the draft editors content state is empty. True if empty, or undefined. False otherwise.
 *
 * @param {EditorState} editorState the raw
 * @returns {Boolean} true if empty, false otherwise.
 */
export const isEmptyDraftJs = (editorState) => {
  if (!editorState) {
    return true
  }
  const contentState = editorState.getCurrentContent()
  return !(contentState.hasText() && contentState.getPlainText() !== '')
}
