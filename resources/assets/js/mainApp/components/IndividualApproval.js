import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import SweetAlert from 'react-bootstrap-sweetalert'

const Toast_style = (props) => (
  <div className='individual-toasts'>
    <img width={48} src={'https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/Logo.png'}></img>
    <div>{props.text}</div>
  </div>
)

export default class IndividualApproval extends Component {
  constructor() {
    super()
    this.state = {
      actionClicked: true,
      actionClickedAccept: false,
      actionClickedDeny: false,
      dota_2_show_position: false,
      dota_2_position_one: false,
      dota_2_position_two: false,
      dota_2_position_three: false,
      dota_2_position_four: false,
      dota_2_position_five: false,
      dota_2_position_one_ticked: false,
      dota_2_position_two_ticked: false,
      dota_2_position_three_ticked: false,
      dota_2_position_four_ticked: false,
      dota_2_position_five_ticked: false,
      dota_2_position_selected: false,
      not_dota_2: false,
      alert: null,
    }
  }

  componentWillMount() {
    let { approvals } = this.props

    if (approvals.attendees.dota_2_position_one != '' && approvals.attendees.dota_2_position_one != null) {
      this.state.dota_2_position_one = true
      this.state.dota_2_show_position = true
    }
    if (approvals.attendees.dota_2_position_two != '' && approvals.attendees.dota_2_position_two != null) {
      this.state.dota_2_position_two = true
      this.state.dota_2_show_position = true
    }
    if (approvals.attendees.dota_2_position_three != '' && approvals.attendees.dota_2_position_three != null) {
      this.state.dota_2_position_three = true
      this.state.dota_2_show_position = true
    }
    if (approvals.attendees.dota_2_position_four != '' && approvals.attendees.dota_2_position_four != null) {
      this.state.dota_2_position_four = true
      this.state.dota_2_show_position = true
    }
    if (approvals.attendees.dota_2_position_five != '' && approvals.attendees.dota_2_position_five != null) {
      this.state.dota_2_position_five = true
      this.state.dota_2_show_position = true
    }
    if (!this.state.dota_2_show_position) {
      this.state.not_dota_2 = true
    }
  }

  clickedAccept = () => {
    let { approvals } = this.props
    if (this.state.dota_2_position_selected == false && this.state.not_dota_2 == false) {
      toast.success(<Toast_style text={'Sorry mate! You need to select a Position first! Click on a number to select the position'} />)
      return
    }
    this.showAlert()
  }

  accepted_invite = async () => {
    let { approvals } = this.props
    try {
      if (this.state.not_dota_2) {
        const accepted_invite = axios.post(
          `/api/attendees/update_invite/${approvals.attendees.schedule_games_id}/${approvals.attendees.user_id}`
        )
      } else {
        const accepted_invite = axios.post(
          `/api/attendees/update_invite/${approvals.attendees.schedule_games_id}/${approvals.attendees.user_id}`,
          {
            dota_2_position_one: this.state.dota_2_position_one_ticked,
            dota_2_position_two: this.state.dota_2_position_two_ticked,
            dota_2_position_three: this.state.dota_2_position_three_ticked,
            dota_2_position_four: this.state.dota_2_position_four_ticked,
            dota_2_position_five: this.state.dota_2_position_five_ticked,
          }
        )
      }
      if (approvals.schedule_games.limit != 42) {
        const getNumberofAttendees = await axios.get(`/api/attendees/attending/${approvals.attendees.schedule_games_id}`)
        if (getNumberofAttendees.data.allAttendees[0].no_of_allAttendees == approvals.schedule_games.limit) {
          const no_vacany = axios.post('/api/ScheduleGame/update_vacany/', {
            vacancy: false,
            id: approvals.attendees.schedule_games_id,
          })
        } else {
          const no_vacany = axios.post('/api/ScheduleGame/update_vacany/', {
            vacancy: true,
            id: approvals.attendees.schedule_games_id,
          })
        }
      }

      var strposition = ''
      if (this.state.dota_2_position_one_ticked) {
        strposition += '1'
      }
      if (this.state.dota_2_position_two_ticked) {
        if (strposition != '') {
          strposition += ', 2'
        } else {
          strposition += '2'
        }
      }
      if (this.state.dota_2_position_three_ticked) {
        if (strposition != '') {
          strposition += ', 3'
        } else {
          strposition += '3'
        }
      }
      if (this.state.dota_2_position_four_ticked) {
        if (strposition != '') {
          strposition += ', 4'
        } else {
          strposition += '4'
        }
      }
      if (this.state.dota_2_position_five_ticked) {
        if (strposition != '') {
          strposition += ', 5'
        } else {
          strposition += '5'
        }
      }

      if (this.state.not_dota_2) {
        var str = approvals.users.first_name + ' ' + approvals.users.last_name + ' was approved'
      } else {
        var str = approvals.users.first_name + ' ' + approvals.users.last_name + ' was approved for position/s: ' + strposition
      }

      const post = axios.post('/api/comments/', {
        content: str,
        schedule_games_id: approvals.attendees.schedule_games_id,
      })

      const post_game = axios.post('/api/notifications/addGameApproved', {
        other_user_id: approvals.attendees.user_id,
        schedule_games_id: approvals.attendees.schedule_games_id,
      })
    } catch (error) {
      console.log(error)
    }

    this.setState({
      actionClicked: false,
      actionClickedAccept: true,
    })
  }

  clickedDenied = () => {
    let { approvals } = this.props
    try {
      const deleteInvite = axios.get(
        `/api/attendees/delete_myInvite/${approvals.attendees.schedule_games_id}/${approvals.attendees.user_id}`
      )
    } catch (error) {
      console.log(error)
    }
    this.setState({
      actionClicked: false,
      actionClickedDeny: true,
    })
  }

  clickUpdatePosition(i) {
    switch (i) {
      case -1:
        this.setState({
          dota_2_position_one: true,
          dota_2_position_one_ticked: false,
          dota_2_position_selected: false,
        })
        break
      case 1:
        this.setState({
          dota_2_position_one: false,
          dota_2_position_one_ticked: true,
          dota_2_position_selected: true,
        })
        break
      case -2:
        this.setState({
          dota_2_position_two: true,
          dota_2_position_two_ticked: false,
          dota_2_position_selected: false,
        })
        break
      case 2:
        this.setState({
          dota_2_position_two: false,
          dota_2_position_two_ticked: true,
          dota_2_position_selected: true,
        })
        break
      case -3:
        this.setState({
          dota_2_position_three: true,
          dota_2_position_three_ticked: false,
          dota_2_position_selected: false,
        })
        break
      case 3:
        this.setState({
          dota_2_position_three: false,
          dota_2_position_three_ticked: true,
          dota_2_position_selected: true,
        })
        break
      case -4:
        this.setState({
          dota_2_position_four: true,
          dota_2_position_four_ticked: false,
          dota_2_position_selected: false,
        })
        break
      case 4:
        this.setState({
          dota_2_position_four: false,
          dota_2_position_four_ticked: true,
          dota_2_position_selected: true,
        })
        break
      case -5:
        this.setState({
          dota_2_position_five: true,
          dota_2_position_five_ticked: false,
          dota_2_position_selected: false,
        })
        break
      case 5:
        this.setState({
          dota_2_position_five: false,
          dota_2_position_five_ticked: true,
          dota_2_position_selected: true,
        })
        break
    }
  }

  showAlert() {
    const getAlert = () => (
      <SweetAlert
        info
        showCancel
        confirmBtnText='Make it so!'
        confirmBtnBsStyle='info'
        focusCancelBtn={true}
        focusConfirmBtn={false}
        showCloseButton={true}
        onConfirm={() => this.hideAlert('true')}
        onCancel={() => this.hideAlert('false')}>
        Happy with your choice? Once in, you can't reject!
      </SweetAlert>
    )

    this.setState({
      alert: getAlert(),
    })
  }

  hideAlert(text) {
    this.setState({
      alert: null,
    })
    if (text == 'true') {
      this.accepted_invite()
    }
  }

  render() {
    let { approvals, lastRow } = this.props
    var show_profile_img = false
    if (approvals.users.profile_img != null) {
      show_profile_img = true
    }

    return (
      <div className='scheduledGamesApprovals-info'>
        {this.state.alert}{' '}
        {show_profile_img && (
          <Link
            to={`/profile/${approvals.attendees.user_id}`}
            className='user-img'
            style={{
              backgroundImage: `url('${approvals.users.profile_img}')`,
            }}></Link>
        )}
        {!show_profile_img && (
          <Link
            to={`/profile/${approvals.attendees.user_id}`}
            className='user-img'
            style={{
              backgroundImage: `url('https://s3-ap-southeast-2.amazonaws.com/mygame-media/unknown_user.svg')`,
            }}></Link>
        )}
        <div className='user-info'>
          {`${approvals.users.first_name}`} {`${approvals.users.last_name}`}
        </div>
        {this.state.dota_2_show_position && <div className='dota_2_position'>Positions: </div>}
        {!this.state.dota_2_position_one && <div className='dota_2_position_dummy'></div>}
        {this.state.dota_2_position_one && (
          <div className='dota_2_position_one' onClick={() => this.clickUpdatePosition(1)}>
            <img
              src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/number-one-key-first-3-512.png'
              height='40'
              width='40'></img>
          </div>
        )}
        {this.state.dota_2_position_one_ticked && (
          <div className='dota_2_position_one' onClick={() => this.clickUpdatePosition(-1)}>
            <img
              src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/number-one-key-first-3-512-Ticked.png'
              height='40'
              width='40'></img>{' '}
          </div>
        )}
        {this.state.dota_2_position_two && (
          <div className='dota_2_position_two' onClick={() => this.clickUpdatePosition(2)}>
            <img
              src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/number-two-key-3-512.png'
              height='40'
              width='40'></img>{' '}
          </div>
        )}
        {this.state.dota_2_position_two_ticked && (
          <div className='dota_2_position_two' onClick={() => this.clickUpdatePosition(-2)}>
            <img
              src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/number-two-key-3-512-Ticked.png'
              height='40'
              width='40'></img>{' '}
          </div>
        )}
        {this.state.dota_2_position_three && (
          <div className='dota_2_position_three' onClick={() => this.clickUpdatePosition(3)}>
            <img
              src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/number-three-keyboard-3-512.png'
              height='40'
              width='40'></img>{' '}
          </div>
        )}
        {this.state.dota_2_position_three_ticked && (
          <div className='dota_2_position_three' onClick={() => this.clickUpdatePosition(-3)}>
            <img
              src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/number-three-keyboard-3-512-Ticked.png'
              height='40'
              width='40'></img>{' '}
          </div>
        )}
        {this.state.dota_2_position_four && (
          <div className='dota_2_position_four' onClick={() => this.clickUpdatePosition(4)}>
            <img
              src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/number-four-keyboard-3-512.png'
              height='40'
              width='40'></img>{' '}
          </div>
        )}
        {this.state.dota_2_position_four_ticked && (
          <div className='dota_2_position_four' onClick={() => this.clickUpdatePosition(-4)}>
            <img
              src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/number-four-keyboard-3-512-Ticked.png'
              height='40'
              width='40'></img>{' '}
          </div>
        )}
        {this.state.dota_2_position_five && (
          <div className='dota_2_position_five' onClick={() => this.clickUpdatePosition(5)}>
            <img
              src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/number-five-keyboard-3-512.png'
              height='40'
              width='40'></img>{' '}
          </div>
        )}
        {this.state.dota_2_position_five_ticked && (
          <div className='dota_2_position_five' onClick={() => this.clickUpdatePosition(-5)}>
            <img
              src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/number-five-keyboard-3-512-Ticked.png'
              height='40'
              width='40'></img>{' '}
          </div>
        )}
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
          {this.state.actionClickedAccept && <div className='invitation-accepted'>Accepted! &nbsp;&nbsp;</div>}
          {this.state.actionClickedDeny && <div className='invitation-denied'>Denied! &nbsp;&nbsp;</div>}
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
