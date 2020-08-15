import React, { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import classNames from 'classnames'

import { PageHeader, MyGButton, MyGModal, MyGInput } from '../common'
import { styles } from '../../static/AddCommunity'
import '../../styles/Community/AddCommunityStyles.scss'
import AddCommunity from './AddCommunity'
import { Toast_style, Convert_to_comma_delimited_value } from '../Utility_Function'
import { SubmitDataFunction } from './AddCommunity_Submit_Data'
import InvitePlayers from './InvitePlayers'
import { Link } from 'react-router-dom'

const MAX_GAME_TAGS = 9
const MAX_CO_HOSTS = 5

const AddCommunityContainer = () => {
  // State
  const [isGameListedModalOpen, updateIsGameListedModalOpen] = useState(false)
  const [isInviteModalOpen, updateIsInviteModalOpen] = useState(false)
  const [isInvitesSentsModalOpen, updateIsInvitesSentsModalOpen] = useState(false)
  const [isSubmitting, updateIsSubmitting] = useState(false)
  const [advancedSettingsState, updateAdvancedSettingsState] = useState({
    coHosts: null,
    tags: '',
    description: '',
    optionTags: '',
    grp_name_unique: true,
    type: 1,
    uploading: false,
    preview_files: [],
  })
  const [mainSettingsState, updateMainSettingsState] = useState({
    gameTitlesList: [],
    gameTitle: '',
    autoAccept: true,
    community_name: '',
  })

  const [gameLink, updateGameLink] = useState('')
  const gameLinkRef = useRef(null)

  // Handlers
  const isButtonDisabled = () => {
    return mainSettingsState.community_name == '' || mainSettingsState.community_name == null
  }

  const onCancelInviteClick = () => {
    updateIsInviteModalOpen(false)
    updateIsGameListedModalOpen(true)
  }

  const onAddGameSubmit = async () => {
    console.log(advancedSettingsState.preview_files)
    return
    updateIsSubmitting(false)

    if (mainSettingsState.community_name == '' || mainSettingsState.community_name == null) {
      toast.success(<Toast_style text={"Hmmmm, blank community name can't be. The rules it is"} />)
      updateIsSubmitting(false)
      return
    }

    if (advancedSettingsState.grp_name_unique == false) {
      toast.success(<Toast_style text={'Hmmmm, Invalid community name. Keep trying, you must'} />)
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

    try {
      const { data } = await SubmitDataFunction({
        community_name: mainSettingsState.community_name,
        game_name_box: mainSettingsState.gameTitle,
        tags: advancedSettingsState.tags,
        description: advancedSettingsState.description,
        coHosts: advancedSettingsState.coHosts,
        autoAccept: mainSettingsState.autoAccept,
        type: advancedSettingsState.type,
      })
      updateMainSettingsState((currentState) => ({
        ...currentState,
        scheduledGameId: data.id,
        scheduledGameGuid: data.schedule_games_GUID,
      }))
      updateGameLink(data.id)
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
          Add Community
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
          <div className={styles.listedHeader}>Your Community is now listed!</div>
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
      <PageHeader headerText='Create Community' />
      <AddCommunity
        advancedSettingsState={advancedSettingsState}
        updateAdvancedSettingsState={updateAdvancedSettingsState}
        mainSettingsState={mainSettingsState}
        updateMainSettingsState={updateMainSettingsState}
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

export default AddCommunityContainer
