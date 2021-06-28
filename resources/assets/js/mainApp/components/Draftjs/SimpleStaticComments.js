import React, { useState } from 'react'
import { ContentState, EditorState, convertFromRaw } from 'draft-js'
import { Is_json } from '../Utility_Function'
import { DraftComposer } from './DraftComposer'
import { COMPOSER_TYPE_ENUM } from './helpers/constants'

import '../../styles/components/DraftsEditor/Composer.scss'

export const SimpleStaticComments = ({ commentText }) => {
  let state
  if (Is_json(commentText)) {
    state = EditorState.createWithContent(convertFromRaw(JSON.parse(commentText)))
  } else {
    state = EditorState.createWithContent(ContentState.createFromText(commentText))
  }

  const [editorState, setEditorState] = useState(state)

  const onchange = (state) => {
    setEditorState(state)
  }

  return (
    <DraftComposer
      editorType={COMPOSER_TYPE_ENUM.INDIVIDUAL_COMMENT_STATIC}
      editorState={editorState}
      setEditorState={onchange}
    ></DraftComposer>
  )
}
