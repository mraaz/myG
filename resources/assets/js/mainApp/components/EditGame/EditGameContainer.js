import React, { useState, useRef, useEffect } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment'
import classNames from 'classnames'
import Select from 'react-select'

import { PageHeader, MyGButton, MyGModal, MyGInput } from '../common'
import { styles, SETTINGS_ENUMS } from '../../static/AddGame'
import '../../styles/AddGame/AddGameStyles.scss'
import EditGame from './EditGame'
import { Toast_style, Convert_to_comma_delimited_value } from '../Utility_Function'
import { SubmitDataFunction } from './UpdateScheduleGames'
import InvitePlayers from './InvitePlayers'
import { Link } from 'react-router-dom'
import axios from 'axios'

const EditGameContainer = (props) => {
  const { params = {} } = props.routeProps.match
  const { id = '' } = params
  // State
  const [sechduledGameData, setSechduledGameData] = useState({})
  const [isGameListedModalOpen, updateIsGameListedModalOpen] = useState(false)
  const [isReasonModalOpen, updateReasonModalOpen] = useState(false)
  const [isInviteModalOpen, updateIsInviteModalOpen] = useState(false)
  const [isInvitesSentsModalOpen, updateIsInvitesSentsModalOpen] = useState(false)
  const [isSubmitting, updateIsSubmitting] = useState(false)
  const [state, updateComponentState] = useState({ selectedSettings: SETTINGS_ENUMS.MAIN, additional_info: false })
  const [advancedSettingsState, updateAdvancedSettingsState] = useState({
    experience: null,
    platform: null,
    region: null,
    coHosts: null,
    tags: '',
    description: '',
    acceptMessage: '',
    optionTags: '',
  })
  const [mainSettingsState, updateMainSettingsState] = useState({
    scheduledGameId: null,
    scheduledGameGuid: null,
    gameTitlesList: [],
    gameTitle: '',
    startTime: moment(),
    endTime: null,
    isEndGameFieldSelected: false,
    isRepeatFieldSelected: false,
    numberOfPlayers: 0,
    isUnlimitedPlayers: true,
    isCommentsAllowed: true,
    isPublicGame: true,
    autoAccept: true,
    autoJoinHost: true,
  })
  const [optionalFieldsState, updateOptionalFieldsState] = useState({
    modalRank: null,
    serverRegion: null,
    roleNeeded: null,
    trophies: null,
  })
  const [gameLink, updateGameLink] = useState('')
  const gameLinkRef = useRef(null)

  // to create select box value from array or string
  const getExtraFilterOprion = (arg) => {
    const data = arg && arg.length > 0 ? arg.split(',') : []
    if (data.length > 0) {
      return data.map((item) => {
        const val = item ? item.trim() : ''
        return { value: val, label: val }
      })
    } else {
      return null
    }
  }

  useEffect(async () => {
    const { params = {} } = props.routeProps.match
    const { id = '' } = params
    if (id) {
      const scheduleGames = await axios.get(`/api/ScheduleGame/edit_game/${id}`)
      console.log('scheduleGames  ', scheduleGames)

      if (scheduleGames.data && scheduleGames.data.latestScheduledGames.length > 0) {
        const { latestScheduledGames = [] } = scheduleGames.data

        const advanceSettings = { ...advancedSettingsState }

        advanceSettings.acceptMessage = latestScheduledGames[0].accept_msg
        advanceSettings.description = latestScheduledGames[0].description
        advanceSettings.experience = getExtraFilterOprion(latestScheduledGames[0].experience)
        advanceSettings.platform = getExtraFilterOprion(latestScheduledGames[0].platform)
        advanceSettings.optionTags = getExtraFilterOprion(latestScheduledGames[0].tags)

        const mainSettings = { ...mainSettingsState }

        mainSettings.gameTitle = { value: latestScheduledGames[0].game_name, label: latestScheduledGames[0].game_name }
        mainSettings.startTime = moment(latestScheduledGames[0].start_date_time)
        mainSettings.endTime = moment(latestScheduledGames[0].end_date_time)
        mainSettings.isEndGameFieldSelected = latestScheduledGames[0].end_date_time !== null ? true : false
        mainSettings.isCommentsAllowed = latestScheduledGames[0].allow_comments == 1 ? true : false
        mainSettings.isPublicGame = latestScheduledGames[0].visibility == 1 ? true : false
        mainSettings.autoAccept = latestScheduledGames[0].autoJoin == 1 ? true : false
        mainSettings.autoJoinHost = latestScheduledGames[0].autoJoinHost == 1 ? true : false
        mainSettings.scheduledGameId = latestScheduledGames[0].id
        mainSettings.scheduledGameGuid = latestScheduledGames[0].schedule_games_GUID
        mainSettings.cron = latestScheduledGames[0].cron

        updateAdvancedSettingsState(advanceSettings)
        updateMainSettingsState(mainSettings)
        setSechduledGameData(latestScheduledGames)
      }
    }
    return () => {
      return
    }
  }, [])
  // Handlers
  const isButtonDisabled = () => {
    return (
      mainSettingsState.gameTitle == '' ||
      mainSettingsState.gameTitle == null ||
      mainSettingsState.startTime == null ||
      mainSettingsState.startTime.isSameOrAfter(mainSettingsState.endTime)
    )
  }

  const onCancelInviteClick = () => {
    updateIsInviteModalOpen(false)
    updateIsGameListedModalOpen(true)
  }

  const onAddGameSubmit = async () => {
    updateIsSubmitting(false)
    if (mainSettingsState.gameTitle == '' || mainSettingsState.gameTitle == null) {
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

    let value_one = null,
      value_two = null,
      value_three = null,
      value_four = null,
      value_five = null

    //If the field is multi then you need to convert otherwise no need to.

    if (optionalFieldsState.modalRank != null) {
      let tmp = Convert_to_comma_delimited_value(optionalFieldsState.modalRank)
      value_one = { dota2_medal_ranks: tmp }
    }
    if (optionalFieldsState.serverRegion != null) {
      let tmp = Convert_to_comma_delimited_value(optionalFieldsState.serverRegion)
      value_two = { dota2_server_regions: tmp }
    }
    if (optionalFieldsState.roleNeeded != null) {
      let tmp = Convert_to_comma_delimited_value(optionalFieldsState.roleNeeded)
      value_three = { dota2_roles: tmp }
    }
    if (optionalFieldsState.trophies != null) {
      value_one = { clash_royale_trophies: optionalFieldsState.trophies[0].value }
    }

    try {
      const { data } = await SubmitDataFunction({
        game_name_box: mainSettingsState.gameTitle,
        selected_region: advancedSettingsState.region,
        selected_experience: advancedSettingsState.experience,
        startDate: mainSettingsState.startTime,
        endDate: mainSettingsState.endTime,
        selected_platform: advancedSettingsState.platform,
        description_box: advancedSettingsState.description,
        selected_visibility: mainSettingsState.isPublicGame,
        selected_limit: mainSettingsState.numberOfPlayers,
        txtAreaValue: advancedSettingsState.acceptMessage,
        value_one,
        value_two,
        value_three,
        value_four,
        value_five,
        allow_comments: mainSettingsState.isCommentsAllowed,
        autoJoin: mainSettingsState.autoAccept,
        coHosts: advancedSettingsState.coHosts,
        tags: advancedSettingsState.tags,
        cron: mainSettingsState.cron,
        occurrence: mainSettingsState.occurrence,
        repeatEvery: mainSettingsState.repeatEvery,
        autoJoinHost: mainSettingsState.autoJoinHost,
        schedule_games_GUID: props.schedule_games_GUID,
      })
      updateMainSettingsState((currentState) => ({
        ...currentState,
        scheduledGameId: data.id,
        scheduledGameGuid: props.schedule_games_GUID,
      }))
      updateGameLink(data.schedule_games_GUID)
      updateIsGameListedModalOpen(true)
    } catch (err) {
      updateIsSubmitting(false)
    }
  }

  const onCancelGameHandler = () => {
    window.location.href = '/?at=mygame'
  }
  const onDeleteGameHandler = () => {
    alert('click delete.')
  }

  const getPageFooter = () => {
    return (
      <div className={styles.footerContainer}>
        <div
          className={classNames([styles.footerSubmitButton, isButtonDisabled() ? styles.footerSubmitButtonLight : ''])}
          onClick={isSubmitting ? null : onAddGameSubmit}>
          Update Game
        </div>

        <div className={classNames([styles.footerCancelButton])} onClick={isSubmitting ? null : onCancelGameHandler}>
          Cancel
        </div>
        <div className={classNames([styles.footerDeleteButton])} onClick={isSubmitting ? null : onDeleteGameHandler}>
          Delete
        </div>
      </div>
    )
  }

  const copyToClipboard = (e) => {
    gameLinkRef.current.select()
    document.execCommand('copy')
  }

  const onInviteFriendsClick = () => {
    updateIsGameListedModalOpen(false)
    updateIsInviteModalOpen(true)
  }

  const onInvitationSent = () => {
    updateIsInviteModalOpen(false)
    updateIsInvitesSentsModalOpen(true)
  }

  // Views
  const getGameListedModal = () => {
    return (
      <MyGModal isOpen ariaHideApp={false}>
        <div className={styles.listedTopContentContainer}>
          <div className={styles.listedHeader}>Your Game is now listed!</div>
          <div className={styles.listedShareText}>Use this game link for direct access to your game</div>
          <MyGInput
            value={`https://myG.gg/scheduledGames/${gameLink}`}
            containerStyles={{ width: '318px' }}
            inputStyles={{ width: '100%', outline: 'none', cursor: 'pointer' }}
            refInput={gameLinkRef}
            onClick={() => {
              window.open(`https://myG.gg/scheduledGames/${gameLink}`, '_blank')
            }}
            readOnly>
            <div style={{ marginTop: '9px', marginLeft: '15px', cursor: 'pointer' }} onClick={copyToClipboard}>
              <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/platform_images/Dashboard/Link.svg' height='18' width='18' />
            </div>
          </MyGInput>
          <div className={styles.listedOrText}>OR</div>
          <MyGButton customStyles={{ color: '#E5C746', border: '2px solid' }} text='Invite Friends' onClick={onInviteFriendsClick} />
        </div>
        <div className={styles.listedBottomContentContainer}>
          <MyGButton customStyles={{ color: '#fff', border: '2px solid' }} text='Done' onClick={() => updateIsGameListedModalOpen(false)} />
        </div>
      </MyGModal>
    )
  }
  const handleSelectChange = (data) => {
    try {
      console.log('data ', data)
    } catch (error) {
      console.log('Select Change Join button  error ', error)
    }
  }

  const selectReasonToDelete = () => {
    return (
      <MyGModal isOpen ariaHideApp={false}>
        <div className={styles.listedTopContentContainer}>
          <div className={styles.listedHeader}>Are you sure?</div>
          <div className={styles.listedShareText}>Select a reason for canceling</div>

          <Select
            onChange={(data) => handleSelectChange(data)}
            options={[
              { value: 1, label: 'Real life issues, sorry all' },
              { value: 2, label: 'Technical issues, sorry all' },
              { value: 3, label: 'Totally forgot about this, my bad' },
              { value: 4, label: 'Not enuf players' },
              { value: 5, label: 'Decided not to play anymore, sorry all' },
            ]}
            placeholder={'Select a reason '}
            className='game__values'
            classNamePrefix='filter'
            value={''}
          />
        </div>
        <div className={styles.listedBottomContentContainer}>
          <MyGButton
            customStyles={{ background: '#E5C746', color: '#000000' }}
            text='Submit'
            onClick={() => updateReasonModalOpen(false)}
          />
          <MyGButton customStyles={{ color: '#FFFFFF', border: '2px solid #FFFFFF' }} text='Cancel' />
        </div>
      </MyGModal>
    )
  }

  const getInvitesSentModal = () => {
    return (
      <MyGModal isOpen ariaHideApp={false}>
        <div className={styles.listedTopContentContainer}>
          <div className={styles.listedHeader}>Invites sent!</div>
          <div className={styles.listedShareText}>Invites have been sent out successfully!</div>
          <Link to='/scheduledGames'>
            <MyGButton customStyles={{ color: '#E5C746', border: '2px solid' }} text='View Game' />
          </Link>
        </div>
        <div className={styles.listedBottomContentContainer}>
          <Link to={`/editScheduleGames/${id}`} replace>
            <MyGButton customStyles={{ color: '#fff', border: '2px solid' }} text='Done' />
          </Link>
        </div>
      </MyGModal>
    )
  }
  return (
    <div className={styles.container}>
      <PageHeader headerText='Edit Game' />
      <EditGame
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
      {/* {selectReasonToDelete()} */}
      {isGameListedModalOpen && getGameListedModal()}
      {isInvitesSentsModalOpen && getInvitesSentModal()}
      {isInviteModalOpen && (
        <InvitePlayers
          onInvitationSent={onInvitationSent}
          onCancelInviteClick={onCancelInviteClick}
          gameId={mainSettingsState.gameTitle.game_names_id}
          scheduledGameId={mainSettingsState.scheduledGameId}
          scheduledGameGuid={mainSettingsState.scheduledGameGuid}
          gameTitle={mainSettingsState.gameTitle.value}
          startTime={mainSettingsState.startTime.valueOf()}
        />
      )}
    </div>
  )
}

export default EditGameContainer
