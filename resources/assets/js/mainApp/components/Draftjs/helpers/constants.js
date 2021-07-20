/** Debounce time for any mention based requests */
export const DEBOUNCE_TIME = 500
export const MAX_HASH_TAGS = 21

/** Enum to describe the type of draft composer. Important to determine functionality and appearance. */
export const COMPOSER_TYPE_ENUM = {
  POST_COMPOSER: 'post_composer',
  INDIVIDUAL_COMMENT_STATIC: 'individual_comment_static',
  INDIVIDUAL_REPLY_COMPOSER: 'individual_reply_composer',
  INDIVIDUAL_EDIT_COMPOSER: 'individual_edit_composer',
  INDIVIDUAL_COMMENT_REPLY_COMPOSER: 'individual_comment_reply_composer'
}

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
