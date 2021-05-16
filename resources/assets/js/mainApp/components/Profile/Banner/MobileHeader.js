import React, { Fragment } from 'react'
import Uploader from '../../common/Uploader'
import get from 'lodash.get'
import Dossier from '../Dossier'
import ViewFriends from '../ViewFriends'
import { ignoreFunctions } from '../../../../common/render'
import { openChatByContact } from './../../../../common/chat'
import { showMessengerAlert } from './../../../../common/alert'
import Progress from './../../common/ProgressCircle/progress'
import ProfileInfo from './../Info/MobileInfo'

export default class Header extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return ignoreFunctions(nextProps, nextState, this.props, this.state)
  }

  state = {
    editing: false,
    viewingFriends: false,
    hoveringIcon: false
  }

  onUpload = (source, key) => this.props.uploadProfileImage(this.props.alias, source, key)

  renderIcon = () => {
    if (this.props.profile.isSelf) {
      return (
        <Uploader onUpload={this.onUpload}>
          <div
            className='icon clickable'
            style={{ backgroundImage: `url('${this.props.profile.image}')` }}
            onMouseEnter={() => this.setState({ hoveringIcon: true })}
            onMouseLeave={() => this.setState({ hoveringIcon: false })}
          >
            <img src={this.props.profile.image} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
            {this.state.hoveringIcon && <div className='hover-icon'>Update</div>}
          </div>
        </Uploader>
      )
    }
    return (
      <div
        className='icon'
        style={{
          backgroundImage: `url('${this.props.profile.image}'), url('https://myG.gg/default_user/new-user-profile-picture.png')`
        }}
      >
        <img src={this.props.profile.image} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
      </div>
    )
  }

  renderInfo = () => {
    const firstName = get(this.props, 'profile.firstName') || ''
    const lastName = get(this.props, 'profile.lastName') || ''
    const { isFriend, isSelf, visibilityName } = this.props.profile
    const name = visibilityName === 'secret' || (visibilityName === 'friends' && !isFriend && !isSelf) ? '' : `${firstName} ${lastName}`
    return (
      <div className='info'>
        {this.renderIcon()}
        <div className={`status-${this.props.profile.status}`} />
        <div className={`handle ${this.props.profile.isSelf ? 'self' : ''}`}>
          <span className='alias'>@{this.props.profile.alias}</span>
          <span className='name'>{name}</span>
        </div>
        {this.renderLevel()}
      </div>
    )
  }
  renderLevel = () => {
    const {
      user_level = 0,
      user_experience = 0,
      start_of_level_xp = 0,
      user_xp_negative_balance = 0,
      level_max_points = 0
    } = this.props.userTransactionStates

    const progress = Math.floor(((user_experience - start_of_level_xp) / level_max_points) * 100)
    return (
      <div className='level-container'>
        <section className='level-container-img'>
          <Progress
            className={`circle-wrap`}
            borderColor={`${user_xp_negative_balance == 1 ? '#d70f46' : '#E5C746'}`}
            progress={progress || 0}
            value={user_level}
            subtitle={'Level'}
            reduction={0}
            hideBall
            strokeWidth={8}
            background={'#fff'}
          />
          <div className='ratings'>
            <p className='social-box-text'>Experience Pts.</p>
            <p className='social-box-count'>{user_experience}</p>
          </div>
        </section>
      </div>
    )
  }

  render() {
    return (
      <div className='profile__mobile-header'>
        {this.renderInfo()}
        <ProfileInfo />
      </div>
    )
  }
}
