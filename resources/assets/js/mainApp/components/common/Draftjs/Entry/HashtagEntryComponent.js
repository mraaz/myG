import React from 'react'

export default function HashtagEntryComponent({ mention, theme, searchValue, isFocused, ...parentProps }) {
  const entryContainerThemes = isFocused
    ? `${theme.mentionSuggestionsEntryContainer} column ${theme.mentionSuggestionsEntryFocused}`
    : `${theme.mentionSuggestionsEntryContainer} column`
  const hashtagThemes = mention.id === null ? `${theme.mentionSuggestionsEntryHashtag} highlighted` : theme.mentionSuggestionsEntryHashtag
  return (
    <div {...parentProps}>
      <div className={entryContainerThemes}>
        <div className={theme.mentionSuggestionsEntryContainerUpper}>
          {mention.id === null && <span className={theme.mentionSuggestionsEntryCreateLabel}>Create the hashtag</span>}

          <span className={hashtagThemes}>#{mention.tag}</span>
        </div>

        <div className={theme.mentionSuggestionsEntryContainerLower}>
          <div className={theme.mentionSuggestionsEntryHashtagCount}>
            {mention.counter} {mention.counter === 1 ? 'post' : 'posts'}
          </div>
        </div>
      </div>
    </div>
  )
}
