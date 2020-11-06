import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { mark_all, delete_all, handleSingleNotificationReadStatus } from './helperFunction'

import TopTabs from './TopTabs'
const defaultUserImage = 'https://mygame-media.s3.amazonaws.com/default_user/new-user-profile-picture.png'
const tabObj = {
  0: 0,
  1: -1,
  2: 10,
  3: -2,
}

import NoRecord from './NoRecord'

export default class Alerts extends Component {
  constructor() {
    super()
    this.state = {
      counter: 1,
      notification: [],
      fetching: false,
      moreplease: true,
      tab: 0,
    }
    this.myRef = React.createRef()
  }

  componentDidMount = async () => {
    document.title = 'myG - Notification'

    const { counter } = this.state
    window.scrollTo(0, 0)
    const getnoti = await axios.post('/api/notifications_v2/getAllNoti', {
      counter,
      activity_type: 0,
    })
    if (getnoti.data.length > 0) {
      this.setState(
        {
          notification: getnoti.data,
        },
        () => {
          this.props.setNotificationsCount(this.state.notification.length)
        }
      )
    }
  }
  changeTab = async (tab) => {
    this.setState({ notification: [], fetching: true })
    const getnoti = await axios.post('/api/notifications_v2/getAllNoti', {
      counter: 1,
      activity_type: tabObj[tab],
    })
    if (getnoti.data.length > 0) {
      this.setState({ notification: getnoti.data, fetching: false, moreplease: true, tab }, () => {
        this.props.setNotificationsCount(this.state.notification.length)
      })
    }
  }

  getMoreAlert = async () => {
    const { counter, notification = [], tab } = this.state
    let count = counter + 1
    this.setState({ fetching: true })
    const getnoti = await axios.post('/api/notifications_v2/getAllNoti', {
      counter: count,
      activity_type: tabObj[tab],
    })

    if (getnoti.data && getnoti.data.length == 0) {
      this.setState({
        moreplease: false,
        fetching: false,
      })
      return
    }
    if (getnoti.data && getnoti.data.length > 0) {
      if (count > 1) {
        this.setState({ notification: [...notification, ...getnoti.data], counter: count, fetching: false }, () => {
          this.props.setNotificationsCount(this.state.notification.length)
        })
      } else {
        this.setState({ notification: getnoti.data, fetching: false }, () => {
          this.props.setNotificationsCount(this.state.notification.length)
        })
      }
    }
  }

  handleScroll = (event) => {
    const _event = event.currentTarget,
      _current = this.myRef.current
    if (_event.scrollTop + (3 / 2) * _current.offsetHeight > _event.scrollHeight && this.state.moreplease && !this.state.fetching) {
      this.getMoreAlert()
    }
  }

  handleTime = (time) => {
    let countdown_label = 'Days'
    let countdown = moment().diff(moment(time), 'days')
    if (countdown == 0) {
      countdown = moment().diff(moment(time), 'hours')
      countdown_label = 'Hours'
    }
    if (countdown == 0) {
      countdown = moment().diff(moment(time), 'minutes')
      countdown_label = 'Minutes'
    }
    if (countdown == 0) {
      countdown = moment().diff(moment(time), 'seconds')
      countdown_label = 'Seconds'
    }
    return {
      countdown,
      countdown_label,
    }
  }

  renderActivityText = (props) => {
    const { activity_type: v } = props
    let activity_name = ''
    switch (v) {
      case 2:
      case 3:
      case 4:
        if (v == 2) {
          activity_name = 'post'
        } else if (v == 3) {
          activity_name = 'comment'
        } else if (v == 4) {
          activity_name = 'reply'
        }
        return (
          <div className='notification__text'>
            {`liked your`}
            <Link to={`/post/${props.post_id}`}>
              <span className='notification-type'>{`${activity_name}`}</span>
            </Link>
          </div>
        )
        break
      case 5:
        activity_name = 'post'
        return (
          <div className='notification__text'>
            {`commented on your`}
            <Link to={`/post/${props.post_id}`}>
              <span className='notification-type'>{`${activity_name}`}</span>
            </Link>
          </div>
        )
        break
      case 6:
        activity_name = 'post'
        return (
          <div className='notification__text'>
            {`replied on your`}
            <Link to={`/post/${props.post_id}`}>
              <span className='notification-type'>{`${activity_name}`}</span>
            </Link>
          </div>
        )
        break
      case 10:
        return (
          <div className='notification__text'>
            {`has invited you to join`}
            <Link to={`/scheduledGames/${props.schedule_games_GUID}`}>
              <span className='notification-type'>{props.game_name}</span>
            </Link>
            {`starting on ${moment(props.start_time).format('DD-MMM-YYYY')}`}
          </div>
        )
        break
      case 14:
        return (
          <div className='notification__text'>
            {`Grats! You are accepted to join`}
            <Link to={`/scheduledGames/${props.schedule_games_GUID}`}>
              <span className='notification-type'>{props.game_name}</span>
            </Link>
            {`which starts on  ${moment(props.start_time).format('DD-MMM-YYYY')}`}
          </div>
        )
        break
      case 15:
        return (
          <div className='notification__text'>
            {`Boo!`}
            <Link to={`/scheduledGames/${props.schedule_games_GUID}`}>
              <span className='notification-type'>{props.game_name}</span>
            </Link>
            {`was cancelled :(`}
          </div>
        )
        break
      case 16:
        return (
          <div className='notification__text'>
            {`left your`}
            <Link to={`/scheduledGames/${props.schedule_games_GUID}`}>
              <span className='notification-type'>{props.game_name}</span>
            </Link>
            {`game starting on ${moment(props.start_time).format('DD-MMM-YYYY')}`}
          </div>
        )
        break
      case 17:
        return (
          <div className='notification__text'>
            {`Epic! You have been accepted to group: `}
            <Link to={`/community/${props.group_id}`}>
              <span className='notification-type'>{props.game_name}</span>
            </Link>
          </div>
        )
        break
      case 20:
        return (
          <div className='notification__text'>
            <Link to={`/profile/${props.alias}`}>
              <span className='notification-type'>{`Ding! Grats, you reached a new level!`} </span>
            </Link>
          </div>
        )
        break
      case 21:
        return (
          <div className='notification__text'>
            {`has joined`}
            <Link to={`/scheduledGames/${props.schedule_games_GUID}`}>
              <span className='notification-type'>{props.game_name}</span>
            </Link>
            {`which starts on  ${moment(props.start_time).format('DD-MMM-YYYY')}`}
          </div>
        )
        break
      case 22:
        return (
          <div className='notification__text'>
            {`has invited you to this community: `}
            <Link to={`/community/${decodeURIComponent(props.name)}`}>
              <span className='notification-type'>{decodeURIComponent(props.name)}</span>
            </Link>
          </div>
        )
        break

      case 23:
        return <div className='notification__text'>{`has commended you!`}</div>
        break

      default:
        break
    }
  }

  handleClickNotiFication = (id, index, activity_type) => {
    let { notification = [] } = this.state
    if (notification.length > 0 && notification[index].read_status != 1) {
      if (notification[index].read == undefined || notification[index].read == false) {
        notification[index].read = true
        handleSingleNotificationReadStatus(notification[index].id, true, activity_type)
        this.setState({ notification: notification })

        //   , () => {
        //   this.props.setNotificationsCount(0)
        // })
      } else {
        return
      }
    } else {
      return
    }
    // const notify = notification.map((noti) => {
    //   //console.log(noti)
    //   if (noti.id == id) {
    //     status = !noti.read
    //   }
    //
    //   return {
    //     ...noti,
    //     read: noti.id == id ? !noti.read : noti.read,
    //   }
    // })
  }

  markAllRead = () => {
    const { notification = [] } = this.state
    const notify = notification.map((noti) => {
      return {
        ...noti,
        read: true,
      }
    })
    mark_all()
    this.setState({ notification: notify }, () => {
      this.props.setNotificationsCount(0)
    })
  }
  deleteAll = () => {
    delete_all()
    this.setState({ notification: [] }, () => {
      this.props.setNotificationsCount(0)
    })
  }

  addDefaultSrc(ev) {
    ev.target.src = 'https://mygame-media.s3.amazonaws.com/default_user/new-user-profile-picture.png'
  }

  render() {
    const { active } = this.props
    const { notification = [], fetching = false, tab = 0 } = this.state

    const isActive = active == true ? { display: 'block' } : { display: 'none' }

    return (
      <div style={isActive} className='notification__container'>
        <TopTabs tabs={['All', 'Feed', 'Games', 'Misc']} changeTab={this.changeTab} />
        {notification.length && tab == 0 && (
          <div className='top-actions'>
            <div className='actions'>
              <button className='action' onClick={(e) => this.markAllRead()}>
                Mark All Read
              </button>
              <button className='action' onClick={(e) => this.deleteAll()}>
                Clear All
              </button>
            </div>
          </div>
        )}
        {notification.length == 0 && <NoRecord title='No more updates.' linkvisible={false} />}
        <div className='gameList__box' style={{ padding: '15px' }} onScroll={this.handleScroll} ref={this.myRef}>
          {notification.length > 0 &&
            notification.map((noti, index) => {
              const time = this.handleTime(noti.created_at)
              return (
                <div
                  className={`notification alert ${
                    noti.read == undefined ? (noti.read_status == 0 ? 'unread' : '') : noti.read == false ? 'unread' : ''
                  }`}
                  key={`${noti.id}`}
                  onClick={(e) => this.handleClickNotiFication(noti.id, index, noti.activity_type)}>
                  <div
                    className='notification-user-avatar'
                    onClick={(e) => this.handleClickNotiFication(noti.id, index, noti.activity_type)}>
                    <Link to={`/profile/${noti.alias}`}>
                      <img onError={this.addDefaultSrc} src={noti.profile_img ? noti.profile_img : defaultUserImage} />
                    </Link>
                  </div>
                  <div className='notification-content'>
                    <div
                      className={`notification-description ${
                        noti.read == undefined ? (noti.read_status == 0 ? 'unread' : '') : noti.read == false ? 'unread' : ''
                      }`}>
                      <span className='username__link' onClick={(e) => this.handleClickNotiFication(noti.id, index, noti.activity_type)}>
                        <Link to={`/profile/${noti.first_user_alias || noti.alias}`}>
                          <span className='notification-username'>
                            <span> @{noti.first_user_alias || noti.alias}</span>
                          </span>
                        </Link>
                        {noti.second_user_alias && (
                          <Link to={`/profile/${noti.second_user_alias}`}>
                            <span className='notification-username'>
                              {noti.total_post_count > 0 ? `,  @${noti.second_user_alias} ` : `and @${noti.second_user_alias}`}
                            </span>
                          </Link>
                        )}
                        {noti.third_user_alias && `,` && (
                          <Link to={`/profile/${noti.third_user_alias}`}>
                            <span className='notification-username'>
                              {noti.total_post_count > 0 ? `,  @${noti.third_user_alias} ` : `and @${noti.third_user_alias} `}
                            </span>
                          </Link>
                        )}
                        {noti.total_post_count > 2 && (
                          <span className='notification__text'>
                            {`and ${noti.total_post_count} others`}
                            {` `}
                          </span>
                        )}
                      </span>
                      {this.renderActivityText(noti)}
                    </div>
                    <div className='notification-options'>
                      <span className='notification-time'>
                        {time.countdown} {time.countdown_label} ago
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          {notification.length > 0 && <div className='endline'>No more updates</div>}
        </div>
      </div>
    )
  }
}
