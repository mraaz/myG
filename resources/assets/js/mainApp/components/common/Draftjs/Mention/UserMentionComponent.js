import React from 'react'

export default function UserMentionComponent({ entityKey, mention, className, decoratedText }) {
  return (
    <a href={mention.link} className={`${className} user`} spellCheck='false' id={entityKey}>
      <span data-text='true'>{decoratedText}</span>
    </a>
  )
}
