import React, { Component } from 'react'
import Select from 'react-select'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'

export default class IndividualMember extends Component {
  constructor() {
    super()
    this.state = {
      show_controls: true,
      show_delete: false,
      show_promoted: false,
      show_demoted: false,
      show_promoted_icon: true,
      show_demoted_icon: true,
      show_kick_icon: true,
      alert: null,
    }
  }

  componentWillMount() {
    //0=Owner, 1=Admin, 2=Moderator, 3=User, 42=Pending, -1=Not a member
    if (this.props.member.permission_level == 0 || this.props.member.permission_level == 42) {
      this.setState({ show_controls: false })
    }

    if (this.props.member.permission_level == 1) {
      this.setState({ show_promoted_icon: false })
    }

    if (this.props.member.permission_level == 3) {
      this.setState({ show_demoted_icon: false })
    }

    if (this.props.user_permission == 3 || this.props.user_permission == -1 || this.props.user_permission == 42) {
      this.setState({ show_controls: false })
    }

    if (this.props.user_permission == 2) {
      if (this.props.member.permission_level == 2 || this.props.member.permission_level == 1) {
        this.setState({ show_controls: false })
      }
    }
  }

  delete_member = () => {
    try {
      const delete_member = axios.get(`/api/usergroup/delete_member/${this.props.member.group_id}/${this.props.member.id}`)
    } catch (error) {
      console.log(error)
    }
    this.setState({
      show_controls: false,
      show_promoted: false,
      show_delete: true,
      show_demoted: false,
    })
    //NEED to do notifications
  }

  promote_member = () => {
    try {
      const delete_member = axios.get(`/api/usergroup/promote_member/${this.props.member.group_id}/${this.props.member.id}`)
    } catch (error) {
      console.log(error)
    }
    this.setState({
      show_controls: false,
      show_delete: false,
      show_promoted: true,
      show_demoted: false,
    })
  }

  demote_member = () => {
    try {
      const delete_member = axios.get(`/api/usergroup/demote_member/${this.props.member.group_id}/${this.props.member.id}`)
    } catch (error) {
      console.log(error)
    }
    this.setState({
      show_controls: false,
      show_delete: false,
      show_promoted: false,
      show_demoted: true,
    })
  }

  showAlert_promote_member() {
    const getAlert = () => (
      <SweetAlert
        info
        showCancel
        title='Are you sure you wish to promote this member?'
        confirmBtnText='Make it so!'
        confirmBtnBsStyle='info'
        focusCancelBtn={true}
        focusConfirmBtn={false}
        showCloseButton={true}
        onConfirm={() => this.hideAlert('promote_member_true')}
        onCancel={() => this.hideAlert('false')}></SweetAlert>
    )

    this.setState({
      alert: getAlert(),
    })
  }

  showAlert_demote_member() {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        title='Are you sure you wish to demote  this member?'
        confirmBtnText='Make it so!'
        confirmBtnBsStyle='warning'
        focusCancelBtn={true}
        focusConfirmBtn={false}
        showCloseButton={true}
        onConfirm={() => this.hideAlert('demote_member_true')}
        onCancel={() => this.hideAlert('false')}></SweetAlert>
    )

    this.setState({
      alert: getAlert(),
    })
  }

  showAlert_delete_member() {
    const getAlert = () => (
      <SweetAlert
        danger
        showCancel
        title='Are you sure you wish to remove this member from the group?'
        confirmBtnText='Make it so!'
        confirmBtnBsStyle='danger'
        focusCancelBtn={true}
        focusConfirmBtn={false}
        showCloseButton={true}
        onConfirm={() => this.hideAlert('delete_member_true')}
        onCancel={() => this.hideAlert('false')}></SweetAlert>
    )

    this.setState({
      alert: getAlert(),
    })
  }

  hideAlert(text) {
    this.setState({
      alert: null,
    })
    switch (text) {
      case 'promote_member_true':
        this.promote_member()
        break
      case 'demote_member_true':
        this.demote_member()
        break
      case 'delete_member_true':
        this.delete_member()
        break
    }
  }

  render() {
    let { member, lastRow } = this.props
    var show_profile_img = false
    if (member.profile_img != null) {
      show_profile_img = true
    }
    return (
      <div className='invitation-info'>
        {this.state.alert}
        {show_profile_img && (
          <Link
            to={`/profile/${member.alias}`}
            className='user-img'
            style={{
              backgroundImage: `url('${member.profile_img}')`,
            }}></Link>
        )}
        {!show_profile_img && (
          <Link
            to={`/profile/${member.alias}`}
            className='user-img'
            style={{
              backgroundImage: `url('https://mygame-media.s3-ap-southeast-2.amazonaws.com/default_user/new-user-profile-picture.png')`,
            }}></Link>
        )}
        <div className='user-info'>{`${member.alias}`}</div>
        {this.state.show_controls && (
          <div className='member-controls'>
            {this.state.show_promoted_icon && (
              <div className='promote' onClick={() => this.showAlert_promote_member()}>
                <i className='fas fa-arrow-circle-up'></i>
              </div>
            )}
            {this.state.show_demoted_icon && (
              <div className='depromote' onClick={() => this.showAlert_demote_member()}>
                <i className='fas fa-arrow-alt-circle-down'></i>
              </div>
            )}
            {this.state.show_kick_icon && (
              <div className='kick' onClick={() => this.showAlert_delete_member()}>
                <i className='fas fa-user-times'></i>
              </div>
            )}
          </div>
        )}
        {this.state.show_delete && <div className='member-controls'>Removed</div>}
        {this.state.show_promoted && <div className='member-controls'>Promoted</div>}
        {this.state.show_demoted && <div className='member-controls'>Demoted</div>}
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
