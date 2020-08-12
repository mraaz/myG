import React, { Fragment, useState, useEffect } from 'react'
const buckectBaseUrl = 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/'

import { toast } from 'react-toastify'
import axios from 'axios'

import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { useDropzone } from 'react-dropzone'

import { Toast_style } from '../Utility_Function'
import '../../styles/Community/AddCommunityStyles.scss'

import { styles } from '../../static/AddCommunity'

import { MyGCheckbox, MyGTextarea, MyGAsyncSelect, MyGCreateableSelect, MyGInput } from '../common'
import { Game_name_values, Group_Hash_Tags, Disable_keys } from '../Utility_Function'
import { parsePlayersToSelectData } from '../../utils/InvitePlayersUtils'

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
    const getInitialData_Tags = async function() {
      try {
        let results = await Group_Hash_Tags()
        updateAdvancedSettings({ optionTags: results })
      } catch (error) {
        console.log(error)
      }
    }

    const getInitialData_GameName = async function() {
      try {
        let results = await Game_name_values()
        updateMainSettings({ gameTitlesList: results })
      } catch (error) {
        console.log(error)
      }
    }

    getInitialData_Tags()
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

  const createOption = (label, game_names_id) => ({
    label,
    value: label,
    game_names_id,
  })

  const handleCreateTags = (inputValue) => {
    if (inputValue.length > 88) {
      toast.success(<Toast_style text={'Sorry mate! Game tags length is too long.'} />)
      return
    }
    if (/['/.%#$,;`\\]/.test(inputValue)) {
      toast.success(<Toast_style text={'Sorry mate! Game tags can not have invalid characters'} />)
      return
    }

    const { optionTags, tags } = advancedSettingsState
    const newOption = createOption(inputValue, null)
    updateAdvancedSettings({
      optionTags: [...optionTags, newOption],
      tags: [...tags, newOption],
    })
  }

  const handleCreateGame = (inputValue) => {
    if (inputValue.length > 88) {
      toast.success(<Toast_style text={'Sorry mate! Game Title is too long.'} />)
      return
    }

    const { gameTitlesList, gameTitle } = mainSettingsState
    const newOption = createOption(inputValue, null)
    updateMainSettings({ gameTitlesList: [...gameTitlesList, newOption], gameTitle: newOption })
  }

  // api calls
  const getOptionsTags = (inputValue) => {
    const getInitialData = async function(inputValue) {
      try {
        let results = await Group_Hash_Tags(inputValue)
        updateAdvancedSettings({ optionTags: results })
      } catch (error) {
        // Error get option tags
      }
    }

    if (inputValue.length > 88) {
      toast.success(<Toast_style text={'Sorry mate! Game Tag is too long.'} />)
      return
    }
    getInitialData(inputValue)
  }

  const getOptionsGames = (inputValue) => {
    const getInitialData = async function(inputValue) {
      try {
        let results = await Game_name_values(inputValue)
        updateMainSettings({ gameTitlesList: results })
      } catch (error) {
        // Error get option tags
      }
    }

    if (inputValue.length > 88) {
      toast.success(<Toast_style text={'Sorry mate! Game Title is too long.'} />)
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
      </div>
    )
  }

  const getCommunityleftView = () => {
    const handleChangeStatus = ({ meta }, status, allFiles) => {
      this.state.store_files = allFiles
      if (status === 'done') {
        const file = allFiles[0].file
        const name = allFiles[0].meta.name
        this.doUploadS3(file, name)
      }
      if (status == 'removed' && this.state.lock == false) {
        this.removeIndivdualfromAWS()
      }
    }

    const handleSubmit = (files, allFiles) => {
      if (this.state.uploading == true) {
        return
      }
      this.props.callbackConfirm(this.state.file_src, this.state.file_key)

      this.setState({
        store_files: [],
        file_key: '',
        file_src: '',
      })

      this.state.lock = true
      allFiles.forEach((f) => f.remove())
      this.state.lock = false
    }
    return (
      <div style={{ display: 'flex' }}>
        <div className={styles.sideLineContainer}>
          <div className={styles.sideBall} />
          <div className={styles.sideLine} />
        </div>
        <div className='main-settings-content'>
          <div className='field-title'>
            <p>Community Name</p>
          </div>
          <div className='game-title-select'>
            <MyGInput
              value={mainSettingsState.community_name}
              type='text'
              maxLength={75}
              onKeyDown={Disable_keys}
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
              onInputChange={getOptionsGames}
              onChange={(value) => {
                updateMainSettings({ gameTitle: value })
              }}
              value={mainSettingsState.gameTitle}
              placeholder='Search, Select or create Game Title'
              options={mainSettingsState.gameTitlesList}
              onKeyDown={Disable_keys}
            />
          </div>
          <div className='field-title'>
            <p>Featured Image</p>
          </div>
          <div className='media__container'>
            <Dropzone
              onChangeStatus={handleChangeStatus}
              onSubmit={handleSubmit}
              maxFiles={1}
              maxSizeBytes={26214400}
              accept='image/*'
              inputContent={(files, extra) =>
                extra.reject ? (
                  'Image files only'
                ) : (
                  <section className='custom__html dropzone-section'>
                    <div className='text'>Drop your image or video</div>
                    <div className='images community-images-container'>
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
                  </section>
                )
              }
            />
          </div>
          <div className='field-title hash-tags'>
            <p>Add Hashtags</p>
          </div>
          <div className='game-title-select'>
            <MyGCreateableSelect
              isClearable
              isMulti
              onCreateOption={handleCreateTags}
              onInputChange={getOptionsTags}
              onChange={(value) => {
                updateAdvancedSettings({ tags: value })
              }}
              value={advancedSettingsState.tags}
              placeholder='Search, Select or create Game Tags'
              options={advancedSettingsState.optionTags}
              onKeyDown={Disable_keys}
            />
          </div>
        </div>
      </div>
    )
  }
  const getCommunityrightView = () => {
    return (
      <div style={{ display: 'flex' }}>
        <div className={styles.sideLineContainer}>
          <div className={styles.sideBall} />
          <div className={styles.sideLine} />
        </div>
        <div className='advance-settings-content'>
          <div className='field-title'>Description</div>
          <div className='description-text-area'>
            <MyGTextarea
              onChange={(event) => {
                updateAdvancedSettings({ description: event.target.value })
              }}
              value={advancedSettingsState.description}
              placeholder='Enter a description for your community'
              maxLength={250}
            />
          </div>
          <div className='field-title'>Moderators</div>
          <div className='experience-select'>
            <MyGAsyncSelect
              isClearable
              isMulti
              isValidNewOption={() => {
                return
              }}
              loadOptions={onPlayersSuggestionFetch}
              onChange={(value) => {
                updateAdvancedSettings({ coHosts: value })
              }}
              value={advancedSettingsState.coHosts}
              placeholder='Enter your friend’s name to set them as a moderators'
              className='test'
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
