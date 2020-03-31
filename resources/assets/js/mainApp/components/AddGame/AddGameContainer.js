import React, { useState } from 'react'
import { toast } from 'react-toastify'

import { PageHeader, MyGButton, MyGModal } from '../common'
import { styles, SETTINGS_ENUMS } from '../../static/AddGame'
import '../../styles/AddGame/AddGameStyles.scss'
import AddGame from './AddGame'
import { Toast_style } from '../Utility_Function'
import { SubmitDataFunction } from '../AddScheduleGames_Submit_Data'

const AddGameContainer = () => {
  // State
  const [isGameListedModalOpen, toggleGameListedModal] = useState(false)
  const [isSubmitting, updateIsSubmitting] = useState(false)
  const [state, updateComponentState] = useState({ selectedSettings: SETTINGS_ENUMS.MAIN })
  const [advancedSettingsState, updateAdvancedSettingsState] = useState({
    experience: null,
    tags: null,
    platform: null,
    region: null,
    description: '',
    acceptMessage: '',
  })
  const [mainSettingsState, updateMainSettingsState] = useState({
    gameTitlesList: [],
    gameTitle: null,
    startTime: null,
    endTime: null,
    isEndGameFieldSelected: false,
    isRepeatFieldSelected: false,
    numberOfPlayers: 42,
    isUnlimitedPlayers: true,
    isCommentsAllowed: false,
    isPublicGame: false,
  })
  const [optionalFieldsState, updateOptionalFieldsState] = useState({
    modalRank: null,
    serverRegion: null,
    roleNeeded: null,
  })

  const onAddGameSubmit = async () => {
    updateIsSubmitting(false)
    if (mainSettingsState.gameTitle == null) {
      toast.success(<Toast_style text={'Sorry mate! Game name can not be blank'} />)
      updateIsSubmitting(false)
      return
    }
    if (mainSettingsState.startDate == null) {
      toast.success(<Toast_style text={'Sorry mate! Start date can not be empty'} />)
      updateIsSubmitting(false)
      return
    }

    if (mainSettingsState.startDate.isSameOrAfter(mainSettingsState.endDate)) {
      toast.success(<Toast_style text={'Sorry mate! End date needs to be AFTER start date'} />)
      updateIsSubmitting(false)
      return
    }

    try {
      await SubmitDataFunction()
    } catch (err) {
      console.log('error on submit: ', err)
      updateIsSubmitting(false)
    }
    toggleGameListedModal(true)
  }

  const getPageFooter = () => {
    return (
      <div className={styles.footerContainer}>
        <div className={styles.footerSubmitButton} onClick={onAddGameSubmit}>
          Add Game
        </div>
      </div>
    )
  }

  const getGameListedModal = () => {
    return (
      <MyGModal isOpen={isGameListedModalOpen}>
        <div className={styles.listedTopContentContainer}>
          <div className={styles.listedHeader}>Your Game is now listed!</div>
          <div className={styles.listedShareText}>Share the below link or invite players directly</div>
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
