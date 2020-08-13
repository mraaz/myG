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
    }
  }

  changeContentTab = (tab) => {
    this.setState({
      activeTab: tab,
    })
  }

  isActive = (tab) => {
    return this.state.activeTab === tab
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const { activeTab = 0 } = this.state
    return (
      <section className='notifications-page'>
        <div className='notifications-container postCompose__container'>
          <Menu changeContentTab={this.changeContentTab} />
          <div className='notifications-content'>
            {activeTab == 0 && <Upcoming active={this.isActive(0)} {...this.props} />}
            {activeTab == 1 && <Approvals active={this.isActive(1)} {...this.props} />}
            {activeTab == 2 && <Alerts active={this.isActive(2)} {...this.props} />}
            {activeTab == 3 && <Chat active={this.isActive(3)} {...this.props} />}
            {activeTab == 4 && <Settings active={this.isActive(4)} {...this.props} />}
          </div>
        </div>
      </section>
    )
  }
}
