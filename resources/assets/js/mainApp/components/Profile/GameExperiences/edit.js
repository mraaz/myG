import React from 'react'
import get from 'lodash.get'
import { getAssetUrl } from '../../../../common/assets'
import { ignoreFunctions } from '../../../../common/render'
import MainInfo from './main-info'
import Experience from './experience'

export default class EditGameExperience extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    selectedTab: 'main',
    experienceTabEnabled: false,
  }

  onUpdate = (updates) => {
    this.props.updateGame(this.props.alias, updates);
  }

  renderLeftMenu = () => {
    const baseStyle = 'option'
    const disabledStyle = this.state.experienceTabEnabled ? baseStyle + ' clickable' : baseStyle + ' disabled'
    const mainStyle = this.state.selectedTab === 'main' ? baseStyle + ' clickable selected' : baseStyle + ' clickable'
    const experienceStyle = this.state.selectedTab === 'experience' ? baseStyle + ' clickable selected' : disabledStyle
    return (
      <div className='left-menu'>
        <div className={mainStyle} onClick={() => this.setState({ selectedTab: 'main' })}>
          <div className='icon' style={{ backgroundImage: `url(${getAssetUrl('ic_profile_main_info')})` }} />
          <span>Main Info</span>
        </div>
        <div className={experienceStyle} onClick={() => this.state.experienceTabEnabled && this.setState({ selectedTab: 'experience' })}>
          <div className='icon' style={{ backgroundImage: `url(${getAssetUrl('ic_profile_experience')})` }} />
          <span>Experience</span>
        </div>
      </div>
    )
  }

  renderEditMenu = () => {
    if (this.state.selectedTab === 'main') {
      return <MainInfo gameExperience={this.props.gameExperience} profile={this.props.profile} onClose={this.props.onClose} onUpdate={this.onUpdate} />
    }
    return <Experience gameExperience={this.props.gameExperience} profile={this.props.profile} onClose={this.props.onClose} onUpdate={this.onUpdate} />
  }

  render() {
    return (
      <div id='profile-edit-game-experience'>
        <div className='container'>
          {this.renderLeftMenu()}
          {this.renderEditMenu()}
        </div>
      </div>
    )
  }
}
