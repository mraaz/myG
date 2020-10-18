import React, { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment'
import classNames from 'classnames'

import { PageHeader, MyGButton, MyGModal, MyGInput } from '../common'
import { styles, SETTINGS_ENUMS } from '../../static/AddGame'
import '../../styles/AddGame/AddGameStyles.scss'
import AddGame from './AddGame'
import { Toast_style, Convert_to_comma_delimited_value } from '../Utility_Function'
import { SubmitDataFunction } from './AddScheduleGames_Submit_Data'
import InvitePlayers from './InvitePlayers'
import { Link } from 'react-router-dom'

const MAX_GAME_TAGS = 9
const MAX_CO_HOSTS = 5

const AddGameContainer = () => {
  // State
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
    show_experience: true,
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

    if (advancedSettingsState.tags.length >= MAX_GAME_TAGS) {
      toast.success(<Toast_style text={"Crikey, mate! That's alot of tags. I can only process 8 tags. Try again!"} />)
      return
    }

    if (advancedSettingsState.coHosts != null && advancedSettingsState.coHosts.length >= MAX_CO_HOSTS) {
      toast.success(<Toast_style text={"Crikey, mate! That's alot of co-hosts. I can only process 4 co-hosts. Try again!"} />)
      return
    }

    let value_one = null,
      value_two = null,
      value_three = null,
      value_four = null,
      value_five = null

    if (optionalFieldsState.value_one != null) {
      let tmp = Convert_to_comma_delimited_value(optionalFieldsState.value_one)
      value_one = { [optionalFieldsState.value_one_key]: tmp }
    }
    if (optionalFieldsState.value_two != null) {
      let tmp = Convert_to_comma_delimited_value(optionalFieldsState.value_two)
      value_two = { [optionalFieldsState.value_two_key]: tmp }
    }
    if (optionalFieldsState.value_three != null) {
      let tmp = Convert_to_comma_delimited_value(optionalFieldsState.value_three)
      value_three = { [optionalFieldsState.value_three_key]: tmp }
    }
    if (optionalFieldsState.value_four != null) {
      let tmp = Convert_to_comma_delimited_value(optionalFieldsState.value_four)
      value_four = { [optionalFieldsState.value_four_key]: tmp }
    }
    if (optionalFieldsState.value_five != null) {
      let tmp = Convert_to_comma_delimited_value(optionalFieldsState.value_five)
      value_five = { [optionalFieldsState.value_five_key]: tmp }
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
        mic: advancedSettingsState.mic,
        eighteen_plus: advancedSettingsState.eighteen_plus,
        language: advancedSettingsState.language,
      })
      updateMainSettingsState((currentState) => ({
        ...currentState,
        scheduledGameId: data.id,
        scheduledGameGuid: data.schedule_games_GUID,
      }))
      updateGameLink(data.schedule_games_GUID)
      updateIsGameListedModalOpen(true)
    } catch (err) {
      updateIsSubmitting(false)
    }
  }

  const getPageFooter = () => {
    return (
      <div className={styles.footerContainer}>
        <div
          className={classNames([styles.footerSubmitButton, isButtonDisabled() ? styles.footerSubmitButtonLight : ''])}
          onClick={isSubmitting ? null : onAddGameSubmit}>
          Add Game
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
              <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/Link.svg' height='18' width='18' />
            </div>
          </MyGInput>
          <div className={styles.listedOrText}>OR</div>
          <MyGButton customStyles={{ color: '#E5C746', border: '2px solid' }} text='Invite Friends' onClick={onInviteFriendsClick} />
        </div>
        <div className={styles.listedBottomContentContainer}>
          <Link to='/addScheduleGames' replace>
            <MyGButton customStyles={{ color: '#fff', border: '2px solid' }} text='Done' />
          </Link>
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
          <Link to='/addScheduleGames' replace>
            <MyGButton customStyles={{ color: '#fff', border: '2px solid' }} text='Done' />
          </Link>
        </div>
      </MyGModal>
    )
  }

  return (
    <div className={styles.container}>
      <PageHeader headerText='Create Match' />
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

export default AddGameContainer
