/*
 * Author : Nitin Tyagi
 * Github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import TopTabs from './TopTabs'
import {
  clickedAccept_myInvitations,
  clickedDenied_myInvitations,
  clickedAccept_community,
  clickedDenied_community,
  clickedAccept_game,
  clickedDenied_game,
  handleTime,
  mark_read_status
} from './helperFunction'
import { Toast_style } from './../Utility_Function'
import { toast } from 'react-toastify'
import NoRecord from './NoRecord'
const defaultUserImage = 'https://myG.gg/default_user/new-user-profile-picture.png'
const tabObj = {
  0: 0,
  1: 1,
  2: 11,
  3: 12
}

export default class Approvals extends Component {
  constructor() {
    super()
    this.state = {
      fetching: false,
      approvals: [],
      moreplease: true,
      counter: 1,
      tab: 0
    }
    this.myRef = React.createRef()
  }

  componentDidMount = async () => {
    document.title = 'myG - Notification'

    const { counter, tab } = this.state
    window.scrollTo(0, 0)
    this.setState({ fetching: true })
    const getApprovals = await axios.post('/api/notifications_v2/getApprovals_Dashboard', {
      counter,
      activity_type: tabObj[tab]
    })

    if (getApprovals.data.length > 0) {
      this.setState({ approvals: getApprovals.data, fetching: false }, () => {
        this.props.setNotificationsCount(this.state.approvals.length)
      })
    }
  }

  getMoreNotification = async () => {
    const { counter, approvals = [], tab } = this.state
    let count = counter + 1
    this.setState({ fetching: true })
    const getApprovals = await axios.post('/api/notifications_v2/getApprovals_Dashboard', {
      counter: count,
      activity_type: tabObj[tab]
    })

    if (getApprovals.data && getApprovals.data.length == 0) {
      this.setState({
        moreplease: false,
        fetching: false
      })
      return
    }
    if (getApprovals.data && getApprovals.data.length > 0) {
      if (count > 1) {
        this.setState({ approvals: [...approvals, ...getApprovals.data], counter: count, fetching: false }, () => {
          this.props.setNotificationsCount(this.state.approvals.length)
        })
      } else {
        this.setState({ approvals: getApprovals.data, fetching: false }, () => {
          this.props.setNotificationsCount(this.state.approvals.length)
        })
      }
    }
  }
  changeTab = async (tab) => {
    this.setState({ approvals: [], fetching: true })
    const getApprovals = await axios.post('/api/notifications_v2/getApprovals_Dashboard', {
      counter: 1,
      activity_type: tabObj[tab]
    })

    if (getApprovals.data.length > 0) {
      this.setState({ approvals: getApprovals.data, fetching: false, moreplease: true, tab }, () => {
        this.props.setNotificationsCount(this.state.approvals.length)
      })
    }
  }

  handleScroll = (event) => {
    const _event = event.currentTarget,
      _current = this.myRef.current
    if (_event.scrollTop + (3 / 2) * _current.offsetHeight > _event.scrollHeight && this.state.moreplease && !this.state.fetching) {
      this.getMoreNotification()
    }
  }

  handleActionClick = (type, data) => {
    const { approvals } = this.state
    if (type == 'accept') {
      if (data.activity_type == 1) {
        clickedAccept_myInvitations(data)
      } else if (data.activity_type == 12) {
        clickedAccept_community(data)
      } else {
        clickedAccept_game(data)
      }
    } else {
      if (data.activity_type == 1) {
        clickedDenied_myInvitations(data)
      } else if (data.activity_type == 12) {
        clickedDenied_community(data)
      } else {
        clickedDenied_game(data)
      }
    }
    const filterApprovals = approvals.filter((approval) => approval.id != data.id)
    this.setState({ approvals: filterApprovals }, () => {
      this.props.setNotificationsCount(this.state.approvals.length)
    })
    toast.success(<Toast_style text={`Yeah! you have successfully ${type} the request.`} />)
  }

  renderActivityText = (props) => {
    const { activity_type } = props
    let activity_name = ''
    switch (activity_type) {
      case 12:
        activity_name = 'Group'
        return (
          <div className='notification__text'>
            {`wants to join this group `}{' '}
            <Link to={`/community/${props.group_id}`}>
              <span className='notification-type'>{props.name}</span>
            </Link>
            {`. What ya reckon? `}
          </div>
        )
        break
      case 1:
        activity_name = 'Friendship'
        return <div className='notification__text'>{` wants to connect with you `}</div>
        break
      case 11:
        activity_name = 'Game'
        return (
          <div className='notification__text'>
            {`wants to join  `}{' '}
            <Link to={`/scheduledGames/${props.schedule_games_GUID}`}>
              <span className='notification-type'>{props.game_name}</span>
            </Link>
            {`starting on ${moment(props.start_time).format('DD-MMM-YYYY')}`}
          </div>
        )
        break

      default:
        break
    }
  }

  addDefaultSrc(ev) {
    ev.target.src = 'https://myG.gg/default_user/new-user-profile-picture.png'
  }

  handleClickNotiFication = (id, index) => {
    let { approvals = [] } = this.state

    if (approvals.length > 0 && approvals[index].read_status != 1) {
      if (approvals[index].read == undefined || approvals[index].read == false) {
        approvals[index].read = true
        mark_read_status(id)
        this.setState({ approvals: approvals })
      } else {
        return
      }
    } else {
      return
    }
  }

  render() {
    const { active } = this.props
    const { fetching, approvals } = this.state

    const isActive = active == true ? { display: 'block' } : { display: 'none' }

    return (
      <div style={isActive} className='game__approval'>
        <TopTabs tabs={['All', 'Friendships', 'Games', 'Communities']} changeTab={this.changeTab} />

        {!approvals.length && <NoRecord title='No more updates.' linkvisible={false} />}

        <div className='gameList__box' style={{ padding: '15px' }} onScroll={this.handleScroll} ref={this.myRef}>
          {approvals.length > 0 &&
            approvals.map((approval, index) => {
              const time = handleTime(approval.created_at)
              return (
                <div
                  className={`notification ${
                    approval.read == undefined ? (approval.read_status == 0 ? 'unread' : '') : approval.read == false ? 'unread' : ''
                  }`}
                  key={approval.id}
                  onClick={(e) => this.handleClickNotiFication(approval.id, index)}
                >
                  <div className='notification-user-avatar'>
                    <Link to={`/profile/${approval.alias}`}>
                      <img onError={this.addDefaultSrc} src={approval.profile_img ? approval.profile_img : defaultUserImage} />
                    </Link>
                  </div>
                  <div className='notification-content'>
                    <div
                      className={`notification-description ${
                        approval.read == undefined ? (approval.read_status == 0 ? 'unread' : '') : approval.read == false ? 'unread' : ''
                      }`}
                    >
                      <div className='username__link'>
                        <Link to={`/profile/${approval.alias}`}>
                          <div className='notification-username'>
                            <span> @{approval.alias}</span>
                          </div>
                        </Link>
                      </div>
                      {this.renderActivityText(approval)}
                    </div>
                    <div className='notification-options'>
                      <span className='notification-time'>
                        {time.countdown} {time.countdown_label} ago
                      </span>
                      <div className='notification-actions'>
                        <button
                          className='action accept'
                          onClick={(e) => {
                            e.stopPropagation()
                            this.handleActionClick('accept', approval)
                          }}
                        >
                          <img src='https://myG.gg/platform_images/Dashboard/btn_Like_Feed.svg' />
                          {` Accept`}
                        </button>
                        <button
                          className='action decline'
                          onClick={(e) => {
                            e.stopPropagation()
                            this.handleActionClick('decline', approval)
                          }}
                        >
                          <img src='https://myG.gg/platform_images/Dashboard/btn_Like_Feed.svg' />
                          {` Decline`}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          {approvals.length > 0 && <div className='endline'>No more updates</div>}
        </div>
      </div>
    )
  }
}
