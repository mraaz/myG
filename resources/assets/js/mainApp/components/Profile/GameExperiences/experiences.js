import React from 'react'
import { getAssetUrl } from '../../../../common/assets'
import { ignoreFunctions } from '../../../../common/render'
import Experience from './experience'
import notifyToast from '../../../../common/toast'

export default class Experiences extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.props.state)
  }

  componentDidMount() {
    if (!this.props.experience.background.length) this.onAddExperience()
  }

  onSave = (canSave) => {
    if (canSave) return this.props.onUpdate()
    notifyToast('Sorry mate! Required fields not filled in.')
  }


  onAddExperience = () => {
    const background = [...this.props.experience.background]
    background.push({ id: `temporary-${Date.now()}`, team: null, role: null, experience: null, skills: [] })
    this.props.storeExperience({ background })
  }

  onRemoveExperience = (id) => {
    const background = [...this.props.experience.background].filter((experience) => experience.id !== id)
    this.props.storeExperience({ background })
  }

  storeExperience = (id, data) => {
    const background = [...this.props.experience.background].filter((experience) => experience.id !== id)
    const experience = this.props.experience.background.find((experience) => experience.id === id)
    background.push({ ...experience, ...data })
    this.props.storeExperience({ background })
  }

  renderExperiences = () => {
    return this.props.experience.background
      .sort((e1, e2) => `${e1.id}`.localeCompare(`${e2.id}`))
      .map((experience) => (
        <Experience
          experience={experience}
          storeExperience={this.storeExperience}
          onRemoveExperience={this.onRemoveExperience}
          isSelf={this.props.isSelf}
        />
      ))
  }

  renderAddExperienceButton = () => {
    if (!this.props.isSelf) return null
    return (
      <div
        className='add-experience-icon-button clickable'
        style={{ backgroundImage: `url(${getAssetUrl('ic_profile_add')})` }}
        onClick={this.onAddExperience}
      />
    )
  }

  renderSave = () => {
    if (!this.props.isSelf) return null
    const { game, level, experience } = this.props.experience
    const canSave = !!game && !!level && !!experience & !this.props.hasInvalidDynamicFields;
    const buttonState = canSave ? '' : 'disabled'
    return (
      <div className='save-container'>
        <div className={`save-button clickable ${buttonState}`} onClick={() => this.onSave(canSave)}>
          Save
        </div>
      </div>
    )
  }

  renderClose = () => {
    return (
      <div
        className='close-button clickable'
        style={{ backgroundImage: `url(${getAssetUrl('ic_profile_close')})` }}
        onClick={this.props.onClose}
      />
    )
  }

  render() {
    return (
      <React.Fragment>
        <div id='profile-game-background' className='content'>
          {this.renderExperiences()}
          {this.renderAddExperienceButton()}
          {this.renderSave()}
        </div>
        {this.renderClose()}
      </React.Fragment>
    )
  }
}
