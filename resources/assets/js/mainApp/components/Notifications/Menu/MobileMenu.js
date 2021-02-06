import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from './Button'

class MobileMenu extends Component {
  constructor() {
    super()

    this.state = {
      active: 0,
      approvals: 0,
      alerts: 0,
      chats: 0,
      reports: 0,
      reportedUser: 0,
    }
  }

  async componentDidMount() {
    window.scrollTo(0, 0)
  }

  changeTab = (tab) => {
    this.setState({
      active: tab,
    })
  }

  render() {
    const { changeContentTab, notificationsCount, activeTab, approvals, alerts, chats } = this.props
    const { reports = 0, reportedUser, isAdmin } = this.state
    const dummyData = [
      {
        title: `Upcoming Games  ${activeTab == 0 ? `(${notificationsCount})` : '(0)'}`,
        activeTab: 0,
      },
      {
        title: `Approvals ${approvals ? `(${approvals})` : '(0)'}`,
        activeTab: 1,
      },
      {
        title: `Alerts ${alerts ? `(${alerts})` : '(0)'}`,
        activeTab: 2,
      },
      {
        title: `Chat ${chats ? `(${chats})` : '(0)'}`,
        activeTab: 3,
      },
      {
        title: `Reports ${reports ? `(${reports})` : '(0)'}`, //isadmin
        activeTab: 4,
      },
      {
        title: `Reported Users ${reportedUser ? `(${reportedUser})` : '(0)'}`, //isadmin
        activeTab: 5,
      },
      {
        title: 'Settings',
        activeTab: 6,
      },
    ]
    const prevCount = Number(activeTab) == 0 ? 0 : Number(activeTab) - 1
    const nextCount = Number(activeTab) > 5 ? 0 : Number(activeTab) + 1

    return (
      <div className='menu__scroll'>
        <div
          className='previous'
          onClick={() => {
            this.changeTab(Number(prevCount))
            changeContentTab(Number(prevCount))
          }}>
          <img src='https://myG.gg/platform_images/View+Game/Down+Carrot.svg' />
        </div>
        <div className='activeTab__label'>{dummyData[activeTab].title}</div>
        <div
          className='next'
          onClick={() => {
            this.changeTab(Number(nextCount))
            changeContentTab(Number(nextCount))
          }}>
          <img src='https://myG.gg/platform_images/View+Game/Down+Carrot.svg' />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    approvals: state.notifications.approvals,
    alerts: state.notifications.alerts,
    chats: state.notifications.chats,
  }
}

export default connect(mapStateToProps)(MobileMenu)
