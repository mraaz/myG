import React, { Component } from 'react'

import TopTabs from './TopTabs'

export default class Chat extends Component {
  constructor() {
    super()
  }

  componentDidMount = async () => {
    window.scrollTo(0, 0)
    this.setState({ fetching: true })
    const chatNotifications = await axios.post(`/api/chat_notifications?page=1`)
    console.log('chatNotifications  ', chatNotifications)

    if (chatNotifications.data.length > 0) {
      this.setState({ chatNotifications: chatNotifications.data, fetching: false }, () => {
        this.props.setNotificationsCount(this.state.chatNotifications.length)
      })
    }
  }

  render() {
    const { active } = this.props

    const isActive = active == true ? { display: 'block' } : { display: 'none' }

    return (
      <div style={isActive}>
        <TopTabs tabs={['All', 'Messages', 'Groups', 'Misc']} />
        <div className='endline'>You don't have new notifications</div>
      </div>
    )
  }
}
