import React from 'react'
import { getAssetUrl } from '../../../../common/assets'
import { ignoreFunctions } from '../../../../common/render'
import { showMessengerAlert } from '../../../../common/alert'
import MainInfo from './main-info'
import Experiences from './experiences'

export default class EditGameExperience extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    selectedTab: 'main',
    loaded: false,
    id: null,
    mainFields: [],
    game: null,
    nickname: null,
    level: null,
    experience: null,
    background: [],
    team: null,
    tags: []
  }

  componentDidMount() {
    this.setState(this.prepareExperience())
    document.addEventListener('keydown', this.onKeyPressed, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPressed, false)
  }

  onKeyPressed = (event) => {
    if (event.keyCode === 27) this.onClose()
  }

  prepareExperience = () => {
    const { id, mainFields, game, gameName, gameImage, nickname, level, experience, team, tags, rating, dynamic, background } =
      this.props.gameExperience || {}
    const commends = (this.props.profile.commended || []).filter((commend) => commend.gameExperienceId === id).length
    return {
      loaded: true,
      id: id || null,
      commends: commends || 0,
      mainFields: mainFields ? mainFields.map((field) => ({ value: field, label: field })) : [],
      game: game ? { game_names_id: game, value: gameName, label: gameName } : null,
      gameImage: gameImage || null,
      nickname: nickname || null,
      level: level ? { value: level, label: level } : null,
      experience: experience ? { value: experience, label: experience } : null,
      team: team || null,
      tags: tags ? tags.map((tag) => ({ value: tag, label: tag })) : [],
      rating: rating || 0,
      dynamic: dynamic || {},
      background: background
        ? background.map((experience) => ({
            id: experience.id || null,
            team: experience.team || null,
            role: experience.role || null,
            experience: experience.experience ? { value: experience.experience, label: experience.experience } : null,
            skills: experience.skills ? experience.skills.map((skill) => ({ value: skill, label: skill })) : []
          }))
        : []
    }
  }

  getUpdates = (experience) => {
    const updates = {}
    if (experience.id) updates.id = experience.id
    if (experience.imageKey) updates.imageKey = experience.imageKey
    if (experience.imageSource) updates.imageSource = experience.imageSource
    if (experience.mainFields) updates.mainFields = experience.mainFields.map((entry) => entry.value).join('|')
    if (experience.game) updates.game = experience.game.game_names_id
    if (experience.game) updates.gameName = experience.game.value
    if (experience.nickname) updates.nickname = experience.nickname
    if (experience.level) updates.level = experience.level.value
    if (experience.experience) updates.experience = experience.experience.value
    if (experience.team) updates.team = experience.team
    if (experience.tags) updates.tags = experience.tags.map((entry) => entry.value).join('|')
    if (experience.rating) updates.rating = experience.rating
    if (experience.dynamic) updates.dynamic = experience.dynamic
    if (experience.background) {
      updates.background = (experience.background || []).filter(this.hasAddedDataToExperience).map((experience) => ({
        id: experience.id,
        team: experience.team,
        role: experience.role,
        experience: experience.experience && experience.experience.value,
        skills: experience.skills && experience.skills.map((entry) => entry.value).join('|')
      }))
    }
    return updates
  }

  onClose = () => {
    if (this.props.onboarding) return
    const originalValues = this.getUpdates(this.prepareExperience())
    const updates = this.getUpdates(this.state)
    const hasPendingChanges = JSON.stringify(originalValues) !== JSON.stringify(updates)
    if (hasPendingChanges)
      showMessengerAlert('You have unsaved changes, are you sure you want to close?', this.props.onClose, null, 'Make it so')
    else this.props.onClose()
  }

  onUpdate = () => {
    this.props.updateGame(this.props.alias, this.getUpdates(this.state))
    if (this.props.onboarding) return this.props.setOnboardingStep(2)
    this.props.onClose()
  }

  hasAddedDataToExperience = (experience) => {
    return experience.team || experience.experience || experience.role || (experience.skills && experience.skills.length)
  }

  renderOptionsMenu = (bottom) => {
    if (this.props.onboarding) return null
    if (bottom && window.innerWidth > 575) return null
    const baseStyle = 'option'
    const experienceTabEnabled = this.state.level && this.state.level.value !== 'Casual'
    const disabledStyle = experienceTabEnabled ? baseStyle + ' clickable' : baseStyle + ' disabled'
    const mainStyle = this.state.selectedTab === 'main' ? baseStyle + ' clickable selected' : baseStyle + ' clickable'
    const experienceStyle = this.state.selectedTab === 'experience' ? baseStyle + ' clickable selected' : disabledStyle
    return (
      <div className={bottom ? 'options-menu bottom-menu' : 'options-menu left-menu'}>
        <div className={mainStyle} onClick={() => this.setState({ selectedTab: 'main' })}>
          <div className='icon' style={{ backgroundImage: `url(${getAssetUrl('ic_profile_main_info')})` }} />
          <span>Main Info</span>
        </div>
        <div className={experienceStyle} onClick={() => experienceTabEnabled && this.setState({ selectedTab: 'experience' })}>
          <div className='icon' style={{ backgroundImage: `url(${getAssetUrl('ic_profile_experience')})` }} />
          <span>Experience</span>
        </div>
      </div>
    )
  }

  renderEditMenuContent = () =>
    this.state.selectedTab === 'main' ? (
      <MainInfo
        onboarding={this.props.onboarding}
        skipOnboarding={this.props.skipOnboarding}
        profile={this.props.profile}
        isSelf={this.props.isSelf}
        onClose={this.onClose}
        onUpdate={this.onUpdate}
        experience={this.state}
        storeExperience={(data) => this.setState(data)}
        hasInvalidDynamicFields={(hasInvalidDynamicFields) => this.setState({ hasInvalidDynamicFields })}
        storeDynamicExperience={(data) => this.setState((previous) => ({ dynamic: { ...previous.dynamic, ...data } }))}
      />
    ) : (
      <Experiences
        onboarding={this.props.onboarding}
        skipOnboarding={this.props.skipOnboarding}
        profile={this.props.profile}
        isSelf={this.props.isSelf}
        onClose={this.onClose}
        onUpdate={this.onUpdate}
        experience={this.state}
        hasInvalidDynamicFields={this.state.hasInvalidDynamicFields}
        storeExperience={(data) => this.setState(data)}
      />
    )

  renderEditMenu = () => {
    if (window.innerWidth <= 575) {
      return (
        <div className='game-experience-content zIndex'>
          {this.renderEditMenuContent()}
          {this.renderOptionsMenu(true)}
        </div>
      )
    }
    return this.renderEditMenuContent()
  }

  render() {
    if (!this.state.loaded) return null
    return (
      <div id='profile-edit-game-experience'>
        <div className='container'>
          {this.renderOptionsMenu(false)}
          {this.renderEditMenu()}
        </div>
      </div>
    )
  }
}
