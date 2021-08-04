import React, { Fragment, useRef } from 'react'
import { Link } from 'react-router-dom'

const MobileGameComments = ({
  toggleBack,
  allowComments,
  showComment,
  value,
  handleChange,
  detectKey,
  insertImageComment,
  fileInputRef,
  handleSelectFile,
  buckectBaseUrl,
  userInfo,
  defaultUserImage,
  uploading,
  previewFile,
  clearPreviewImage
}) => {
  const textInput = useRef(null)

  return (
    <Fragment>
      <div className='mGameCommentsRowOne'>
        <div className='rowOneWrapper' onClick={toggleBack}>
          <a className='mGameCommentsBackButton' onClick={toggleBack}>
            <img className='mGameCommentsCaretImg' src='https://myG.gg/platform_images/View+Game/Down+Carrot.svg' />
            <span>{` Comments `}</span>
          </a>
        </div>
      </div>
      <div className='show-individual-comments'>{showComment()}</div>
      {allowComments == 1 && (
        <div className='compose__comment__wrapper'>
          <div className='compose-comment'>
            <textarea
              name='name'
              placeholder='Write a comment...'
              value={value}
              onChange={handleChange}
              maxLength='254'
              onKeyDown={(e) => detectKey(e, true)}
              ref={textInput}
            />
            <div className='insert__images' onClick={insertImageComment}>
              <input
                type='file'
                accept='image/jpeg,image/jpg,image/png,image/gif'
                ref={fileInputRef}
                onChange={handleSelectFile}
                name='insert__images'
              />
              <img src={`${buckectBaseUrl}Dashboard/BTN_Attach_Image.svg`} />
            </div>
            <div className='send__btn' onClick={(e) => detectKey(e, false)}>
              <img src={`${buckectBaseUrl}Dashboard/BTN_Send_Post.svg`} className='img-fluid' />
            </div>
            <Link to={`/profile/${userInfo.alias}`} className='user-img'>
              <div
                className='profile__image'
                style={{
                  backgroundImage: `url('${userInfo.profile_img ? userInfo.profile_img : defaultUserImage}')`,
                  backgroundSize: 'cover'
                }}
              >
                <div className='online__status'></div>
              </div>
            </Link>
          </div>
          {uploading && <div className='uploadImage_loading'>Uploading ...</div>}
          {previewFile.length > 0 && (
            <div className='preview__image'>
              <img src={`${previewFile[0]}`} />
              <div className='clear__preview__image' onClick={clearPreviewImage}>
                X
              </div>
            </div>
          )}
        </div>
      )}
    </Fragment>
  )
}

export default MobileGameComments
