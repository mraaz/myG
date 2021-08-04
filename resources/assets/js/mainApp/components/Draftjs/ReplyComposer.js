import React, { useState } from 'react'
import { Is_json } from '../Utility_Function'
// import { createEditorStateWithText } from '@draft-js-plugins/editor'
import { ContentState, EditorState, convertFromRaw } from 'draft-js'
import { DraftComposer } from './DraftComposer'
import { COMPOSER_TYPE_ENUM } from './helpers/constants'
import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js'
const { hasCommandModifier } = KeyBindingUtil

import '../../styles/components/DraftsEditor/Composer.scss'

export const ReplyComposer = ({ comment }) => {
  let state
  if (Is_json(comment)) {
    state = EditorState.createWithContent(convertFromRaw(JSON.parse(comment)))
  } else if (!comment || comment === '') {
    state = EditorState.createEmpty()
  } else {
    state = EditorState.createWithContent(ContentState.createFromText(comment))
  }

  const [editorState, setEditorState] = useState(state)

  const onchange = (state) => {
    setEditorState(state)
  }

  const handleReturn = () => {
    console.log('do the submit work here')
  }

  return (
    <DraftComposer
      editorType={COMPOSER_TYPE_ENUM.INDIVIDUAL_REPLY_COMPOSER}
      editorState={editorState}
      setEditorState={onchange}
      handleReturnKey={handleReturn}
    ></DraftComposer>
  )
}