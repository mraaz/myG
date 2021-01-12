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

const AddCommunityContainer = ({ routeProps }) => {
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
    community_id: '',
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
    updateIsSubmitting(false)

    //http://www.yodaspeak.co.uk/index.php

    if (mainSettingsState.community_name == '' || mainSettingsState.community_name == null) {
      toast.success(<Toast_style text={'Be blank community name cannot. The rules, this is. Yes, hmmm.'} />)
      updateIsSubmitting(false)
      return
    }

    if (mainSettingsState.community_name.trim().length < 4) {
      toast.success(<Toast_style text={'Hmmmm, be longer community name must. The rules, four or more are. Yes, hmmm.'} />)
      return
    }

    if (advancedSettingsState.grp_name_unique == false) {
      toast.success(<Toast_style text={'Hmmmm, Invalid community name. Keep trying, you must'} />)
      updateIsSubmitting(false)
      return
    }

    if (advancedSettingsState.tags.length >= MAX_GAME_TAGS) {
      toast.success(<Toast_style text={'Alot of tags, that is. Only process 8 tags, I can. Try again. Yeesssssss.'} />)
      return
    }

    if (advancedSettingsState.coHosts != null && advancedSettingsState.coHosts.length >= MAX_CO_HOSTS) {
      toast.success(<Toast_style text={'Alot of friends, that is. Only process 4 friends, I can. Try again. Yeesssssss.'} />)
      return
    }

    try {
      const { data } = await SubmitDataFunction({
        community_name: mainSettingsState.community_name.trim(),
        game_name_box: mainSettingsState.gameTitle,
        tags: advancedSettingsState.tags,
        description: advancedSettingsState.description,
        coHosts: advancedSettingsState.coHosts,
        autoAccept: mainSettingsState.autoAccept,
        type: advancedSettingsState.type,
        preview_files: advancedSettingsState.preview_files,
      })
      updateGameLink(encodeURI(data.name.trim()))
      updateMainSettingsState({ community_id: data.id, community_name: data.name.trim() })
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
          Create Community
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
          <div className={styles.listedHeader}>Your Community is now created!</div>
          <div className={styles.listedShareText}>Use this link for direct access to your community</div>
          <MyGInput
            value={`https://myG.gg/community/${gameLink}`}
            containerStyles={{ width: '318px' }}
            inputStyles={{ width: '100%', outline: 'none', cursor: 'pointer' }}
            className={'create-community-popup-link'}
            refInput={gameLinkRef}
            onClick={() => {
              window.open(`https://myG.gg/community/${gameLink}`, '_blank')
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
          <Link to='/community/create' replace>
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
          <Link to='/community/create' replace>
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
          community_id={mainSettingsState.community_id}
          community_name={mainSettingsState.community_name}
        />
      )}
    </div>
  )
}

export default AddCommunityContainer
