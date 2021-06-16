import React, { Fragment, useState, useCallback, useMemo } from 'react'
import Editor from '@draft-js-plugins/editor'
import createMentionPlugin, { defaultSuggestionsFilter, addMention } from '@draft-js-plugins/mention'
import createHashtagPlugin from '@draft-js-plugins/hashtag'
import createLinkifyPlugin from '@draft-js-plugins/linkify'
import createEmojiPlugin from '@draft-js-plugins/emoji'
import createVideoPlugin from '@draft-js-plugins/video'
import { debounceFunction, searchAndSave } from './DraftHelperFunctions'

import { COMPOSER_TYPE_ENUM } from '../DraftConstants'

import '../../../styles/components/DraftsEditor/DraftsCompose.scss'

/**
 * The base draft rich text editor used in myG.
 * https://github.com/facebook/draft-js
 *
 * We use a number of plugins, all of which can be found here:
 * https://github.com/draft-js-plugins/draft-js-plugins
 *
 * This component contains the core functionality of our text editor. Higher order components wrap this component
 * to extend it for different user cases (i.e. repling to comments vs posting).
 */
export const DraftComposer = ({
  editorType,
  editorState,
  setEditorState,
  handleFocus_txtArea,
  placeholder,
  readOnly = false,
  handleReturnKey
}) => {
  // Setup the plugins
  const hashtagPlugin = createHashtagPlugin({ theme: { hashtag: 'hashtag' } })
  // const linkifyPlugin = createLinkifyPlugin()
  const { MentionSuggestions, mentionPlugin, EmojiSuggestions, EmojiSelect, emojiPlugin } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({ mentionPrefix: '@', entityMutability: 'MUTABLE' })
    const emojiPlugin = createEmojiPlugin()
    // eslint-disable-next-line no-shadow
    const { MentionSuggestions } = mentionPlugin
    const { EmojiSuggestions, EmojiSelect } = emojiPlugin
    // eslint-disable-next-line no-shadow
    return { mentionPlugin, MentionSuggestions, EmojiSuggestions, EmojiSelect, emojiPlugin }
  }, [])
  // const mentionPlugin = createMentionPlugin({ mentionPrefix: '@', entityMutability: 'IMMUTABLE' })
  const videoPlugin = createVideoPlugin()
  // const plugins = [videoPlugin, emojiPlugin, mentionPlugin, hashtagPlugin]

  // Grab required components from the plugins
  // const { MentionSuggestions } = mentionPlugin
  const { types } = videoPlugin

  // The Draft Editors state variables
  const [mentionMenuIsOpen, setMentionMenuIsOpen] = useState(false)
  const [mentionSuggestionsList, setMentionSuggestionsList] = useState([])

  const plugins =
    editorType === COMPOSER_TYPE_ENUM.POST_COMPOSER
      ? [videoPlugin, emojiPlugin, mentionPlugin, hashtagPlugin]
      : [videoPlugin, emojiPlugin, mentionPlugin, hashtagPlugin]

  const debounceDropDown = useCallback(
    debounceFunction((value, callback) => searchAndSave(value, 10, callback), 1000),
    []
  )

  const performSearch = async ({ value }) =>
    debounceDropDown(value, (searchText, suggestions) => setMentionSuggestionsList(defaultSuggestionsFilter(searchText, suggestions)))

  const handleReturn = () => {
    if (handleReturnKey) {
      // 'handled' is a special string, indicating we have handled the event and draft should do nothing.
      // Given a function was provided to handle return, prevent default
      // See: https://draftjs.org/docs/api-reference-editor/#cancelable-handlers-optional
      console.log('handling return')
      handleReturnKey()
      return 'handled'
    }
    return null
  }

  return (
    <div className={`editorWrapper ${editorType}`}>
      <div
        className={`editor ${editorType}`}
        id='draftComposer'
        onClick={(e) => {
          setTimeout(function () {
            document.getElementById('draftComposer').focus()
          }, 0)
          if (handleFocus_txtArea) {
            handleFocus_txtArea()
          }
        }}
      >
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          plugins={plugins}
          placeholder={placeholder}
          readOnly={readOnly}
          handleReturn={handleReturn}
        />
        {(editorType === COMPOSER_TYPE_ENUM.POST_COMPOSER || editorType === COMPOSER_TYPE_ENUM.INDIVIDUAL_REPLY_COMPOSER) && (
          <Fragment>
            <EmojiSuggestions />
            <MentionSuggestions
              open={mentionMenuIsOpen}
              onOpenChange={setMentionMenuIsOpen}
              suggestions={mentionSuggestionsList}
              onSearchChange={performSearch}
              onAddMention={(e) => console.log(`adding mention to ${editorType} compose type :: ${JSON.stringify(e)}`)}
            />
          </Fragment>
        )}
      </div>
      {editorType === COMPOSER_TYPE_ENUM.POST_COMPOSER && (
        <div className='emojiBox'>
          <span className='addToBoxLabel'>Add to your post</span>
          <EmojiSelect />
        </div>
      )}
    </div>
  )
}
