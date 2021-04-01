/*
 * Author : Nitin Tyagi
 * Github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { useState, useRef, useEffect } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment'
import classNames from 'classnames'
import Select from 'react-select'
import axios from 'axios'

import { withRouter } from 'react-router-dom'

import { PageHeader, MyGButton, MyGModal, MyGInput } from '../common'
import { styles, SETTINGS_ENUMS } from '../../static/AddGame'
import '../../styles/AddGame/AddGameStyles.scss'
import EditGame from './EditGame'
import { Toast_style, Convert_to_comma_delimited_value } from '../Utility_Function'
import { SubmitDataFunction } from './UpdateScheduleGames'
import InvitePlayers from './InvitePlayers'
import { Link } from 'react-router-dom'
import SweetAlert from '../common/MyGSweetAlert'

const EditGameContainer = (props) => {
  const { params = {} } = props.routeProps.match
  const { id = '' } = params
  // State
  const [reason, setReason] = useState('')
  const [showReasonModal, setShowReasonModal] = useState(false)
  const [showSweetAlert, setShowSweetAlert] = useState(null)
  const [sechduledGameData, setSechduledGameData] = useState({})
  const [hasAttendees, setHasAttendees] = useState(false)
  const [isGameListedModalOpen, updateIsGameListedModalOpen] = useState(false)
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
    mic: false,
    eighteen_plus: false,
    language: null,
    show_experience: false,
    show_platform: true,
    show_region: true,
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
    value_one: null,
    value_two: null,
    value_three: null,
    value_four: null,
    value_five: null,
    game_name_fields_img: '',
    value_one_key: null,
    value_two_key: null,
    value_three_key: null,
    value_four_key: null,
    value_five_key: null,
  })
  const [gameLink, updateGameLink] = useState('')
  const gameLinkRef = useRef(null)

  // to create select box value from array or string
  const getExtraFilterOprion = (arg = '') => {
    let data = []
    if (typeof arg == 'string') {
      data = arg && arg.length > 0 ? arg.split(',') : []
    } else if (Array.isArray(arg)) {
      data = arg
    }

    if (data.length > 0) {
      return data.map((item) => {
        //const val = item && item.content ? item.content : item ? item.trim() : ''
        const val = item && item.content ? item.content : item && item.alias ? item.alias : item ? item.trim() : ''
        if (item.co_hosts_coming_down) {
          return { value: item.co_hosts_coming_down, label: val }
        }
        if (item.game_tags_coming_down) {
          return { value: val, label: val, game_tag_id: item.game_tags_coming_down }
        }

        return { value: val, label: val }
      })
    } else {
      return null
    }
  }

  const hideAlert = (val) => {
    setShowSweetAlert(null)

    if (val == 'true') {
      const deleteGameData = axios.delete(`/api/ScheduleGame/delete/${id}/0`)
      toast.success(<Toast_style text={'Woot! Game has been deleted successfully.'} />)
      props.routeProps.history.push('/?at=mygames')
    }
  }

  const renderSweetAlert = () => (
    <SweetAlert
      success
      showCancel
      title='Are you sure ?'
      confirmBtnText='Make it so!'
      confirmBtnBsStyle='success'
      focusCancelBtn={true}
      focusConfirmBtn={false}
      showCloseButton={true}
      onConfirm={() => hideAlert('true')}
      onCancel={() => hideAlert('false')}></SweetAlert>
  )

  useEffect(() => {
    const innerFunc = async () => {
      const { params = {} } = props.routeProps.match
      const { id = '' } = params
      if (id) {
        const scheduleGames = await axios.get(`/api/ScheduleGame/edit_game/${id}`)
        if (scheduleGames.data && scheduleGames.data.latestScheduledGames.length > 0) {
          const { latestScheduledGames = [], hasAttendees = 0, additional_submit_info = false } = scheduleGames.data

          const advanceSettings = { ...advancedSettingsState }

          advanceSettings.acceptMessage = latestScheduledGames[0].accept_msg
          advanceSettings.description = latestScheduledGames[0].description
          advanceSettings.experience = getExtraFilterOprion(latestScheduledGames[0].experience)
          advanceSettings.platform = getExtraFilterOprion(latestScheduledGames[0].platform)
          advanceSettings.optionTags = getExtraFilterOprion(latestScheduledGames[0].tags)
          advanceSettings.tags = getExtraFilterOprion(latestScheduledGames[0].tags)
          advanceSettings.coHosts = getExtraFilterOprion(latestScheduledGames[0].co_hosts)
          advanceSettings.language = getExtraFilterOprion(latestScheduledGames[0].game_languages)

          advanceSettings.mic = latestScheduledGames[0].mic == 1 ? true : false
          advanceSettings.eighteen_plus = latestScheduledGames[0].eighteen_plus == 1 ? true : false

          if (!advanceSettings.tags) {
            advanceSettings.tags = ''
          }
          if (!advanceSettings.optionTags) {
            advanceSettings.optionTags = ''
          }

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
          mainSettings.isRepeatFieldSelected = latestScheduledGames[0].repeatEvery == 1 ? true : false
          mainSettings.cron = latestScheduledGames[0].cron

          const optionalFields = { ...optionalFieldsState }
          optionalFields.value_one = latestScheduledGames[0].value_one ? getExtraFilterOprion(latestScheduledGames[0].value_one) : null
          optionalFields.value_two = latestScheduledGames[0].value_two ? getExtraFilterOprion(latestScheduledGames[0].value_two) : null
          optionalFields.value_three = latestScheduledGames[0].value_three
            ? getExtraFilterOprion(latestScheduledGames[0].value_three)
            : null
          optionalFields.value_four = latestScheduledGames[0].value_four ? getExtraFilterOprion(latestScheduledGames[0].value_four) : null
          optionalFields.value_five = latestScheduledGames[0].value_five ? getExtraFilterOprion(latestScheduledGames[0].value_five) : null

          const localState = { ...state }
          localState.additional_info = additional_submit_info

          updateAdvancedSettingsState(advanceSettings)
          updateMainSettingsState(mainSettings)
          updateOptionalFieldsState(optionalFields)
          updateComponentState(localState)
          setSechduledGameData(latestScheduledGames)
          setHasAttendees(hasAttendees)
        } else {
          props.routeProps.history.push('/?at=mygames')
        }
      }
    }
    innerFunc()
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
      value_five = null,
      tmp_val = ''

    if (optionalFieldsState.value_one != null) {
      tmp_val = Convert_to_comma_delimited_value(optionalFieldsState.value_one)
      value_one = { [optionalFieldsState.value_one_key]: tmp_val }
    }
    if (optionalFieldsState.value_two != null) {
      tmp_val = Convert_to_comma_delimited_value(optionalFieldsState.value_two)
      value_two = { [optionalFieldsState.value_two_key]: tmp_val }
    }
    if (optionalFieldsState.value_three != null) {
      tmp_val = Convert_to_comma_delimited_value(optionalFieldsState.value_three)
      value_three = { [optionalFieldsState.value_three_key]: tmp_val }
    }
    if (optionalFieldsState.value_four != null) {
      tmp_val = Convert_to_comma_delimited_value(optionalFieldsState.value_four)
      value_four = { [optionalFieldsState.value_four_key]: tmp_val }
    }
    if (optionalFieldsState.value_five != null) {
      tmp_val = Convert_to_comma_delimited_value(optionalFieldsState.value_five)
      value_five = { [optionalFieldsState.value_five_key]: tmp_val }
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
        schedule_games_GUID: mainSettingsState.scheduledGameGuid,
        gameId: id,
        mic: advancedSettingsState.mic,
        eighteen_plus: advancedSettingsState.eighteen_plus,
        language: advancedSettingsState.language,
      })

      updateMainSettingsState((currentState) => ({
        ...currentState,
        scheduledGameId: data.id,
        scheduledGameGuid: mainSettingsState.scheduledGameGuid,
      }))
      updateGameLink(mainSettingsState.scheduledGameGuid)

      // updateIsGameListedModalOpen(true)
      props.routeProps.history.push('/?at=mygames')
    } catch (error) {
      updateIsSubmitting(false)
    }
  }

  const onCancelGameHandler = () => {
    props.routeProps.history.push('/?at=mygames')
  }
  const onDeleteGameHandler = () => {
    if (hasAttendees == 0) {
      setShowSweetAlert(renderSweetAlert())
    } else {
      setShowReasonModal(true)
    }
  }
  const handleReasonSubmit = (value) => {
    setShowReasonModal(false)
    if (value && reason.value) {
      const deleteGameData = axios.delete(`/api/ScheduleGame/delete/${id}/${reason.value}`)
      setReason('')
      toast.success(<Toast_style text={'Booo! Game has been deleted.'} />)
      props.routeProps.history.push('/?at=mygames')
    }
  }

  const getPageFooter = () => {
    return (
      <div className={styles.footerContainer} id={styles.footerContainer}>
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
              <img src='https://myG.gg/platform_images/Dashboard/Link.svg' height='18' width='18' />
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
      setReason(data)
    } catch (error) {
      console.log('Select Change Join button  error ', error)
    }
  }

  const selectReasonToDelete = () => {
    return (
      <div className={`modal-container View__JoinBUtton__modal ${showReasonModal ? 'modal--show' : ''}`}>
        <div className='modal-wrap'>
          <div className='modal__body'>
            <div className='body__content'>
              <h1>Suffering succotash!</h1>
              <p>....but why???</p>

              <Select
                style={{ width: '100%' }}
                onChange={(data) => handleSelectChange(data)}
                options={[
                  { value: 1, label: 'Real life issues, sorry all' },
                  { value: 2, label: 'Technical issues, sorry all' },
                  { value: 3, label: 'Totally forgot about this, my bad' },
                  { value: 4, label: 'Not enuf players' },
                  { value: 5, label: 'Decided not to play anymore, sorry all' },
                  { value: 6, label: 'Meh, bite me!' },
                  { value: 7, label: 'Old game, just doing clean up :)' },
                ]}
                placeholder={'Select a reason '}
                className='game__values'
                classNamePrefix='filter'
                value={reason}
              />
            </div>
            <div className='modal__close' onClick={() => handleReasonSubmit(false)}>
              <img src='https://myG.gg/platform_images/Dashboard/X_icon.svg' />
            </div>
          </div>
          <div className='modal__footer'>
            <MyGButton customStyles={{ color: '#fff', border: '2px solid #fff' }} onClick={() => handleReasonSubmit(false)} text='Cancel' />
            <button type='button' disabled={reason == ''} onClick={() => handleReasonSubmit(true)}>
              Submit
            </button>
          </div>
        </div>
        <div className='modal-overlay' onClick={() => handleReasonSubmit(false)}></div>
      </div>
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
    <div className={styles.edit__container}>
      <PageHeader headerText='Edit Game' />
      {mainSettingsState.scheduledGameId && (
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
      )}
      {getPageFooter()}
      {showReasonModal && selectReasonToDelete()}
      {showSweetAlert}
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
