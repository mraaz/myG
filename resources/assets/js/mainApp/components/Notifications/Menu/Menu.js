import React, { Component } from 'react'
import Button from './Button'
import axios from 'axios'

export default class Menu extends Component {
  constructor() {
    super()

    this.state = {
      active: 0,
      approvals: 0,
      alerts: 0,
      chats: 0,
    }
  }

  async componentDidMount() {
    window.scrollTo(0, 0)
    const getnoti = await axios.post('/api/notifications_v2/getUnread_count', {
      notification_type: -1,
    })

    const chat_noti = await axios.get('/api/chat/message/unread?count=true')
    if (chat_noti.data) {
      this.setState({ chats: chat_noti.data.unreadMessages ? chat_noti.data.unreadMessages : 0 })
    }

    if (getnoti.data) {
      const { getUnread_count_Alerts = 0, getUnread_count_Approvals = 0 } = getnoti.data
      this.setState({ alerts: getUnread_count_Alerts, approvals: getUnread_count_Approvals })
    }
  }

  changeTab = (tab) => {
    this.setState({
      active: tab,
    })
  }

  isActive = (tab) => {
    return this.state.active == tab
  }

  render() {
    const { changeContentTab, notificationsCount, activeTab } = this.props
    const { approvals = 0, chats = 0, alerts = 0 } = this.state

    return (
      <div className='notifications-menu'>
        <div className='button-list'>
          <Button
            title={`Upcoming Games  ${activeTab == 0 ? `(${notificationsCount})` : '(0)'}`}
            active={activeTab == 0}
            onClick={() => {
              this.changeTab(0)
              changeContentTab(0)
            }}
          />
          <Button
            title={`Approvals ${approvals ? `(${approvals})` : '(0)'}`}
            active={activeTab == 1}
            onClick={() => {
              this.changeTab(1)
              changeContentTab(1)
            }}
          />
          <Button
            title={`Alerts ${alerts ? `(${alerts})` : '(0)'}`}
            active={activeTab == 2}
            onClick={() => {
              this.changeTab(2)
              changeContentTab(2)
            }}
          />
          <Button
            title={`Chat ${chats ? `(${chats})` : '(0)'}`}
            active={activeTab == 3}
            onClick={() => {
              this.changeTab(3)
              changeContentTab(3)
            }}
          />
          <Button
            title='Settings'
            active={activeTab == 4}
            onClick={() => {
              this.changeTab(4)
              changeContentTab(4)
            }}
          />
        </div>
      </div>
    )
  }
}
