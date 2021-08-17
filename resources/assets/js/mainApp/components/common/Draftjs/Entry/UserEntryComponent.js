import React from 'react'

export default function UserEntryComponent({ mention, theme, searchValue, isFocused, ...parentProps }) {
  const entryContainerThemes = isFocused
    ? `${theme.mentionSuggestionsEntryContainer} ${theme.mentionSuggestionsEntryFocused}`
    : theme.mentionSuggestionsEntryContainer
  return (
    <div {...parentProps}>
      <div className={entryContainerThemes}>
        <div className={theme.mentionSuggestionsEntryContainerLeft}>
          <img src={mention.avatar} className={theme.mentionSuggestionsEntryAvatar} role='presentation' />
        </div>

        <div className={theme.mentionSuggestionsEntryContainerRight}>
          <span className={theme.mentionSuggestionsEntryText}>{mention.name}</span>
        </div>
      </div>
    </div>
  )
}
