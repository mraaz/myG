import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import IndividualMember from './IndividualMember'
import ToggleButton from 'react-toggle-button'

export default class Member_lists extends Component {
  constructor() {
    super()
    this.state = {
      current_user_permission: -1,
      value_all_accept_setting: false,
      show_settings: false,
    }
  }

  componentWillMount() {
    const self = this

    const getMembers = async function() {
      try {
        const getMembers = await axios.get(`/api/usergroup/member_lists/${self.props.routeProps.match.params.id}`)

        const getOwner = await axios.get(`/api/groups/show_owner/${self.props.routeProps.match.params.id}`)

        if (getMembers.data.all_group_members.length == 0) {
          getOwner.data.show_owner[0].usergroups_user_id = getOwner.data.show_owner[0].id
          self.setState({
            allGroupies: getOwner.data.show_owner,
          })
          return
        }

        getOwner.data.show_owner[0].usergroups_user_id = getOwner.data.show_owner[0].id
        getMembers.data.all_group_members.push(getOwner.data.show_owner[0])
        //0=Owner, 1=Admin, 2=Moderator, 3=User, 42=Pending, -1=Not a member
        if (self.props.initialData.userInfo.id == getMembers.data.all_group_members[0].user_id) {
          self.state.current_user_permission = 0
        } else {
          const current_member = await axios.get(`/api/usergroup/current_member/${getMembers.data.all_group_members[0].group_id}`)
          if (current_member.data.current_member.length > 0) {
            self.state.current_user_permission = current_member.data.current_member[0].permission_level
          } else {
            self.setState({
              allGroupies: getMembers.data.all_group_members,
            })
            return
          }
        }
        if (self.state.current_user_permission == 0 || self.state.current_user_permission == 1 || self.state.current_user_permission == 2) {
          self.setState({
            show_settings: true,
          })
        }

        self.setState({
          allGroupies: getMembers.data.all_group_members,
        })
      } catch (error) {
        console.log(error)
      }
    }

    const getGroupInfo = async function() {
      try {
        const getGroupInfo = await axios.get(`/api/groups/${self.props.routeProps.match.params.id}`)
        self.setState({
          value_all_accept_setting: getGroupInfo.data.group[0].all_accept,
        })
      } catch (error) {
        console.log(error)
      }
    }

    if (this.props.initialData != 'loading') {
      getMembers()
    }

    getGroupInfo()
  }

  showMembers = () => {
    if (this.state.allGroupies != undefined) {
      const rowLen = this.state.allGroupies.length
      var lastRow = false
      if (rowLen == 0) {
        return <div className='invitation-info'>No members :(</div>
      }
      return this.state.allGroupies.map((item, index) => {
        if (rowLen === index + 1) {
          lastRow = true
        }
        return <IndividualMember member={item} key={index} lastRow={lastRow} user_permission={this.state.current_user_permission} />
      })
    }
  }

  update_all_accept_setting = async () => {
    try {
      const update_exp = await axios.post(`/api/groups/update/all_accept/`, {
        group_id: this.props.routeProps.match.params.id,
        all_accept: !this.state.value_all_accept_setting,
      })
    } catch (error) {
      console.log(error)
    }

    this.setState({
      value_all_accept_setting: !this.state.value_all_accept_setting,
    })
  }

  render() {
    if (this.state.allGroupies !== undefined) {
      return (
        <section id='invitation-page'>
          <div className='content-area invitation-page'>
            <div id='header'>
              <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/headers/headers_v1-16.png' />
            </div>
            {this.state.show_settings && (
              <div className='group-settings'>
                All members can accept this groups' invitations &nbsp;&nbsp;&nbsp;
                <ToggleButton
                  value={this.state.value_all_accept_setting || false}
                  onToggle={(value_all_accept_setting) => {
                    this.update_all_accept_setting()
                  }}
                />
              </div>
            )}
            <div className='padding-container'>
              <div className='invitation-grey-container'>
                <h3>
                  Members - (
                  {this.state.allGroupies.length == 1
                    ? this.state.allGroupies.length + ' member'
                    : this.state.allGroupies.length + ' members'}
                  )
                </h3>
                <div className='padding-container'></div>
                <div className='invitation-container'>{this.showMembers()}</div>
              </div>
            </div>
          </div>
        </section>
      )
    } else {
      return <div className='content-area invitation-page'>Loading</div>
    }
  }
}
