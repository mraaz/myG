import React, { useState, Fragment } from 'react'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'

import axios from 'axios'
import Dropzone from 'react-dropzone'

import { DraftComposer } from './DraftEditors/DraftComposer'
import { extractPostIntoJson } from './DraftEditors/DraftHelperFunctions'

import { COMPOSER_TYPE_ENUM } from './DraftConstants'

import '../../styles/components/DraftsEditor/Composer.scss'

export const PostComposer = ({
  addGroupToggle,
  allGroups,
  communityBox,
  groupId,
  groups,
  handleAcceptedFiles,
  handleOverlayClick,
  handleFocus_txtArea,
  handlePreviewRemove,
  isShowAllGroup,
  openComposeTextTab,
  overlayActive,
  previewFilesData,
  profileImg,
  successCallback,
  togglePostTypeTab,
  toggleShowAllGroup,
  uploading,
  userId,
  video,
  visibility
}) => {
  const buckectBaseUrl = 'https://myG.gg/platform_images/'
  const videoFileType = ['mov', 'webm', 'mpg', 'mp4', 'avi', 'ogg']
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [isButtonDisable, setIsButtonDisable] = useState(true)
  // const isButtonDisable = post_content != '' || preview_files.length > 0 ? true : false

  const onchange = (editorState) => {
    setEditorState(editorState)
    setIsButtonDisable(editorState.getCurrentContent().getPlainText() !== '')
  }

  const submitForm = async () => {
    // const stringifiedRawContent = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    // const testBack = convertFromRaw(JSON.parse(test))
    // const newContent = EditorState.createWithContent(testBack)
    // setEditorState(newContent)

    const data = await extractPostIntoJson(editorState, previewFilesData, visibility, video, userId, groupId)

    const post = await axios.post('/api/post', data)
    if (post.data == 'video_link_failed') {
      toast.success(<Toast_style text={`Strewth mate! Invalid video link`} />)
      return
    }
    successCallback(post)
  }

  return (
    <Fragment>
      <div className={`postCompose__container ${overlayActive ? 'zI1000' : ''} postComposeVersionTwo`}>
        <div className='compose__type__section'>
          <div className={`share__thought ${openComposeTextTab ? 'active' : ''}`} onClick={(e) => togglePostTypeTab('text')}>
            {`Share your thoughts ...`}
          </div>
          <div className='devider'></div>
          <div className={`add__post__image ${openComposeTextTab ? '' : 'active'}`} onClick={(e) => togglePostTypeTab('media')}>
            {` Add video or photos`}
          </div>
        </div>

        {openComposeTextTab && (
          <Fragment>
            <div className='media'>
              {previewFilesData.length > 0 && (
                <ImageGallery items={previewFilesData} showFullscreenButton={false} showGalleryFullscreenButton={false} />
              )}
            </div>
            <DraftComposer
              editorType={COMPOSER_TYPE_ENUM.POST_COMPOSER}
              editorState={editorState}
              setEditorState={onchange}
              // handleFocus_txtArea={handleFocus_txtArea}
              placeholder="What's up..."
            ></DraftComposer>
          </Fragment>
        )}

        {!openComposeTextTab && (
          <div className='media__container'>
            <Dropzone
              onDrop={(acceptedFiles, rejectedFiles) => handleAcceptedFiles(acceptedFiles, rejectedFiles)}
              accept='image/jpeg,image/jpg,image/png,image/gif,video/mp4,video/webm,video/ogg'
              minSize={0}
              maxSize={52428800}
              multiple
              disabled={uploading}
            >
              {(props) => {
                return (
                  <section className='custom__html'>
                    <div className='text'>Drop your image or video</div>
                    <div className='images'>
                      <span className=' button photo-btn'>
                        <img src={`${buckectBaseUrl}Dashboard/BTN_Attach_Image.svg`} />
                      </span>
                      <span className='button video-btn'>
                        <img src={`${buckectBaseUrl}Dashboard/BTN_Attach_Video.svg`} />
                      </span>
                    </div>
                    <div className='text'>
                      Or <span>click here </span> to select
                    </div>
                    {uploading && (
                      <div className='text'>
                        <span>Uploading... </span>
                      </div>
                    )}
                    {previewFilesData.length > 0 && (
                      <div className='files__preview_compose'>
                        {previewFilesData.slice(0, 3).map((file) => {
                          const splitUrl = file.src.split('.')
                          let fileType = splitUrl[splitUrl.length - 1]
                          if (file.src.includes('video') || videoFileType.includes(fileType)) {
                            return (
                              <span className='image' key={file.src}>
                                <video className='post-video' controls>
                                  <source src={file.src}></source>
                                </video>
                                <span className='remove__image' onClick={(e) => handlePreviewRemove(e, file.src, file.key, file.id)}>
                                  X
                                </span>
                              </span>
                            )
                          }
                          return (
                            <span className='image' key={file.src}>
                              <img src={file.src} key={file.src} />
                              <span className='remove__image' onClick={(e) => handlePreviewRemove(e, file.src, file.key, file.id)}>
                                X
                              </span>
                            </span>
                          )
                        })}
                        {previewFilesData.length > 3 ? `(${previewFilesData.length})...` : ''}
                      </div>
                    )}
                  </section>
                )
              }}
            </Dropzone>
          </div>
        )}

        {openComposeTextTab && !communityBox && (
          <div className='compose__people__section'>
            <div className='label'>Post on: </div>
            <div className='people_selected_container'>
              <div className='people_selected_list'>
                <div
                  className='default_circle profile-image'
                  style={{
                    backgroundImage: `url('${profileImg}')`,
                    backgroundSize: 'cover'
                  }}
                ></div>
                <div className='people_label'>Your Feed</div>
              </div>
              {groups.splice(0, 3).map((g) => {
                return (
                  <div className='people_selected_list'>
                    <div
                      className='default_circle profile-image'
                      style={{
                        backgroundImage: `url('${g.group_img}')`,
                        backgroundSize: 'cover'
                      }}
                    ></div>
                    <div className='people_label'>{g.name}</div>
                  </div>
                )
              })}
              {allGroups.length > 3 && (
                <div className='all__selected_groups people_selected_list'>
                  <span className='more__groups' onClick={toggleShowAllGroup}>
                    ...
                  </span>

                  {isShowAllGroup && (
                    <div className='group__details'>
                      {allGroups.splice(3, allGroups.length).map((group) => {
                        return <div className='people_label'>{group.name}</div>
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className='post_for'>
              {visibility == 1 && '(Everyone)'}
              {visibility == 2 && '(Friends)'}
              {visibility == 3 && '(Followers)'}
              {visibility == 0 && '(Private)'}
            </div>
            <div className='add_more_people'>
              <button type='button' className='add__people' onClick={addGroupToggle}>
                +
              </button>
            </div>
          </div>
        )}

        <div className='compose__button'>
          <button type='button' className='add__post' disabled={!isButtonDisable} onClick={submitForm}>
            Post
          </button>
        </div>
      </div>
      <div className={`highlight_overlay ${overlayActive ? 'active' : ''}`} onClick={handleOverlayClick}></div>
    </Fragment>
  )
}
