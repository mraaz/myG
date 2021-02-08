import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from './Button'

class Menu extends Component {
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

  isActive = (tab) => {
    return this.state.active == tab
  }

  render() {
    const { changeContentTab, notificationsCount, activeTab, approvals, alerts, chats, isAdmin } = this.props
    const { reports = 0, reportedUser } = this.state
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
          {isAdmin && (
            <Button
              title={`Reports ${reports ? `(${reports})` : '(0)'}`}
              active={activeTab == 4}
              onClick={() => {
                this.changeTab(4)
                changeContentTab(4)
              }}
            />
          )}
          {isAdmin && (
            <Button
              title={`Reported Users ${reportedUser ? `(${reportedUser})` : '(0)'}`}
              active={activeTab == 6}
              onClick={() => {
                this.changeTab(5)
                changeContentTab(5)
              }}
            />
          )}
          <Button
            title='Settings'
            active={activeTab == 6}
            onClick={() => {
              this.changeTab(6)
              changeContentTab(6)
            }}
          />
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

export default connect(mapStateToProps)(Menu)
