import React from 'react'

export default function HashtagMentionComponent({ entityKey, mention, className, decoratedText }) {
  return (
    <a href={mention.link} className={`${className} hashtag`} spellCheck='false' id={entityKey}>
      <span data-text='true'>{decoratedText}</span>
    </a>
  )
}
