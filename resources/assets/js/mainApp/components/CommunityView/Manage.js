import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import { Toast_style, Disable_keys, Group_Hash_Tags, Convert_to_comma_delimited_value } from '../Utility_Function'
import { MyGTextarea, MyGAsyncSelect, MyGCreateableSelect } from '../common'

import { parsePlayersToSelectData } from '../../utils/InvitePlayersUtils'

const MAX_GAME_TAGS = 4
const MAX_INVITEES = 8

const createOption = (label, hash_tag_id) => ({
  label,
  value: label,
  hash_tag_id,
})

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
      tags: '',
      options_tags: '',
      coHosts: null,
    }
  }

  componentDidMount() {
    const { routeProps = {}, community_Membership_Approval, community_type, community_grp_description, community_allGrpTags } = this.props
    const { match } = this.props.routeProps

    let tmpArr = []
    for (let i = 0; i < community_allGrpTags.length; i++) {
      tmpArr.push(createOption(community_allGrpTags[i], -1))
    }

    this.setState({
      communityName: match.params.name,
      privacy: community_type,
      approval: community_Membership_Approval == 1 ? 'true' : 'false',
      description: community_grp_description,
      tags: tmpArr,
    })

    this.getOptions_tags()
  }

  onPlayersSuggestionFetch = async (value) => {
    try {
      const {
        data: { playerSearchResults },
      } = await axios.post(`/api/user/playerSearchResults`, {
        alias: value,
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

  //https://github.com/JedWatson/react-select/issues/3988 :RAAZ remove once fixed
  getNewOptionData = (inputValue, optionLabel) => ({
    value: inputValue,
    label: optionLabel,
    __isNew__: true,
    isEqual: () => false,
  })

  handleCreateHashTags = (inputValue) => {
    if (inputValue.length > 88) {
      toast.success(<Toast_style text={'Sorry mate! Tag length is tooo long.'} />)
      return
    }

    if (this.state.tags && this.state.tags.length >= MAX_GAME_TAGS) {
      return
    }

    let { options_tags, tags } = this.state
    if (tags == null) tags = ''

    const newOption = createOption(inputValue, null)
    this.setState({ options_tags: [...options_tags, newOption] })
    this.setState({ tags: [...tags, newOption] })

    this.props.onSettingsChange({ tags: [...tags, newOption] })
  }

  updateAdvancedSettings = (e) => {
    const description = e.target.value

    this.setState({ description }, () => {
      this.props.onSettingsChange({ description })
    })
  }

  updateAdvancedSettings2 = (tags) => {
    this.setState({ tags }, () => {
      this.props.onSettingsChange({ tags })
    })
  }

  updateAdvanced_coHosts = (coHosts) => {
    this.setState({ coHosts })
  }

  getOptions_tags = (inputValue) => {
    const self = this

    const getInitialData = async function(inputValue) {
      try {
        const results = await Group_Hash_Tags(inputValue)
        self.setState({ options_tags: results })
      } catch (error) {
        logToElasticsearch('error', 'Community-View_Manage', 'getOptions_tags:' + ' ' + error)
      }
    }

    getInitialData(inputValue)
  }

  handleCommunityNameChange = (e) => {
    const communityName = e.target.value
    this.setState({ communityName }, () => {
      this.props.onSettingsChange({ communityName })
    })
  }

  handleCommunityNameSave = async () => {
    const { communityName, description } = this.state
    if (communityName.trim() == this.props.routeProps.match.params.name.trim()) {
      return
    }
    if (communityName && communityName.length > 3) {
      const change_group = axios.post('/api/groups/update_name', {
        group_id: this.props.group_id,
        name: communityName.trim(),
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
        invitees: co_hosts,
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
    const { modalStatus, communityName, isunique, saveButtonDisabled } = this.state
    const { current_user_permission } = this.props

    return (
      <div className='setting__container'>
        {[0, 1].includes(current_user_permission) && (
          <div className='communityName__section row'>
            <div className='community___label col-sm-4'>Change Community Name</div>
            <div className='community___input col-sm-6'>
              <input
                type='text'
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
        )}
        <div className='group__privacy row'>
          <div className='label col-sm-4'>Privacy</div>
          <div className='options col-sm-8'>
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
          <div className='label col-sm-4'>Community Tags</div>
          <div className='options col-sm-8'>
            <div>
              <div className='game-title-select'>
                <MyGCreateableSelect
                  isClearable
                  isMulti
                  onCreateOption={this.handleCreateHashTags}
                  onInputChange={this.getOptions_tags}
                  onChange={this.updateAdvancedSettings2}
                  getNewOptionData={this.getNewOptionData}
                  value={this.state.tags}
                  placeholder='Search, Select or create Community Tags'
                  options={this.state.tags && this.state.tags.length >= MAX_GAME_TAGS ? [] : this.state.options_tags}
                  noOptionsMessage={() => {
                    return this.state.options_tags && this.state.options_tags.length >= MAX_GAME_TAGS
                      ? 'You have reached the max options value'
                      : 'Yo! Either nothing to display or you need to type in something'
                  }}
                  onKeyDown={Disable_keys}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='group__privacy row'>
          <div className='label col-sm-4'>Invite friends</div>
          <div className='options col-sm-8'>
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
            <div>
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
