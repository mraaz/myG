import React, { useState } from 'react'
// import { createEditorStateWithText } from '@draft-js-plugins/editor'
import { ContentState, EditorState, convertFromRaw } from 'draft-js'
import { isJson } from './DraftEditors/DraftHelperFunctions'
import { DraftComposer } from './DraftEditors/DraftComposer'
import { COMPOSER_TYPE_ENUM } from './DraftConstants'

import '../../styles/components/DraftsEditor/Composer.scss'

export const SimpleStaticComments = ({ commentText }) => {
  let state
  if (isJson(commentText)) {
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
      readOnly={true}
    ></DraftComposer>
  )
}
