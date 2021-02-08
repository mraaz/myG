import React, { Component } from 'react'

import Menu from './Notifications/Menu/Menu'
import MobileMenu from './Notifications/Menu/MobileMenu'
import Upcoming from './Notifications/Upcoming'
import Approvals from './Notifications/Approvals'
import Alerts from './Notifications/Alerts'
import Chat from './Notifications/Chat'
import Settings from './Notifications/Settings'
import Reports from './Notifications/Reports'
import ReportedUser from './Notifications/ReportedUser'

export default class Notifications extends Component {
  constructor() {
    super()

    this.state = {
      activeTab: 0,
      notificationsCount: 0,
      isAdmin: false,
    }
  }

  changeContentTab = (type, tab) => {
    const { isAdmin } = this.state
    let activeTab = tab
    if (!isAdmin && type == 'next') {
      activeTab = tab == 4 || tab == 5 ? 6 : activeTab
    }
    if (!isAdmin && type == 'previous') {
      activeTab = tab == 4 || tab == 5 ? 3 : activeTab
    }
    this.setState(
      {
        activeTab: activeTab,
        notificationsCount: 0,
      },
      () => {
        window.router.push(`/?at=notifications&submenu=${activeTab}`)
      }
    )
  }
  setNotificationsCount = (notificationsCount) => {
    // this.setState({
    //   notificationsCount,
    // })
  }

  isActive = (tab) => {
    return this.state.activeTab === tab
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    let params = new URLSearchParams(window.location.search)
    let activeTab = params.get('submenu')
    if (activeTab == null || activeTab == 0) {
      window.history.pushState('myG', 'myG', '/?at=notifications&submenu=0')
    }

    this.setState({
      activeTab: activeTab ? activeTab : 0,
    })
  }

  render() {
    const { activeTab = 0, notificationsCount, isAdmin } = this.state

    return (
      <section className='notifications-page'>
        <div className='notifications-container postCompose__container'>
          <div className='NotificationmobileView'>
            <Menu
              changeContentTab={this.changeContentTab}
              isAdmin={isAdmin}
              notificationsCount={notificationsCount}
              activeTab={activeTab}
            />
          </div>
          <div className='NotificationDesktopView'>
            <MobileMenu
              changeContentTab={this.changeContentTab}
              isAdmin={isAdmin}
              notificationsCount={notificationsCount}
              activeTab={activeTab}
              prevCount={this.prevCount}
              nextCount={this.nextCount}
            />
          </div>
          <div className='notifications-content'>
            {activeTab == 0 && <Upcoming active={activeTab == 0} setNotificationsCount={this.setNotificationsCount} {...this.props} />}
            {activeTab == 1 && <Approvals active={activeTab == 1} setNotificationsCount={this.setNotificationsCount} {...this.props} />}
            {activeTab == 2 && <Alerts active={activeTab == 2} setNotificationsCount={this.setNotificationsCount} {...this.props} />}
            {activeTab == 3 && <Chat active={activeTab == 3} setNotificationsCount={this.setNotificationsCount} {...this.props} />}
            {activeTab == 4 && isAdmin && (
              <Reports active={activeTab == 4} setNotificationsCount={this.setNotificationsCount} {...this.props} />
            )}
            {activeTab == 5 && isAdmin && (
              <ReportedUser active={activeTab == 5} setNotificationsCount={this.setNotificationsCount} {...this.props} />
            )}
            {activeTab == 6 && (
              <Settings active={activeTab == 6} isAdmin={isAdmin} setNotificationsCount={this.setNotificationsCount} {...this.props} />
            )}
          </div>
        </div>
      </section>
    )
  }
}
