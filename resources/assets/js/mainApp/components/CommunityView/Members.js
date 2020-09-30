import React from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import SweetAlert from '../common/MyGSweetAlert'
import Manage from './Manage'

export default class Members extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalStatus: true,
      counter: 1,
      group_members: [],
      isActive: 'members',
      permission_level: '',
    }
  }

  async componentDidMount() {
    const { group_id = '', activeTab } = this.props
    const { counter = '' } = this.state
    const group_members = await axios.post('/api/usergroup/member_lists/', {
      group_id,
      counter,
    })
    if (group_members.data && group_members.data.all_group_members.length > 0) {
      this.setState({ group_members: group_members.data.all_group_members })
    }
    this.setState({ isActive: activeTab })
  }
  addDefaultSrc = (ev) => {
    ev.target.src = 'https://mygame-media.s3.amazonaws.com/default_user/universe.jpg'
  }
  addProfileDefaultSrc = (ev) => {
    ev.target.src = 'https://mygame-media.s3.amazonaws.com/default_user/new-user-profile-picture.png'
  }

  handleSettingTab = (isActive) => {
    this.setState({ isActive })
  }

  renderGroupMember = () => {
    const { group_members } = this.state

    return (
      <React.Fragment>
        {group_members.length > 0 &&
          group_members.map((member) => {
            return (
              <div className='GroupMember__card'>
                <div className='GroupMember__image'>
                  <img src={member.profile_bg} onError={this.addDefaultSrc} />
                  <div className='GroupMember__profile'>
                    <Link to={`/profile/${member.alias}`}>
                      <img src={member.profile_img} onError={this.addProfileDefaultSrc} />
                    </Link>
                    <div className='GroupMember_role'>
                      <img src='https://mygame-media.s3.amazonaws.com/platform_images/Communities/btn_Moderator_clear.svg' />
                    </div>
                  </div>
                </div>
                <div className='GroupMember__alias'>
                  <Link to={`/profile/${member.alias}`}>{member.alias}</Link>
                </div>
                <div className='GroupMember__level'>
                  <span>level</span>
                  <span className='level__value'>{member.level}</span>
                </div>
                <div className='GroupMember__action'>
                  <Link to={`/profile/${member.alias}`}>
                    <button type='button View'>View</button>
                  </Link>
                  <button type='button Expel'>Expel</button>
                </div>
              </div>
            )
          })}
      </React.Fragment>
    )
  }

  renderSettingComponent = () => {
    return <Manage {...this.props} group_id={this.props.group_id} />
  }

  render() {
    const { modalStatus, isActive } = this.state
    const { current_user_permission } = this.props
    return (
      <div className={`modal-container View__Member__modal ${modalStatus ? 'modal--show' : ''}`}>
        <div className='modal-wrap'>
          <div className='modal__header'>
            <div className='tabs___header'>
              {[0, 1, 2].includes(current_user_permission) && (
                <span className={`setting__tab ${isActive == 'setting' ? 'active' : ''}`} onClick={(e) => this.handleSettingTab('setting')}>
                  Setting
                </span>
              )}
              <span className={`setting__tab ${isActive == 'members' ? 'active' : ''}`} onClick={(e) => this.handleSettingTab('members')}>
                Members
              </span>
            </div>
            <div className='modal__close' onClick={(e) => this.props.handleModalStatus()}>
              <img src='https://mygame-media.s3.amazonaws.com/platform_images/Dashboard/X_icon.svg' />
            </div>
          </div>
          <div className='modal__body'>{isActive == 'setting' ? this.renderSettingComponent() : this.renderGroupMember()}</div>
        </div>

        <div className='modal-overlay' onClick={(e) => this.props.handleModalStatus()}></div>
      </div>
    )
  }
}
