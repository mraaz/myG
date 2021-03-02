import React, { Fragment, useState, useEffect } from 'react'
const buckectBaseUrl = 'https://cdn.myG.gg/platform_images/'

import { toast } from 'react-toastify'
import axios from 'axios'

import Dropzone from 'react-dropzone'

import { Toast_style } from '../Utility_Function'
import '../../styles/Community/AddCommunityStyles.scss'

import { styles } from '../../static/AddCommunity'

import { MyGCheckbox, MyGTextarea, MyGAsyncSelect, MyGCreateableSelect, MyGInput, MyGSelect } from '../common'
import { Game_name_values, Disable_keys } from '../Utility_Function'
import { Upload_to_S3, Remove_file } from '../AWS_utilities'
import { parsePlayersToSelectData } from '../../utils/InvitePlayersUtils'

const MAX_GAME_TAGS = 4
const MAX_INVITEES = 8

const AddCommunity = ({
  updateComponentState,
  advancedSettingsState,
  updateAdvancedSettingsState,
  mainSettingsState,
  updateMainSettingsState,
  additional_info,
}) => {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // const getInitialData_Tags = async function() {
    //   try {
    //     let results = await Group_Hash_Tags()
    //     updateAdvancedSettings({ optionTags: results })
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    const getInitialData_GameName = async function () {
      try {
        let results = await Game_name_values()
        updateMainSettings({ gameTitlesList: results })
      } catch (error) {
        console.log(error)
      }
    }
    document.title = 'myG - Add Community'

    getInitialData_GameName()
  }, [])

  // Handlers
  const updateMainSettings = (stateUpdates) => {
    updateMainSettingsState((currentState) => ({
      ...currentState,
      ...stateUpdates,
    }))
  }

  const updateAdvancedSettings = (stateUpdates) => {
    updateAdvancedSettingsState((currentState) => ({
      ...currentState,
      ...stateUpdates,
    }))
  }

  const updateState = (stateUpdates) => {
    updateComponentState((currentState) => ({
      ...currentState,
      ...stateUpdates,
    }))
  }

  const updateOptionalSettings = (stateUpdates) => {
    updateOptionalFieldsState((currentState) => ({
      ...currentState,
      ...stateUpdates,
    }))
  }

  // const createOption = (label, game_names_id) => ({
  //   label,
  //   value: label,
  //   game_names_id,
  // })

  // const handleCreateTags = (inputValue) => {
  //   if (advancedSettingsState.tags.length >= MAX_GAME_TAGS) {
  //     toast.success(<Toast_style text={'Of 3 tags max. Herh herh herh.'} />)
  //     return
  //   }
  //   if (inputValue.length > 88) {
  //     toast.success(<Toast_style text={'Too long, game tags length is.'} />)
  //     return
  //   }
  //   if (/['/.%#$,;`\\]/.test(inputValue)) {
  //     toast.success(<Toast_style text={'Game tags can have invalid characters not.'} />)
  //     return
  //   }
  //
  //   let { optionTags, tags } = advancedSettingsState
  //   if (tags == null) tags = ''
  //
  //   const newOption = createOption(inputValue, null)
  //   updateAdvancedSettings({
  //     optionTags: [...optionTags, newOption],
  //     tags: [...tags, newOption],
  //   })
  // }

  // <div className='field-title hash-tags'>
  //   <p>Community Tags</p>
  // </div>
  // <div className='game-title-select'>
  //   <MyGCreateableSelect
  //     isClearable
  //     isMulti
  //     onCreateOption={handleCreateTags}
  //     getNewOptionData={getNewOptionData}
  //     onInputChange={getOptionsTags}
  //     onChange={(value) => {
  //       updateAdvancedSettings({ tags: value })
  //     }}
  //     value={advancedSettingsState.tags}
  //     placeholder='Search, Select or create Community Tags'
  //     options={
  //       advancedSettingsState.tags && advancedSettingsState.tags.length >= MAX_GAME_TAGS ? [] : advancedSettingsState.optionTags
  //     }
  //     noOptionsMessage={() => {
  //       return advancedSettingsState.optionTags && advancedSettingsState.optionTags.length >= MAX_GAME_TAGS
  //         ? 'You have reached the max options value'
  //         : 'Yo! Either nothing to display or you need to type in something'
  //     }}
  //     onKeyDown={Disable_keys}
  //     classNamePrefix='filter'
  //   />
  // </div>

  const onBlur_group_name = async (inputValue) => {
    if (mainSettingsState.community_name.trim() == '' || mainSettingsState.community_name.trim() == null) {
      updateAdvancedSettings({ grp_name_unique: true })
      return
    }

    if (mainSettingsState.community_name.trim().length < 4) {
      toast.success(<Toast_style text={'Hmmmm, be longer community name must'} />)
      return
    }

    const getgroup_name = await axios.get(`/api/groups/groupName/${mainSettingsState.community_name.trim()}`)
    if (getgroup_name.data == false) {
      updateAdvancedSettings({ grp_name_unique: true })
    } else {
      updateAdvancedSettings({ grp_name_unique: false })
      toast.success(<Toast_style text={'Hmmmm, be unique community name must'} />)
      return
    }
  }

  const handleCreateGame = (inputValue) => {
    if (inputValue.length > 88) {
      toast.success(<Toast_style text={'Too long, game title is. Hmmmmmm.'} />)
      return
    }

    let { gameTitlesList, gameTitle } = mainSettingsState
    if (gameTitlesList == null) gameTitlesList = ''

    const newOption = createOption(inputValue, null)
    updateMainSettings({ gameTitlesList: [...gameTitlesList, newOption], gameTitle: newOption })
  }

  //https://github.com/JedWatson/react-select/issues/3988 :RAAZ remove once fixed
  const getNewOptionData = (inputValue, optionLabel) => ({
    value: inputValue,
    label: optionLabel,
    __isNew__: true,
    isEqual: () => false,
  })

  // api calls
  const getOptionsTags = (inputValue) => {
    const getInitialData = async function (inputValue) {
      try {
        let results = await Group_Hash_Tags(inputValue)
        updateAdvancedSettings({ optionTags: results })
      } catch (error) {
        // Error get option tags
      }
    }

    if (inputValue.length > 88) {
      toast.success(<Toast_style text={'Too long, game title is. Hmmmmmm.'} />)
      return
    }
    getInitialData(inputValue)
  }

  const getOptionsGames = (inputValue) => {
    const getInitialData = async function (inputValue) {
      try {
        let results = await Game_name_values(inputValue)
        updateMainSettings({ gameTitlesList: results })
      } catch (error) {
        // Error get option tags
      }
    }

    if (inputValue.length > 88) {
      toast.success(<Toast_style text={'Too long, game title is. Hmmmmmm.'} />)
      return
    }
    getInitialData(inputValue)
  }

  const onPlayersSuggestionFetch = async (value) => {
    try {
      const {
        data: { playerSearchResults },
      } = await axios.post(`/api/user/playerSearchResults`, {
        alias: value,
      })
      const parsedData = parsePlayersToSelectData(playerSearchResults)
      return parsedData
    } catch (error) {
      // error player suggestion fetch
    }
  }

  const onPlayersSuggestionFetch2 = async (value) => {
    return []
  }

  const getCommentPrivaryView = () => {
    return (
      <div className='comments-privacy-container'>
        <div className='field-title'>Comments and Privacy</div>
        <MyGCheckbox
          checked={mainSettingsState.autoAccept}
          onClick={(value) => {
            updateMainSettings({ autoAccept: value })
          }}
          labelText='Allow any community member to accept new applicants'
        />
        <MyGCheckbox
          checked={advancedSettingsState.type}
          onClick={(value) => {
            updateAdvancedSettings({ type: value })
          }}
          labelText='Publicly listed: Community appears in searches'
        />
      </div>
    )
  }

  const handlePreviewRemove = (e, src) => {
    e.preventDefault()
    let preview_files = [...advancedSettingsState.preview_files]
    preview_files = preview_files.filter((data) => data.src != src)

    if (advancedSettingsState.preview_files != [] && advancedSettingsState.preview_files[0].key != '') {
      Remove_file(advancedSettingsState.preview_files[0].key, advancedSettingsState.preview_files[0].id)
    }

    updateAdvancedSettings({ preview_files: preview_files })
  }

  const handleAcceptedFiles = async (file, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      toast.error(
        <Toast_style
          text={`Sorry mate! ${rejectedFiles.length} File(s) rejected because of bad format or file size limit exceed (10mb). Yes, hmmm`}
        />
      )
    }
    if (file.length > 0) {
      updateAdvancedSettings({ uploading: true })
      let post = await Upload_to_S3(file[0], file[0].name, 0, null)
      if (!post) {
        updateAdvancedSettings({ uploading: false })
        return
      }
      let new_preview_files = []
      new_preview_files.push({
        src: post.data.Location,
        key: post.data.Key,
        id: post.data.aws_key_id,
      })

      updateAdvancedSettings({ preview_files: new_preview_files, uploading: false })
    }
  }

  const getCommunityleftView = () => {
    return (
      <div className='community-flexBox'>
        <div className={styles.sideLineContainer}>
          <div className={styles.sideBall} />
          <div className={styles.sideLine} />
        </div>
        <div className='community-main-settings-content'>
          <div className='field-title'>
            <p>Community Name (Be, unique it must)</p>
          </div>
          <div className='game-title-select'>
            <MyGInput
              value={mainSettingsState.community_name}
              type='text'
              maxLength={75}
              class={'community-input'}
              minLength={3}
              onKeyDown={Disable_keys}
              onBlur={onBlur_group_name}
              containerStyles={{ width: '100%' }}
              onChange={(value) => {
                updateMainSettings({ community_name: value.target.value })
              }}></MyGInput>
          </div>
          <div className='field-title'>
            <p>Game Title</p>
          </div>
          <div className='game-title-select'>
            <MyGCreateableSelect
              isClearable
              onCreateOption={handleCreateGame}
              getNewOptionData={getNewOptionData}
              onInputChange={getOptionsGames}
              onChange={(value) => {
                updateMainSettings({ gameTitle: value })
              }}
              value={mainSettingsState.gameTitle}
              placeholder='Search, Select or create Game Title'
              options={mainSettingsState.gameTitlesList}
              classNamePrefix='filter'
              onKeyDown={Disable_keys}
            />
          </div>
          <div className='field-title'>
            <p>Featured Image</p>
          </div>
          <div className='media__container'>
            {advancedSettingsState.preview_files.length == 0 && (
              <Dropzone
                onDrop={(acceptedFiles, rejectedFiles) => handleAcceptedFiles(acceptedFiles, rejectedFiles)}
                maxFiles={1}
                minSize={0}
                maxSizeBytes={11185350}
                accept='image/jpeg,image/jpg,image/png,image/gif'
                disabled={advancedSettingsState.uploading}
                className='dropzone-thumb'>
                {(props) => {
                  return (
                    <section className='custom__html dropzone-section'>
                      <div className='text'>Drop your image</div>
                      <div className='images community-images-container'>
                        <span className=' button photo-btn'>
                          <img src={`${buckectBaseUrl}Dashboard/BTN_Attach_Image.svg`} />
                        </span>
                      </div>
                      <div className='text'>
                        Or <span>click here </span> to select
                      </div>
                      {advancedSettingsState.uploading && (
                        <div className='text'>
                          <span>Uploading... </span>
                        </div>
                      )}
                    </section>
                  )
                }}
              </Dropzone>
            )}
            <section>
              {advancedSettingsState.preview_files.length > 0 && (
                <div className='files__preview'>
                  <span className='image' key={advancedSettingsState.preview_files[0].src}>
                    <img src={advancedSettingsState.preview_files[0].src} key={advancedSettingsState.preview_files[0].src} />
                    <span className='remove__image' onClick={(e) => handlePreviewRemove(e, advancedSettingsState.preview_files[0].src)}>
                      X
                    </span>
                  </span>
                  {advancedSettingsState.preview_files.length > 3 ? `(${advancedSettingsState.preview_files.length})...` : ''}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    )
  }
  const getCommunityrightView = () => {
    return (
      <div className='community-flexBox'>
        <div className={styles.sideLineContainer}>
          <div className={styles.sideBall} />
          <div className={styles.sideLine} />
        </div>
        <div className='community-advance-settings-content'>
          <div className='field-title'>
            <p>Description</p>
          </div>
          <div className='community-description-text-area'>
            <MyGTextarea
              onChange={(event) => {
                updateAdvancedSettings({ description: event.target.value })
              }}
              value={advancedSettingsState.description}
              placeholder='Enter a description for your community'
              maxLength={250}
            />
          </div>
          <div className='field-title'>
            <p>Invite Friends</p>
          </div>
          <div className='experience-select'>
            <MyGAsyncSelect
              isClearable
              isMulti
              isValidNewOption={() => {
                return
              }}
              loadOptions={
                advancedSettingsState.coHosts && advancedSettingsState.coHosts.length >= MAX_INVITEES
                  ? onPlayersSuggestionFetch2
                  : onPlayersSuggestionFetch
              }
              onChange={(value) => {
                updateAdvancedSettings({ coHosts: value })
              }}
              value={advancedSettingsState.coHosts}
              noOptionsMessage={() => {
                return advancedSettingsState.coHosts && advancedSettingsState.coHosts.length >= MAX_INVITEES
                  ? 'Bam! Max number of Invitees reached'
                  : 'Yo! Either nothing to display or you need to type in something'
              }}
              placeholder='Enter your friend’s name to invite them to this community'
            />
          </div>
          <div className='comment-section'>{getCommentPrivaryView()}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.mainContainer}>
      {getCommunityleftView()}
      {getCommunityrightView()}
    </div>
  )
}

export default AddCommunity
