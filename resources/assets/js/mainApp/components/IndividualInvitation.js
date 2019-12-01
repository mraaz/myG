import React, { Component } from 'react'
import Select from 'react-select'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class IndividualInvitation extends Component {
  constructor() {
    super()
    this.state = {
      actionClicked: true,
      actionClickedAccept: false,
      actionClickedDeny: false,
      group_approvals: false,
    }
  }

  componentWillMount() {
    let { type } = this.props

    if (type == 'group_approvals') {
      this.setState({
        group_approvals: true,
      })
    }
  }

  clickedAccept = () => {
    if (this.state.group_approvals) {
      try {
        const set_group_approval = axios.get(
          `/api/usergroup/set_group_approval/${this.props.invitation.group_id}/${this.props.invitation.id}`
        )
      } catch (error) {
        console.log(error)
      }
    } else {
      this.clickedAccept_myInvitations()
    }

    this.setState({
      actionClicked: false,
      actionClickedAccept: true,
    })
  }

  clickedDenied = () => {
    if (this.state.group_approvals) {
      try {
        const remove_group_approval = axios.get(
          `/api/usergroup/remove_group_approval/${this.props.invitation.group_id}/${this.props.invitation.id}`
        )
      } catch (error) {
        console.log(error)
      }
    } else {
      this.clickedDenied_myInvitations()
    }

    this.setState({
      actionClicked: false,
      actionClickedDeny: true,
    })
  }

  clickedAccept_myInvitations = () => {
    let { invitation } = this.props

    try {
      const deleteNoti = axios.get(`/api/notifications/delete/${invitation.id}`)
    } catch (error) {
      console.log(error)
    }

    try {
      const createFriend = axios.post('/api/friends/create', {
        friend_id: invitation.user_id,
      })
    } catch (error) {
      console.log(error)
    }
  }

  clickedDenied_myInvitations = () => {
    let { invitation } = this.props
    try {
      const deleteNoti = axios.get(`/api/notifications/delete/${invitation.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    let { invitation, lastRow } = this.props
    var show_profile_img = false
    if (invitation.profile_img != null) {
      show_profile_img = true
    }
    return (
      <div className='invitation-info'>
        {show_profile_img && (
          <Link
            to={`/profile/${invitation.user_id}`}
            className='user-img'
            style={{
              backgroundImage: `url('${invitation.profile_img}')`,
            }}></Link>
        )}
        {!show_profile_img && (
          <Link
            to={`/profile/${invitation.user_id}`}
            className='user-img'
            style={{
              backgroundImage: `url('https://s3-ap-southeast-2.amazonaws.com/mygame-media/unknown_user.svg')`,
            }}></Link>
        )}
        <div className='user-info'>
          {`${invitation.first_name}`} {`${invitation.last_name}`}
        </div>
        <div className='invitiation-options'>
          {this.state.actionClicked && (
            <div className='invitation-accept' onClick={this.clickedAccept}>
              Accept &nbsp;&nbsp;
            </div>
          )}
          {this.state.actionClicked && (
            <div className='invitation-deny' onClick={this.clickedDenied}>
              Deny&nbsp;&nbsp;
            </div>
          )}
          {this.state.actionClickedAccept && (
            <div className='invitation-accepted'>Accepted! &nbsp;&nbsp;</div>
          )}
          {this.state.actionClickedDeny && (
            <div className='invitation-denied'>Denied! &nbsp;&nbsp;</div>
          )}
        </div>
        {!lastRow && (
          <div className='line-break'>
            <hr />
          </div>
        )}
        {lastRow && <div className='last-row'></div>}
      </div>
    )
  }
}
