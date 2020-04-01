import React, { useState, useRef } from 'react'
import { toast } from 'react-toastify'

import { PageHeader, MyGButton, MyGModal, MyGInput } from '../common'
import { styles, SETTINGS_ENUMS } from '../../static/AddGame'
import '../../styles/AddGame/AddGameStyles.scss'
import AddGame from './AddGame'
import { Toast_style } from '../Utility_Function'
import { SubmitDataFunction } from '../AddScheduleGames_Submit_Data'

const AddGameContainer = () => {
  // State
  const [isGameListedModalOpen, toggleGameListedModal] = useState(false)
  const [isSubmitting, updateIsSubmitting] = useState(false)
  const [state, updateComponentState] = useState({ selectedSettings: SETTINGS_ENUMS.MAIN, isGameNameField: false })
  const [advancedSettingsState, updateAdvancedSettingsState] = useState({
    experience: null,
    tags: null,
    platform: null,
    region: null,
    description: '',
    acceptMessage: '',
    optionTags: null,
    tags: null,
    newCreatedTags: null,
  })
  const [mainSettingsState, updateMainSettingsState] = useState({
    gameTitlesList: [],
    gameTitle: null,
    startTime: null,
    endTime: null,
    isEndGameFieldSelected: false,
    isRepeatFieldSelected: false,
    numberOfPlayers: -42,
    isUnlimitedPlayers: true,
    isCommentsAllowed: false,
    isPublicGame: false,
  })
  const [optionalFieldsState, updateOptionalFieldsState] = useState({
    modalRank: null,
    serverRegion: null,
    roleNeeded: null,
    trophies: null,
  })
  const gameLinkRef = useRef(null)

  const onAddGameSubmit = async () => {
    updateIsSubmitting(false)
    if (mainSettingsState.gameTitle == null) {
      toast.success(<Toast_style text={'Sorry mate! Game name can not be blank'} />)
      updateIsSubmitting(false)
      return
    }
    if (mainSettingsState.startTime == null) {
      toast.success(<Toast_style text={'Sorry mate! Start date can not be empty'} />)
      updateIsSubmitting(false)
      return
    }

    if (mainSettingsState.startTime.isSameOrAfter(mainSettingsState.endTime)) {
      toast.success(<Toast_style text={'Sorry mate! End date needs to be AFTER start date'} />)
      updateIsSubmitting(false)
      return
    }

    try {
      await SubmitDataFunction({
        game_name_box: mainSettingsState.gameTitle,
        selected_region: advancedSettingsState.region,
        selected_experience: advancedSettingsState.experience,
        start_date_time: mainSettingsState.startTime,
        endDate: mainSettingsState.endTime,
        selected_platform: advancedSettingsState.platform,
        description_box: advancedSettingsState.description,
        selected_visibility: mainSettingsState.isPublicGame,
        selected_limit: mainSettingsState.numberOfPlayers,
        txtAreaValue: advancedSettingsState.acceptMessage,
        dota2_medal_ranks: optionalFieldsState.modalRank,
        dota2_server_regions: optionalFieldsState.serverRegion,
        dota2_roles: optionalFieldsState.roleNeeded,
        clash_royale_trophies: optionalFieldsState.trophies,
        allow_comments: mainSettingsState.isCommentsAllowed,
      })
      // toggleGameListedModal(true)
    } catch (err) {
      console.log('error on submit: ', err)
      updateIsSubmitting(false)
    }
  }

  const getPageFooter = () => {
    return (
      <div className={styles.footerContainer}>
        <div className={styles.footerSubmitButton} onClick={isSubmitting ? null : onAddGameSubmit}>
          Add Game
        </div>
      </div>
    )
  }

  const copyToClipboard = (e) => {
    gameLinkRef.current.select()
    document.execCommand('copy')
  }

  const getGameListedModal = () => {
    return (
      <MyGModal isOpen={isGameListedModalOpen}>
        <div className={styles.listedTopContentContainer}>
          <div className={styles.listedHeader}>Your Game is now listed!</div>
          <div className={styles.listedShareText}>Share the below link or invite players directly</div>
          <MyGInput
            value='www.myg/game/3304939340'
            containerStyles={{ width: '237px' }}
            inputStyles={{ width: '100%', outline: 'none' }}
            refInput={gameLinkRef}
            readonly>
            <div style={{ marginTop: '9px', marginLeft: '15px', cursor: 'pointer' }} onClick={copyToClipboard}>
              <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/Link.svg' height='18' width='18' />
            </div>
          </MyGInput>
          <div className={styles.listedOrText}>OR</div>
          <MyGButton customStyles={{ color: '#E5C746', border: '2px solid' }} text='Invite Friends' />
        </div>
        <div className={styles.listedBottomContentContainer}>
          <MyGButton customStyles={{ color: '#fff', border: '2px solid' }} text='Done' />
        </div>
      </MyGModal>
    )
  }

  return (
    <div className={styles.container}>
      <PageHeader headerText='Add Public Game' />
      <AddGame
        state={state}
        updateComponentState={updateComponentState}
        advancedSettingsState={advancedSettingsState}
        updateAdvancedSettingsState={updateAdvancedSettingsState}
        mainSettingsState={mainSettingsState}
        updateMainSettingsState={updateMainSettingsState}
        optionalFieldsState={optionalFieldsState}
        updateOptionalFieldsState={updateOptionalFieldsState}
        isSubmitting={isSubmitting}
        updateIsSubmitting={updateIsSubmitting}
      />
      {getPageFooter()}
      {getGameListedModal()}
    </div>
  )
}

export default AddGameContainer
