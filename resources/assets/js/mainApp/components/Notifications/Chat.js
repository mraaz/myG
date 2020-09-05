import React, { Component } from 'react'

import TopTabs from './TopTabs'
import axios from 'axios'
import { openChatById } from '../../../common/chat.js'

import { Link } from 'react-router-dom'
import { handleTime, delete_chatNotification_all, markread_chatNotification } from './helperFunction'

import NoRecord from './NoRecord'

const tabObj = {
  0: '',
  1: 'MESSAGE',
  2: 'GROUP_MESSAGE',
  3: 'PROMOTED,DEMOTED,KICKED',
}

export default class Chat extends Component {
  constructor() {
    super()
    this.state = {
      fetching: false,
      chatNotifications: [],
      moreplease: true,
      counter: 1,
      tab: 0,
    }
    this.myRef = React.createRef()
  }

  componentDidMount = async () => {
    window.scrollTo(0, 0)
    this.setState({ fetching: true })
    const chatNotifications = await axios.get(`/api/chat_notifications?page=1`)

    if (chatNotifications.data && chatNotifications.data.notifications.length > 0) {
      this.setState({ chatNotifications: chatNotifications.data.notifications, fetching: false }, () => {
        this.props.setNotificationsCount(this.state.chatNotifications.length)
      })
    }
  }
  getMoreChatNotification = async () => {
    const { counter, chatNotifications = [], tab } = this.state
    let count = counter + 1
    this.setState({ fetching: true })
    const chatNotification = await axios.get(`/api/chat_notifications?page=${count}`)

    if (chatNotification.data && chatNotification.data.length == 0) {
      this.setState({
        moreplease: false,
        fetching: false,
      })
      return
    }
    if (chatNotification.data && chatNotification.data.notifications.length > 0) {
      if (count > 1) {
        this.setState(
          { chatNotifications: [...chatNotifications, ...chatNotification.data.notifications], counter: count, fetching: false },
          () => {
            this.props.setNotificationsCount(this.state.chatNotifications.length)
          }
        )
      } else {
        this.setState({ chatNotifications: chatNotification.data.notifications, fetching: false }, () => {
          this.props.setNotificationsCount(this.state.chatNotifications.length)
        })
      }
    }
  }
  changeTab = async (tab) => {
    this.setState({ chatNotifications: [], fetching: true })
    const chatNotification = await axios.get(`/api/chat_notifications?page=1&type=${tabObj[tab]}`)
    if (chatNotification.data && chatNotification.data.notifications.length > 0) {
      this.setState({ chatNotifications: chatNotification.data.notifications, fetching: false, moreplease: true, tab }, () => {
        this.props.setNotificationsCount(this.state.chatNotifications.length)
      })
    }
  }

  handleScroll = (event) => {
    const _event = event.currentTarget,
      _current = this.myRef.current
    if (_event.scrollTop + (3 / 2) * _current.offsetHeight > _event.scrollHeight && this.state.moreplease && !this.state.fetching) {
      this.getMoreChatNotification()
    }
  }

  renderActivityText = (props) => {
    const { type, senderAlias = '', groupTitle = '' } = props
    switch (type) {
      case 'MESSAGE':
        return <div className='notification__text'>{`${senderAlias} has sent you a message `} </div>
        break
      case 'GROUP_MESSAGE':
        return <div className='notification__text'>{`You got mail in ${groupTitle} `}</div>
        break
      case 'PROMOTED':
        return <div className='notification__text'>{`You got promoted in ${groupTitle} `}</div>
        break
      case 'DEMOTED':
        return <div className='notification__text'>{`You got demoted in ${groupTitle} `}</div>
        break
      case 'KICKED':
        return <div className='notification__text'>{`You got KICKED from ${groupTitle} `}</div>
        break
      default:
        break
    }
  }
  addDefaultSrc(ev) {
    ev.target.src = 'https://mygame-media.s3.amazonaws.com/default_user/new-user-profile-picture.png'
  }
  markAllRead = () => {
    const { chatNotifications = [] } = this.state
    const notify = chatNotifications.map((noti) => {
      return {
        ...noti,
        hasRead: true,
      }
    })
    markread_chatNotification()
    this.setState({ chatNotifications: notify })
  }
  deleteAll = () => {
    delete_chatNotification_all()
    this.setState({ chatNotifications: [] }, () => {
      this.props.setNotificationsCount(0)
    })
  }
  handleClickNotiFication = (id, type) => {
    const { chatNotifications = [] } = this.state
    const notify = chatNotifications.map((noti) => {
      return {
        ...noti,
        hasRead: noti.id == id ? true : noti.hasRead,
      }
    })
    this.setState({ chatNotifications: notify })
    markread_chatNotification(id)
    if (type == 'MESSAGE') openChatById(id)
  }

  render() {
    const { active } = this.props
    const { fetching, chatNotifications } = this.state

    const isActive = active == true ? { display: 'block' } : { display: 'none' }

    return (
      <div style={isActive} className='game__approval'>
        <TopTabs tabs={['All', 'Messages', 'Groups', 'Misc']} changeTab={this.changeTab} />
        {chatNotifications.length ? (
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
        ) : (
          <NoRecord title='No more updates.' linkvisible={false} />
        )}
        <div className='gameList__box' style={{ padding: '15px' }} onScroll={this.handleScroll} ref={this.myRef}>
          {chatNotifications.length > 0 &&
            chatNotifications.map((chatNoti) => {
              const time = handleTime(chatNoti.createdAt)

              return (
                <div
                  className={`notification ${chatNoti.hasRead == false ? 'unread' : ''}`}
                  key={chatNoti.id}
                  onClick={(e) => this.handleClickNotiFication(chatNoti.id, chatNoti.type)}>
                  <div className='notification-user-avatar'>
                    <Link to={`/profile/${chatNoti.senderAlias}`}>
                      <img onError={this.addDefaultSrc} src={chatNoti.senderIcon ? chatNoti.senderIcon : defaultUserImage} />
                    </Link>
                  </div>
                  <div className='notification-content'>
                    <div className={`notification-description ${chatNoti.hasRead == false ? '' : 'unread'}`}>
                      <div className='username__link'>
                        <Link to={`/profile/${chatNoti.senderAlias}`}>
                          <div className='notification-username'>
                            <span> @{chatNoti.senderAlias}</span>
                          </div>
                        </Link>
                      </div>
                      {this.renderActivityText(chatNoti)}
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
          {chatNotifications.length > 0 && <div className='endline'>No more updates</div>}
        </div>
      </div>
    )
  }
}
