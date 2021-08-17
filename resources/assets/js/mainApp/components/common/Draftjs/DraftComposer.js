import React, { Fragment, useState, useCallback, useMemo } from 'react'
import axios from 'axios'
import Editor from '@draft-js-plugins/editor'
import createMentionPlugin, { defaultSuggestionsFilter } from '@draft-js-plugins/mention'
import createLinkifyPlugin from '@draft-js-plugins/linkify'
import createEmojiPlugin from '@draft-js-plugins/emoji'
import createVideoPlugin from '@draft-js-plugins/video'

import HashtagMentionComponent from './Mention/HashtagMentionComponent'
import UserMentionComponent from './Mention/UserMentionComponent'
import HashtagEntryComponent from './Entry/HashtagEntryComponent'
import UserEntryComponent from './Entry/UserEntryComponent'
import { getDefaultKeyBinding } from 'draft-js'
import {
  debounceActivation,
  DEBOUNCE_TIME,
  MENTIONS_THEME,
  KEYS_ENUM,
  POST_COMPOSER,
  POST_STATIC,
  POST_EDIT,
  REPLY_COMPOSER,
  REPLY_STATIC,
  REPLY_EDIT,
  COMMENT_COMPOSER,
  COMMENT_STATIC,
  COMMENT_EDIT
} from '../../../../common/draftjs'

// import 'draft-js/dist/Draft.css'
import '../../../styles/components/DraftsEditor/DraftsCompose.scss'

export const DraftComposer = ({
  editorType,
  editorState,
  setEditorState,
  handleFocus_txtArea,
  placeholder,
  handleReturnKey,
  addHashtag,
  addMention,
  handleSpecialKeys,
  children
}) => {
  // Setup plugins
  const { plugins, UserMentionSuggestions, HashtagMentionSuggestions, EmojiSuggestions, EmojiSelect } = useMemo(() => {
    const linkifyPlugin = createLinkifyPlugin()
    const hashtagMentionPlugin = createMentionPlugin({
      mentionPrefix: '#',
      mentionTrigger: '#',
      entityMutability: 'IMMUTABLE',
      mentionComponent: HashtagMentionComponent,
      theme: MENTIONS_THEME
    })
    const userMentionPlugin = createMentionPlugin({
      mentionPrefix: '@',
      mentionTrigger: '@',
      entityMutability: 'IMMUTABLE',
      mentionComponent: UserMentionComponent,
      theme: MENTIONS_THEME
    })
    const emojiPlugin = createEmojiPlugin()
    const videoPlugin = createVideoPlugin()

    const UserMentionSuggestions = userMentionPlugin.MentionSuggestions
    const HashtagMentionSuggestions = hashtagMentionPlugin.MentionSuggestions
    const { EmojiSuggestions, EmojiSelect } = emojiPlugin
    const { types } = videoPlugin

    const plugins = [linkifyPlugin, videoPlugin, emojiPlugin, userMentionPlugin, hashtagMentionPlugin]

    return { plugins, UserMentionSuggestions, HashtagMentionSuggestions, EmojiSuggestions, EmojiSelect, types }
  }, [])

  // The Draft Editors state variables
  const [mentionUserMenuIsOpen, setMentionUserMenuIsOpen] = useState(false)
  const [mentionUserSuggestionsList, setMentionUserSuggestionsList] = useState([])

  const [mentionHashtagMenuIsOpen, setMentionHashtagMenuIsOpen] = useState(false)
  const [mentionHashtagSuggestionsList, setMentionHashtagSuggestionsList] = useState([])

  const performMentionUserSearch = async ({ value }) =>
    mentionUserSearchCallback(
      value,
      (searchText, suggestions) => setMentionUserSuggestionsList(defaultSuggestionsFilter(searchText, suggestions))
      // setMentionUserSuggestionsList(suggestions)
    )
  // http://localhost:3000/api/search/gamers?query=Frok%20&online=false&from=0&size=10

  const mentionUserSearchCallback = useCallback(
    debounceActivation(
      (value, callback) =>
        mentionSearch(
          value,
          10,
          (term, size) => {
            return axios.get(`/api/search/gamers?query=${term}&online=${false}&from=${0}&size=${size}`).then((res) =>
              // return axios.get(`/api/search/gamers?query=${term}&online=false&from=${0}&size=${size}`).then((res) =>
              res.data.gamers.map((player) => ({
                name: player.alias,
                link: `/profile/${player.alias}`,
                avatar: player.image
                // avatar: 'https://myG.gg/default_user/new-user-profile-picture.png'
              }))
            )
          },
          callback
        ),
      DEBOUNCE_TIME
    ),
    []
  )

  const performMentionHashtagSearch = async ({ value }) =>
    mentionHashtagSearchCallback(value, (searchText, suggestions) =>
      setMentionHashtagSuggestionsList(defaultSuggestionsFilter(searchText, suggestions))
    )

  const hashtagQuery = (term, size) => {
    if (term) {
      return axios.post('/api/HashTags/getHashTags', {
        content: term
      })
    }

    return axios.get('/api/HashTags/getTopHashTags')
  }

  const hashtagListCreation = (term, allTags) => {
    const newHashtag = {
      name: term,
      tag: term,
      link: `/hashtag/${term}`,
      counter: 0,
      id: null
    }

    // No tags matches the query, give the user a change to create a new tag
    if (allTags.length === 0) {
      return [newHashtag]
    }

    // The search term exactly matches a existing tag, do not give the user a chance to create a new one
    if (allTags.find((tag) => tag.content === term)) {
      return allTags.map((tag) => ({
        name: tag.content,
        tag: tag.content,
        link: `/hashtag/${tag.content}`,
        counter: tag.counter,
        id: tag.id
      }))
    }

    // There exists possible matches, but no exact matches. Give them a full list, and at the bottom the option to create a new tag matching the current string
    return [
      ...allTags.map((tag) => ({
        name: tag.content,
        tag: tag.content,
        link: `/hashtag/${tag.content}`,
        counter: tag.counter,
        id: tag.id
      })),
      newHashtag
    ]
  }

  const mentionHashtagSearchCallback = useCallback(
    debounceActivation(
      (value, callback) =>
        mentionSearch(
          value,
          10,
          (term, size) => {
            return hashtagQuery(term).then((res) => {
              const allTags = res.data.allTags
              return hashtagListCreation(term, allTags).sort(function compare(a, b) {
                if (a.counter < b.counter) {
                  return 1
                }
                if (a.counter > b.counter) {
                  return -1
                }
                // a must be equal to b
                return 0
              })
            })
          },
          callback
        ),
      DEBOUNCE_TIME
    ),
    []
  )

  const mentionSearch = async (value, maxSuggestions, suggestionsFn, callback) => {
    const suggestions = await suggestionsFn(value, maxSuggestions)
    callback(value, suggestions)
  }

  const handleReturn = (syntheticKeyboardEvent) => {
    if (handleReturnKey && !mentionHashtagMenuIsOpen && !mentionUserMenuIsOpen) {
      // 'handled' is a special string, indicating we have handled the event and draft should do nothing.
      // Given a function was provided to handle return, and a mentions isnt open, prevent default
      // See: https://draftjs.org/docs/api-reference-editor/#cancelable-handlers-optional

      if (editorType !== POST_COMPOSER && syntheticKeyboardEvent.shiftKey) {
        // Holding down shift, meaning we want a newline
        return null
      }

      handleReturnKey()
      return 'handled'
    }
    return null
  }

  const myKeyBindingFn = (e) => {
    if (e.keyCode === 27 /* `esc` key */) {
      return KEYS_ENUM.ESCAPE
    }
    return getDefaultKeyBinding(e)
  }

  const handleKeyCommand = (command) => {
    if (command === KEYS_ENUM.ESCAPE) {
      // Perform a request to save your contents, set
      // a new `editorState`, etc.
      if (handleSpecialKeys) handleSpecialKeys(KEYS_ENUM.ESCAPE)
      return 'handled'
    }
    return 'not-handled'
  }

  return (
    <div className={`editorWrapper ${editorType}`}>
      <div className='postRow'>
        {children}
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
            readOnly={editorType === COMMENT_STATIC || editorType === REPLY_STATIC || editorType === POST_STATIC ? true : false}
            handleReturn={handleReturn}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={myKeyBindingFn}
          />
          {(editorType === POST_COMPOSER ||
            editorType === POST_EDIT ||
            editorType === REPLY_COMPOSER ||
            editorType === REPLY_EDIT ||
            editorType === COMMENT_COMPOSER ||
            editorType === COMMENT_EDIT) && (
            <Fragment>
              <EmojiSuggestions />
              <UserMentionSuggestions
                open={mentionUserMenuIsOpen}
                onOpenChange={setMentionUserMenuIsOpen}
                suggestions={mentionUserSuggestionsList}
                onSearchChange={performMentionUserSearch}
                onAddMention={(userMention) => addMention(userMention)}
                entryComponent={UserEntryComponent}
              />
              <HashtagMentionSuggestions
                open={mentionHashtagMenuIsOpen}
                onOpenChange={setMentionHashtagMenuIsOpen}
                suggestions={mentionHashtagSuggestionsList}
                onSearchChange={performMentionHashtagSearch}
                onAddMention={(hashtagMention) => addHashtag(hashtagMention)}
                entryComponent={HashtagEntryComponent}
              />
            </Fragment>
          )}
        </div>
      </div>

      {editorType !== POST_STATIC && editorType !== REPLY_STATIC && editorType !== COMMENT_STATIC && (
        <div className={`emojiBox ${editorType}`}>
          {editorType === POST_COMPOSER && <span className='addToBoxLabel'>Add Emoji</span>}
          <EmojiSelect />
        </div>
      )}
    </div>
  )
}
