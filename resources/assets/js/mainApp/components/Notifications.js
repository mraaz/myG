import React, { Component } from 'react'

import Menu from './Notifications/Menu/Menu'
import Upcoming from './Notifications/Upcoming'
import Approvals from './Notifications/Approvals'
import Alerts from './Notifications/Alerts'
import Chat from './Notifications/Chat'
import Settings from './Notifications/Settings'

export default class Notifications extends Component {
  constructor() {
    super()

    this.state = {
      activeTab: 0,
      notificationsCount: 0,
    }
  }

  changeContentTab = (tab) => {
    this.setState({
      activeTab: tab,
      notificationsCount: 0,
    })
  }
  setNotificationsCount = (notificationsCount) => {
    this.setState({
      notificationsCount,
    })
  }

  isActive = (tab) => {
    return this.state.activeTab === tab
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const { activeTab = 0, notificationsCount } = this.state
    return (
      <section className='notifications-page'>
        <div className='notifications-container postCompose__container'>
          <Menu changeContentTab={this.changeContentTab} notificationsCount={notificationsCount} activeTab={activeTab} />
          <div className='notifications-content'>
            {activeTab == 0 && <Upcoming active={this.isActive(0)} setNotificationsCount={this.setNotificationsCount} {...this.props} />}
            {activeTab == 1 && <Approvals active={this.isActive(1)} setNotificationsCount={this.setNotificationsCount} {...this.props} />}
            {activeTab == 2 && <Alerts active={this.isActive(2)} setNotificationsCount={this.setNotificationsCount} {...this.props} />}
            {activeTab == 3 && <Chat active={this.isActive(3)} setNotificationsCount={this.setNotificationsCount} {...this.props} />}
            {activeTab == 4 && <Settings active={this.isActive(4)} setNotificationsCount={this.setNotificationsCount} {...this.props} />}
          </div>
        </div>
      </section>
    )
  }
}
