import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SweetAlert from '../common/MyGSweetAlert'
import Manage from './Manage'
import { toast } from 'react-toastify'
import { Toast_style, Convert_to_comma_delimited_value } from '../Utility_Function'
import { MyGButton } from '../common'
import { logToElasticsearch } from '../../../integration/http/logger'

const IconMap = {
  0: 'https://myG.gg/platform_icons/btn_Moderator_on.svg',
  1: 'https://myG.gg/platform_icons/btn_Moderator_on.svg',
  2: 'https://myG.gg/platform_icons/ic_chat_group_moderator.svg',
  3: 'https://myG.gg/platform_icons/btn_Moderator_off.svg'
}
const PermissionMap = {
  0: 'Owner',
  1: 'Admin',
  2: 'Moderator',
  3: 'Users'
}

const MAX_GAME_TAGS = 4

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
      moreplease: true,
      searchMemberValue: '',
      fetching: false
    }
    this.scrollRef = React.createRef()
  }

  componentDidMount() {
    const { activeTab } = this.props

    this.getInitialData()
    this.setState({ isActive: activeTab })
  }

  getInitialData = () => {
    const { group_id = '', activeTab } = this.props
    const { counter = '', group_members = [] } = this.state
    this.setState({ fetching: true }, async () => {
      const group_member = await axios.post('/api/usergroup/member_lists/', {
        group_id,
        counter
      })
      if (group_member.data && group_member.data.all_group_members.length == 0) {
        this.setState({ moreplease: false, fetching: false })
      }
      if (group_member.data && group_member.data.all_group_members.length > 0) {
        this.setState({ group_members: [...group_members, ...group_member.data.all_group_members], fetching: false })
      }
    })
  }
  addDefaultSrc = (ev) => {
    ev.target.src = 'https://myG.gg/default_user/universe.jpg'
  }
  addProfileDefaultSrc = (ev) => {
    ev.target.src = 'https://myG.gg/default_user/new-user-profile-picture.png'
  }

  handleSettingTab = (isActive) => {
    this.setState({ isActive })
  }

  onSettingsChange = (data) => {
    this.setState({ saveButtonDisabled: false, ...data })
  }

  handleSave = (e) => {
    let { approval, privacy, description, tags, coHosts, stats_header } = this.state

    if (coHosts) {
      coHosts = Convert_to_comma_delimited_value(coHosts)
    }

    if (tags != undefined && tags.length != 0 && tags != null) {
      for (var i = 0; i < MAX_GAME_TAGS && i < tags.length; i++) {
        if (/['/.%#$,;`\\]/.test(tags[i].value)) {
          toast.success(<Toast_style text={'Sorry mate! Community tags can not have invalid fields'} />)
          return
        }

        delete tags[i].label
      }

      tags = JSON.stringify(tags)
    }

    axios.post('/api/groups/update_settings', {
      group_id: this.props.group_id,
      privacy: privacy,
      mApprovals: approval,
      description: description,
      tags: tags,
      stats_header: stats_header
    })

    if (this.props.community_Name == '') {
      toast.success(<Toast_style text={'Nice! Setting has been successfully saved.'} />)
      this.props.handleModalStatus(true)
    } else {
      //Too many changes to the settings, can be name, tags, etc
      window.location.href = `/community/${this.props.community_Name}`
    }

    // this.props.routeProps.match.params.name = communityName
    // this.props.routeProps.history.push(`/community/${decodeURIComponent(communityName)}`)
  }

  handleDelete = async (text) => {
    this.setState({
      alert: null,
      dropdown: false
    })
    if (text == 'true') {
      try {
        const delete_group = await axios.post('/api/groups/delete', {
          group_id: this.props.group_id
        })
        if (delete_group) {
          toast.error(<Toast_style text={'Hmmmm, Group has been deleted successfully.'} />)
        } else {
          toast.error(<Toast_style text={'Hmmmm, Something went wrong. Please try again.'} />)
        }
      } catch (error) {
        logToElasticsearch('error', 'CommunityView/Members.js', 'Failed handleDelete:' + ' ' + error)
      }

      this.props.routeProps.history.push('/?at=communities')
    }
  }

  kick_non_clashRoyale_players = async (text) => {
    this.setState({
      showKickAlert: ''
    })
    if (text == 'true') {
      try {
        const data = await axios.get(`/api/clashroyale/kick_non_clashRoyale_players/${this.props.group_id}`)
        console.log(data, '<<<Child chose')
      } catch (error) {
        logToElasticsearch('error', 'CommunityView/Members.js', 'Failed clashRoyale_kick:' + ' ' + error)
      }
    }
  }

  showAlert_for_kick() {
    const getAlert = () => (
      <SweetAlert
        danger
        showCancel
        title='Are you sure you wish to remove ALL players from this community who are not in the Clash Royale CLAN?'
        confirmBtnText='Make it so!'
        focusCancelBtn={true}
        focusConfirmBtn={false}
        showCloseButton={false}
        btnSize='lg'
        style={{
          display: 'flex',
          whiteSpace: 'pre',
          width: '41%'
        }}
        onConfirm={() => this.kick_non_clashRoyale_players('true')}
        onCancel={() => this.kick_non_clashRoyale_players('false')}
      >
        Will not remove admins, moderators or locked myG players
      </SweetAlert>
    )
    this.setState({
      showKickAlert: getAlert()
    })
  }

  showAlert() {
    const getAlert = () => (
      <SweetAlert
        danger
        showCancel
        title='Are you sure you wish to delete this group?'
        confirmBtnText='Make it so!'
        focusCancelBtn={true}
        focusConfirmBtn={false}
        showCloseButton={false}
        btnSize='lg'
        style={{
          display: 'flex',
          whiteSpace: 'pre',
          width: '41%'
        }}
        onConfirm={() => this.handleDelete('true')}
        onCancel={() => this.handleDelete('false')}
      >
        You will not be able to recover this entry!
      </SweetAlert>
    )
    this.setState({
      alert: getAlert()
    })
  }

  showExpelAlert(member) {
    const getAlert = () => (
      <SweetAlert
        danger
        showCancel
        title='Are you sure you wish to delete this member from this group?'
        confirmBtnText='Make it so!'
        focusCancelBtn={true}
        focusConfirmBtn={false}
        showCloseButton={false}
        btnSize='lg'
        style={{
          display: 'flex',
          whiteSpace: 'pre',
          width: '41%'
        }}
        onConfirm={() => this.handleExpelClick('true', member)}
        onCancel={() => this.handleExpelClick('false', member)}
      >
        You will not be able to recover this entry!
      </SweetAlert>
    )
    this.setState({
      userExpelAlert: getAlert()
    })
  }

  handleExpelClick = async (text, member) => {
    if (text == 'false') {
      this.setState({
        userExpelAlert: ''
      })
    } else {
      const { current_user_permission } = this.props
      if (member.permission_level > current_user_permission) {
        const data = await axios.delete(`/api/usergroup/delete_member/${member.group_id}/${member.id}`)
        if (data && data.data) {
          const { group_members } = this.state
          const filterMembers = group_members.filter((members) => member.user_id != members.user_id)
          this.setState({ group_members: filterMembers, userExpelAlert: '' }, () => {
            toast.success(<Toast_style text={`Yeah! User has been Expeled`} />)
          })
        } else {
          toast.error(<Toast_style text={`Nope, nope and nope, that did not work.`} />)
          this.setState({
            userExpelAlert: ''
          })
        }
      } else {
        toast.error(<Toast_style text={`Nope, nope and nope, that did not work.`} />)
      }
    }
  }

  handleGroupMemberRole = async (member) => {
    try {
      const { user_id = '' } = member
      const { current_user_permission, group_id } = this.props
      const { group_members } = this.state

      if (current_user_permission <= member.permission_level) {
        const promoteCall = await axios.get(`/api/usergroup/promote_member_cycle/${group_id}/${member.id}`)

        if (promoteCall && promoteCall.data != false) {
          const group_membersMap = group_members.map((members) => {
            const { permission_level } = members
            if (members.user_id == user_id) {
              toast.success(<Toast_style text={`All Done! Permission is now: ${PermissionMap[promoteCall.data]}`} />)
              return {
                ...members,
                permission_level: promoteCall.data
              }
            } else {
              return {
                ...members
              }
            }
          })

          this.setState({ group_members: group_membersMap })
        } else {
          toast.error(<Toast_style text={'Nope, nope and nope, unable to demote/promote'} />)
        }
      } else {
        toast.error(<Toast_style text={'Nope, nope and nope, unable to demote/promote'} />)
      }
    } catch (error) {
      logToElasticsearch('error', 'CommunityView/Members.js', 'Failed handleGroupMemberRole:' + ' ' + error)
    }
  }

  handleScroll = (event) => {
    if (this.state.searchMemberValue == '') {
      const _event = event.currentTarget,
        _current = this.scrollRef.current
      if (_event.scrollTop + (3 / 2) * _current.offsetHeight > _event.scrollHeight && this.state.moreplease && !this.state.fetching) {
        const { counter = 1 } = this.state
        this.setState({ counter: counter + 1 }, () => {
          this.getInitialData()
        })
      }
    }
  }

  renderGroupMember = () => {
    const { group_members } = this.state
    const { current_user_permission, initialData = {} } = this.props
    const { userInfo = {} } = initialData

    return (
      <div className='GroupMember_list' onScroll={this.handleScroll} ref={this.scrollRef}>
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
                    <button type='button' className='View'>
                      View
                    </button>
                  </Link>
                  {[0, 1].includes(current_user_permission) && member.permission_level != 0 && member.user_id != userInfo.id && (
                    <button type='button' className='Expel' onClick={(e) => this.showExpelAlert(member)}>
                      {' '}
                      Expel
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        {group_members.length == 0 && <div className='noGroupFound'>No records found</div>}
      </div>
    )
  }

  renderSettingComponent = () => {
    return (
      <Manage
        {...this.props}
        onSettingsChange={this.onSettingsChange}
        group_id={this.props.group_id}
        community_game_names_id={this.props.community_game_names_id}
      />
    )
  }

  handleMemberSearch = async (e) => {
    const { group_id = '' } = this.props
    const searchMemberValue = e.target.value
    const self = this
    this.setState({ searchMemberValue })

    if (searchMemberValue == '') {
      this.setState({ counter: 1, group_members: [] }, () => {
        this.getInitialData()
      })
      return
    }

    const getSearchInfo = async function () {
      try {
        const group_members = await axios.post('/api/usergroup/usergroupSearchResults/', {
          group_id,
          alias: self.state.searchMemberValue
        })
        if (group_members.data && group_members.data.all_group_members.length > 0) {
          self.setState({ group_members: group_members.data.all_group_members })
        } else {
          self.setState({ group_members: [] })
        }
      } catch (error) {
        logToElasticsearch('error', 'CommunityView/Members.js', 'Failed handleMemberSearch:' + ' ' + error)
      }
    }

    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      getSearchInfo()
    }, 30)
  }

  render() {
    console.log(this.props)
    const { modalStatus, isActive, saveButtonDisabled, searchMemberValue = '' } = this.state
    const { current_user_permission, community_game_names_id } = this.props
    const isthisClash = community_game_names_id == 1014 ? true : false

    return (
      <div className={`modal-container View__Member__modal ${modalStatus ? 'modal--show' : ''}`}>
        {this.state.alert}
        {this.state.userExpelAlert}
        {this.state.showKickAlert}
        <div className='modal-wrap'>
          <div className='modal__header'>
            <div className='tabs___header'>
              {[0, 1, 2].includes(current_user_permission) && (
                <span className={`setting__tab ${isActive == 'setting' ? 'active' : ''}`} onClick={(e) => this.handleSettingTab('setting')}>
                  Settings
                </span>
              )}
              <span className={`setting__tab ${isActive == 'members' ? 'active' : ''}`} onClick={(e) => this.handleSettingTab('members')}>
                Members
              </span>
            </div>
            <div className='modal__close' onClick={(e) => this.props.handleModalStatus()}>
              <img src='https://myG.gg/platform_images/Dashboard/X_icon.svg' />
            </div>
          </div>
          {isActive != 'setting' && (
            <div className='manage__searchBar'>
              <input
                type='text'
                autoComplete='off'
                value={searchMemberValue}
                onChange={(e) => this.handleMemberSearch(e)}
                placeholder='Search members here'
              />
            </div>
          )}
          <div className='modal__body'>{isActive == 'setting' ? this.renderSettingComponent() : this.renderGroupMember()}</div>
          {isActive != 'setting' && (
            <div className='modal__footer'>
              <div className='legends'>
                <div className='permission_label'>
                  <img src={IconMap[1]} />
                  <span>Admin</span>
                </div>
                <div className='permission_label'>
                  <img src={IconMap[2]} />
                  <span>Moderator</span>
                </div>
                <div className='permission_label'>
                  <img src={IconMap[3]} />
                  <span>Member</span>
                </div>
              </div>
            </div>
          )}
          {isActive == 'setting' && (
            <div className='modal__footer'>
              <MyGButton
                customStyles={{ color: '#fff', border: '2px solid #fff', background: '#804545' }}
                onClick={() => this.showAlert()}
                text='Delete'
              />
              <button type='button' disabled={saveButtonDisabled} onClick={() => this.handleSave(true)}>
                Save
              </button>
              {isthisClash && (
                <MyGButton
                  customStyles={{ color: '#000', background: '#e5c746' }}
                  onClick={() => this.showAlert_for_kick()}
                  text='Remove non CR members'
                />
              )}
            </div>
          )}
        </div>

        <div className='modal-overlay' onClick={(e) => this.props.handleModalStatus()}></div>
      </div>
    )
  }
}
