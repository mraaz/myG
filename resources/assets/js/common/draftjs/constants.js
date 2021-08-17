/**
 * Debounce time for any draftjs based requests.
 * AKA how long the app should wait until it sends another request.
 */
export const DEBOUNCE_TIME = 500
/**
 * The max number of mentions and hashtags that can be added to a post.
 */
export const MAX_HASH_TAGS = 21
export const MAX_MENTIONS = 21

/**
 * The various types of draft text editors within the app.
 * Each one has 3 variants. Composer (when creating a post, comment or reply), static (when viewing a post, comment or
 * reply), and edit (when editing a post, comment or reply.)
 * These constants are not only used when creating a new instance of the draft editor, but also when apply styles to them.
 */
export const COMPOSER_TYPE_ENUM = {
  POST_COMPOSER: 'post_composer',
  INDIVIDUAL_COMMENT_STATIC: 'individual_comment_static',
  INDIVIDUAL_REPLY_COMPOSER: 'individual_reply_composer',
  INDIVIDUAL_EDIT_COMPOSER: 'individual_edit_composer',
  INDIVIDUAL_COMMENT_REPLY_COMPOSER: 'individual_comment_reply_composer'
}

export const POST_COMPOSER = 'post-composer'
export const POST_STATIC = 'post-static'
export const POST_EDIT = 'post-edit'

export const REPLY_COMPOSER = 'reply-composer'
export const REPLY_STATIC = 'reply-static'
export const REPLY_EDIT = 'reply-edit'

export const COMMENT_COMPOSER = 'comment-composer'
export const COMMENT_STATIC = 'comment-static'
export const COMMENT_EDIT = 'comment-edit'

/**
 * Mention theme object. Used to apply custom classNames to the mention components, for the most customisable styling.
 */
export const MENTIONS_THEME = {
  mention: 'myG__mention',
  mentionSuggestions: 'myG__mentionSuggestions',
  mentionSuggestionsEntry: 'myG__mentionSuggestionsEntry',
  mentionSuggestionsEntryContainer: 'myG__mentionSuggestionsEntryContainer',
  mentionSuggestionsEntryContainerUpper: 'myG__mentionSuggestionsEntryContainerUpper',
  mentionSuggestionsEntryContainerLower: 'myG__mentionSuggestionsEntryContainerLower',
  mentionSuggestionsEntryContainerLeft: 'myG__mentionSuggestionsEntryContainerLeft',
  mentionSuggestionsEntryContainerRight: 'myG__mentionSuggestionsEntryContainerRight',
  mentionSuggestionsEntryFocused: 'myG__mentionSuggestionsEntryFocused',
  mentionSuggestionsEntryText: 'myG__mentionSuggestionsEntryText',
  mentionSuggestionsEntryAvatar: 'myG__mentionSuggestionsEntryAvatar',
  mentionSuggestionsEntryHashtagCount: 'myG__mentionSuggestionsEntryHashtagCount',
  mentionSuggestionsEntryHashtag: 'myG__mentionSuggestionsEntryHashtag',
  mentionSuggestionsEntryCreateLabel: 'myG__mentionSuggestionsEntryCreateLabel'
}

/**
 * Emoji theme object. Used to apply custom classNames to the mention components, for the most customisable styling.
 */
export const EMOJI_THEME = {
  emoji: 'myG__emoji',
  emojiSuggestions: 'myG__emojiSuggestions',
  emojiSuggestionsEntry: 'myG__emojiSuggestionsEntry',
  emojiSuggestionsEntryFocused: 'myG__emojiSuggestionsEntryFocused',
  emojiSuggestionsEntryText: 'myG__emojiSuggestionsEntryText',
  emojiSuggestionsEntryIcon: 'myG__emojiSuggestionsEntryIcon',
  emojiSelect: 'myG__emojiSelect',
  emojiSelectButton: 'myG__emojiSelectButton',
  emojiSelectButtonPressed: 'myG__emojiSelectButtonPressed',
  emojiSelectPopover: 'myG__emojiSelectPopover',
  emojiSelectPopoverClosed: 'myG__emojiSelectPopoverClosed',
  emojiSelectPopoverTitle: 'myG__emojiSelectPopoverTitle',
  emojiSelectPopoverGroups: 'myG__emojiSelectPopoverGroups',
  emojiSelectPopoverGroup: 'myG__emojiSelectPopoverGroup',
  emojiSelectPopoverGroupTitle: 'myG__emojiSelectPopoverGroupTitle',
  emojiSelectPopoverGroupList: 'myG__emojiSelectPopoverGroupList',
  emojiSelectPopoverGroupItem: 'myG__emojiSelectPopoverGroupItem',
  emojiSelectPopoverToneSelect: 'myG__emojiSelectPopoverToneSelect'
}

/**
 * Known keys, used to apply custom handling for specific key strokes within the draft editor.
 */
export const KEYS_ENUM = {
  ESCAPE: 'escape,'
}
