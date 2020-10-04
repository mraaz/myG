import React from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import SweetAlert from '../common/MyGSweetAlert'
import Manage from './Manage'
import { toast } from 'react-toastify'
import { Toast_style } from '../Utility_Function'
import { PageHeader, MyGButton, MyGModal, MyGInput } from '../common'

const IconMap = {
  0: 'https://mygame-media.s3.amazonaws.com/platform_images/Communities/btn_Moderator_gold.svg',
  1: 'https://mygame-media.s3.amazonaws.com/platform_images/Communities/btn_Moderator_gold.svg',
  2: ' https://mygame-media.s3.amazonaws.com/platform_images/Communities/btn_Moderator_silver.svg',
  3: 'https://mygame-media.s3.amazonaws.com/platform_images/Communities/btn_Moderator_clear.svg',
}
const PermissionMap = {
  0: 'Owner',
  1: 'Admin',
  2: 'Moderator',
  3: 'Users',
}

export default class Members extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalStatus: true,
      counter: 1,
      group_members: [],
      isActive: 'members',
      permission_level: '',
      saveButtonDisabled: true,
    }
  }

  componentDidMount() {
    const { activeTab } = this.props
    this.getInitialData()
    this.setState({ isActive: activeTab })
  }

  getInitialData = async () => {
    const { group_id = '', activeTab } = this.props
    const { counter = '' } = this.state
    const group_members = await axios.post('/api/usergroup/member_lists/', {
      group_id,
      counter,
    })
    if (group_members.data && group_members.data.all_group_members.length > 0) {
      this.setState({ group_members: group_members.data.all_group_members })
    }
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

  onSettingsChange = (data) => {
    this.setState({ saveButtonDisabled: false, ...data })
  }

  handleSave = async (e) => {
    const { communityName, approval, privacy } = this.state
    const sendInvite = await axios.post('/api/groups/update_settings', {
      group_id: this.props.groups_id,
      group_name: communityName,
      privacy: privacy,
      mApprovals: approval,
    })
  }
  handleDelete = async (text) => {
    this.setState({
      alert: null,
      dropdown: false,
    })
    if (text == 'true') {
      const delete_group = axios.post('/api/groups/delete', {
        group_id: this.props.groups_id,
      })
      if (delete_group) {
        toast.error(<Toast_style text={'Hmmmm, Group has been deleted successfully.'} />)
      } else {
        toast.error(<Toast_style text={'Hmmmm, Something went wrong. Please try again.'} />)
      }
    }
  }

  showAlert() {
    const getAlert = () => (
      <SweetAlert
        danger
        showCancel
        title='Are you sure you wish to delete this comment?'
        confirmBtnText='Make it so!'
        focusCancelBtn={true}
        focusConfirmBtn={false}
        showCloseButton={false}
        btnSize='lg'
        style={{
          display: 'flex',
          whiteSpace: 'pre',
          width: '41%',
        }}
        onConfirm={() => this.handleDelete('true')}
        onCancel={() => this.handleDelete('false')}>
        You will not be able to recover this entry!
      </SweetAlert>
    )
    this.setState({
      alert: getAlert(),
    })
  }

  handleExpelClick = (member) => {}

  handleGroupMemberRole = async (member) => {
    try {
      const { user_id = '' } = member
      const { current_user_permission, group_id } = this.props
      const { group_members } = this.state

      if (current_user_permission < member.permission_level) {
        const promoteCall = await axios.get(`/api/usergroup/promote_member_cycle/:${group_id}/:${user_id}`)
        if (promoteCall) {
          const group_membersMap = group_members.map((members) => {
            const { permission_level } = members
            if (members.user_id == user_id) {
              toast.success(<Toast_style text={`All Done! Permission is now: ${PermissionMap[permission_level]}`} />)
              return {
                ...members,
                permission_level: permission_level + 1,
              }
            } else {
              return {
                ...members,
              }
            }
          })

          this.setState({ group_members: group_membersMap })
        } else {
          toast.error(<Toast_style text={'Whoops unable to demote/promote'} />)
        }
      } else {
        toast.error(<Toast_style text={'Whoops unable to demote/promote'} />)
      }
    } catch (error) {
      console.log('error   ', error)
    }
  }

  renderGroupMember = () => {
    const { group_members } = this.state

    return (
      <React.Fragment>
        {group_members.length > 0 &&
          group_members.map((member) => {
            return (
              <div className='GroupMember__card' key={member.id}>
                <div className='GroupMember__image'>
                  <img src={member.profile_bg} onError={this.addDefaultSrc} />
                  <div className='GroupMember__profile'>
                    <Link to={`/profile/${member.alias}`}>
                      <img src={member.profile_img} onError={this.addProfileDefaultSrc} />
                    </Link>
                    <div className='GroupMember_role' onClick={(e) => this.handleGroupMemberRole(member)}>
                      <img src={IconMap[member.permission_level]} />
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
                  <button type='button Expel' onClick={(e) => this.handleExpelClick(member)}>
                    {' '}
                    Expel
                  </button>
                </div>
              </div>
            )
          })}
      </React.Fragment>
    )
  }

  renderSettingComponent = () => {
    return <Manage {...this.props} onSettingsChange={this.onSettingsChange} group_id={this.props.group_id} />
  }

  handleMemberSearch = async (e) => {
    const { group_id = '' } = this.props
    const searchMemberValue = e.target.value
    this.setState({ searchMemberValue }, async () => {
      if (searchMemberValue == '') {
        this.getInitialData()
        return
      }
      const group_members = await axios.post('/api/usergroup/usergroupSearchResults/', {
        group_id,
        alias: this.state.searchMemberValue,
      })
      if (group_members.data && group_members.data.all_group_members.length > 0) {
        this.setState({ group_members: group_members.data.all_group_members })
      } else {
        this.setState({ group_members: [] })
      }
    })
  }

  render() {
    const { modalStatus, isActive, saveButtonDisabled, searchMemberValue = '' } = this.state
    const { current_user_permission } = this.props
    return (
      <div className={`modal-container View__Member__modal ${modalStatus ? 'modal--show' : ''}`}>
        {this.state.alert}
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
          <div className='manage__searchBar'>
            <input type='text' value={searchMemberValue} onChange={(e) => this.handleMemberSearch(e)} placeholder='Search menbers here' />
          </div>
          <div className='modal__body'>{isActive == 'setting' ? this.renderSettingComponent() : this.renderGroupMember()}</div>
          {isActive == 'setting' && (
            <div className='modal__footer'>
              <MyGButton
                customStyles={{ color: '#FFFFFF', border: '2px solid #FFFFFF', background: '#804545' }}
                onClick={() => this.showAlert()}
                text='Delete'
              />
              <button type='button' disabled={saveButtonDisabled} onClick={() => this.handleSave(true)}>
                Save
              </button>
            </div>
          )}
        </div>

        <div className='modal-overlay' onClick={(e) => this.props.handleModalStatus()}></div>
      </div>
    )
  }
}
