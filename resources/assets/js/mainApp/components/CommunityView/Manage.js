import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Toast_style } from '../Utility_Function'

export default class Members extends React.Component {
  constructor() {
    super()
    this.state = {
      communityName: '',
      isunique: false,
    }
  }

  componentDidMount() {
    const { match } = this.props.routeProps
    this.setState({ communityName: match.params.name })
  }
  handleCommunityNameChange = (e) => {
    const communityName = e.target.value
    this.setState({ communityName })
  }
  handleCommunityNameSave = async () => {
    const { communityName } = this.state
    if (communityName && communityName.length > 3) {
      const change_group = axios.post('/api/groups/update_name', {
        group_id: this.props.group_id,
        name: communityName,
      })
      if (change_group) {
        toast.success(<Toast_style text={'Yeah, community name has successfully saved.'} />)
      }
    } else {
      toast.error(<Toast_style text={'Opps, Minimum 3 char required.'} />)
    }
  }

  handleNameblur = async () => {
    const { communityName } = this.state
    const getgroup_name = await axios.get(`/api/groups/groupName/${communityName.trim()}`)
    if (getgroup_name) {
      toast.error(<Toast_style text={'Hmmmm, be unique community name must'} />)
    } else {
      this.setState({ isunique: true })
    }
  }
  handlePrivacyChange = (e, privacy) => {
    this.setState({ privacy })
  }
  handlePermissionsChange = (e, permissions) => {
    this.setState({ permissions })
  }
  handleApprovalChange = (e, approval) => {
    this.setState({ approval })
  }

  render() {
    const { modalStatus, communityName, isunique } = this.state

    return (
      <div className='setting__container'>
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
        <div className='group__privacy row'>
          <div className='label col-sm-4'>Privacy</div>
          <div className='options col-sm-8'>
            <div>
              <label className='container'>
                Public
                <input
                  type='checkbox'
                  name='public'
                  checked={this.state.privacy == 'public'}
                  onChange={(e) => this.handlePrivacyChange(e, 'public')}
                  value={'public'}
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
                  checked={this.state.privacy == 'closed'}
                  onChange={(e) => this.handlePrivacyChange(e, 'closed')}
                  value={'closed'}
                />
                <span className='checkmark'></span>
              </label>
            </div>
            <div>
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
            </div>
          </div>
        </div>
        <div className='group__privacy row'>
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
                  value={'public'}
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
        </div>
        <div className='group__privacy row'>
          <div className='label col-sm-4'>Membership Approval</div>
          <div className='options col-sm-8'>
            <div>
              <label className='container'>
                Everyone
                <input
                  type='checkbox'
                  name='Everyone'
                  checked={this.state.approval == 'everyone'}
                  onChange={(e) => this.handleApprovalChange(e, 'everyone')}
                  value={'everyone'}
                />
                <span className='checkmark'></span>
              </label>
            </div>
            <div>
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
            </div>
            <div>
              <label className='container'>
                Admins
                <input
                  type='checkbox'
                  name='Admins'
                  checked={this.state.approval == 'admins'}
                  onChange={(e) => this.handleApprovalChange(e, 'admins')}
                  value={'admins'}
                />
                <span className='checkmark'></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
