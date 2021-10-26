import React, { Fragment } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import { Toast_style, Convert_to_comma_delimited_value } from '../Utility_Function'
import { MyGTextarea, MyGAsyncSelect } from '../common'

import { parsePlayersToSelectData } from '../../utils/InvitePlayersUtils'

const MAX_INVITEES = 8

export default class Manage extends React.Component {
  constructor() {
    super()
    this.state = {
      communityName: '',
      isunique: false,
      saveButtonDisabled: true,
      privacy: 1,
      approval: 'true',
      description: '',
      coHosts: null,
      stats_header: ''
    }
  }

  componentDidMount() {
    const { routeProps = {}, community_Membership_Approval, community_type, community_grp_description, stats_header } = this.props
    const { match } = this.props.routeProps

    this.setState({
      communityName: match.params.name,
      privacy: community_type,
      approval: community_Membership_Approval == 1 ? 'true' : 'false',
      description: community_grp_description,
      stats_header: stats_header
    })
  }

  onPlayersSuggestionFetch = async (value) => {
    try {
      const {
        data: { playerSearchResults }
      } = await axios.post(`/api/user/playerSearchResults`, {
        alias: value
      })
      const parsedData = parsePlayersToSelectData(playerSearchResults)
      return parsedData
    } catch (error) {
      // error player suggestion fetch
    }
  }

  onPlayersSuggestionFetch2 = async (value) => {
    return []
  }

  updateAdvancedSettings = (e) => {
    const description = e.target.value

    this.setState({ description }, () => {
      this.props.onSettingsChange({ description })
    })
  }

  updateAdvanced_coHosts = (coHosts) => {
    this.setState({ coHosts })
  }

  handleCommunityNameChange = (e) => {
    const communityName = e.target.value
    this.setState({ communityName }, () => {
      this.props.onSettingsChange({ communityName })
    })
  }

  handleCommunityClanTagChange = (e) => {
    const stats_header = e.target.value
    this.setState({ stats_header }, () => {
      this.props.onSettingsChange({ stats_header })
    })
  }

  handleCommunityNameSave = async () => {
    const { communityName } = this.state
    if (communityName.trim() == this.props.routeProps.match.params.name.trim()) {
      return
    }
    if (communityName && communityName.length > 3) {
      const change_group = axios.post('/api/groups/update_name', {
        group_id: this.props.group_id,
        name: communityName.trim()
      })
      if (change_group) {
        toast.success(<Toast_style text={'Nice! Community name has successfully saved.'} />)
        this.props.routeProps.match.params.name = communityName
        this.props.routeProps.history.push(`/community/${communityName}`)
      }
    } else {
      toast.error(<Toast_style text={'Opps, minimum four characters required.'} />)
    }
  }

  handleInviteFriends = () => {
    if (this.state.coHosts != undefined && this.state.coHosts != null && this.state.coHosts != '') {
      const co_hosts = Convert_to_comma_delimited_value(this.state.coHosts)

      axios.post('/api/groups/groupInvites', {
        group_id: this.props.group_id,
        invitees: co_hosts
      })
      toast.success(<Toast_style text={'Now been sent!! Bon voyage invites have.'} />)
      this.setState({ coHosts: null })
    }
  }

  handleNameblur = async () => {
    const { communityName } = this.state
    if (communityName.trim() == this.props.routeProps.match.params.name.trim()) {
      return
    }
    if (communityName && communityName.trim().length < 4) {
      return
    }
    const getgroup_name = await axios.get(`/api/groups/groupName/${communityName.trim()}`)

    if (getgroup_name.data) {
      toast.error(<Toast_style text={'Hmmmm, be unique community name must'} />)
      this.setState({ isunique: true })
    } else {
      this.setState({ isunique: false })
    }
  }

  handlePrivacyChange = (e, privacy) => {
    this.setState({ privacy }, () => {
      this.props.onSettingsChange({ privacy })
    })
  }

  handlePermissionsChange = (e, permissions) => {
    this.setState({ permissions }, () => {
      this.props.onSettingsChange({ permissions })
    })
  }

  handleApprovalChange = (e, approval) => {
    this.setState({ approval }, () => {
      this.props.onSettingsChange({ approval })
    })
  }

  render() {
    const { communityName, isunique, stats_header } = this.state
    const { current_user_permission, community_game_names_id } = this.props
    const isthisClash = community_game_names_id == 1014 ? true : false

    console.log('stats_header ', stats_header)
    return (
      <div className='setting__container'>
        {[0, 1].includes(current_user_permission) && (
          <Fragment>
              <div className='communityName__section row'>
                  <div className='community___label col-sm-4'>Change Community Name</div>
                  <div className='community___input col-sm-6'>
                    <input
                  type='text'
                  autocomplete='off'
                  value={communityName}
                  onBlur={this.handleNameblur}
                  onChange={this.handleCommunityNameChange}
                  placeholder='Change Community Name'
                />
              </div>
              <button disabled={isunique} className='community___button col-sm-2' onClick={this.handleCommunityNameSave}>
                Save
              </button>
          </div>
          <div className='communityName__section clanTag row'>
            {isthisClash && (
              <Fragment>
                <div className='community___label col-sm-4'>Clan Tag Name</div>
                <div className='community___input col-sm-6'>
                  <input
                    type='text'
                    autocomplete='off'
                    value={stats_header}
                    onChange={this.handleCommunityClanTagChange}
                    placeholder='Change Clan Tag Name'
                  />
                </div>
              </Fragment>
            )}
          </div>
          </Fragment>
        )}
        <div className='group__privacy row'>
          <div className='label col-sm-4 col-xs-4'>Privacy</div>
          <div className='options col-sm-8 col-xs-8'>
            <div>
              <label className='container'>
                Public
                <input
                  type='checkbox'
                  name='public'
                  checked={this.state.privacy == '1'}
                  onChange={(e) => this.handlePrivacyChange(e, '1')}
                  value={'1'}
                />
                <span className='checkmark'></span>
              </label>
            </div>
            <div>
              <label className='container'>
                Closed
                <input
                  type='checkbox'
                  name='closed'
                  checked={this.state.privacy == '2'}
                  onChange={(e) => this.handlePrivacyChange(e, '2')}
                  value={'2'}
                />
                <span className='checkmark'></span>
              </label>
            </div>
            {/* <div>
              <label className='container'>
                Secret
                <input
                  type='checkbox'
                  name='secret'
                  checked={this.state.privacy == 'secret'}
                  onChange={(e) => this.handlePrivacyChange(e, 'secret')}
                  value={'secret'}
                />
                <span className='checkmark'></span>
              </label>
            </div> */}
          </div>
        </div>
        {/* <div className='group__privacy row'>
          <div className='label col-sm-4'>Post Permissions</div>
          <div className='options col-sm-8'>
            <div>
              <label className='container'>
                Everyone
                <input
                  type='checkbox'
                  name='Everyone'
                  checked={this.state.permissions == 'everyone'}
                  onChange={(e) => this.handlePermissionsChange(e, 'everyone')}
                  value={'everyone'}
                />
                <span className='checkmark'></span>
              </label>
            </div>
            <div>
              <label className='container'>
                Admins
                <input
                  type='checkbox'
                  name='Admins'
                  checked={this.state.permissions == 'admins'}
                  onChange={(e) => this.handlePermissionsChange(e, 'admins')}
                  value={'closed'}
                />
                <span className='checkmark'></span>
              </label>
            </div>
          </div>
        </div> */}
        <div className='group__privacy row'>
          <div className='label col-sm-4'>Membership approvals done by...</div>
          <div className='options col-sm-8'>
            <div>
              <label className='container'>
                Everyone
                <input
                  type='checkbox'
                  name='Everyone'
                  checked={this.state.approval == 'true'}
                  onChange={(e) => this.handleApprovalChange(e, 'true')}
                  value={'true'}
                />
                <span className='checkmark'></span>
              </label>
            </div>
            {/* <div>
              <label className='container'>
                Members
                <input
                  type='checkbox'
                  name='members'
                  checked={this.state.approval == 'members'}
                  onChange={(e) => this.handleApprovalChange(e, 'members')}
                  value={'members'}
                />
                <span className='checkmark'></span>
              </label>
            </div> */}
            <div>
              <label className='container'>
                Admins
                <input
                  type='checkbox'
                  name='Admins'
                  checked={this.state.approval == 'false'}
                  onChange={(e) => this.handleApprovalChange(e, 'false')}
                  value={'false'}
                />
                <span className='checkmark'></span>
              </label>
            </div>
          </div>
        </div>
        <div className='group__privacy row'>
          <div className='label col-sm-4'>Invite friends</div>
          <div className='options col-sm-8 game-title-select'>
            <MyGAsyncSelect
              isClearable
              isMulti
              isValidNewOption={() => {
                return
              }}
              loadOptions={
                this.state.coHosts && this.state.coHosts.length >= MAX_INVITEES
                  ? this.onPlayersSuggestionFetch2
                  : this.onPlayersSuggestionFetch
              }
              onChange={(e) => {
                this.updateAdvanced_coHosts(e)
              }}
              value={this.state.coHosts}
              noOptionsMessage={() => {
                return this.state.coHosts && this.state.coHosts.length >= MAX_INVITEES
                  ? 'Bam! Max number of Invitees reached'
                  : 'Yo! Either nothing to display or you need to type in something'
              }}
              placeholder='Enter your friend’s name to invite them to this community'
            />
          </div>
          <button disabled={false} className='button-invite' onClick={this.handleInviteFriends}>
            Invite
          </button>
        </div>
        <div className='group__privacy row'>
          <div className='label col-sm-4'>Community Description</div>
          <div className='options col-sm-8'>
            <div className='text-box'>
              <div className='description-text-area'>
                <MyGTextarea
                  onChange={(e) => {
                    this.updateAdvancedSettings(e)
                  }}
                  value={this.state.description}
                  placeholder='Description for your community'
                  maxLength={250}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
