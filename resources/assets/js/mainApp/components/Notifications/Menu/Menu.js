import React, { Component } from 'react'
import Button from './Button'

export default class Menu extends Component {
  constructor() {
    super()

    this.state = {
      active: 0,
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

    return (
      <div className='notifications-menu'>
        <div className='button-list'>
          <Button
            title={`Upcoming Games  ${activeTab == 0 ? `(${notificationsCount})` : ''}`}
            active={activeTab == 0}
            onClick={() => {
              this.changeTab(0)
              changeContentTab(0)
            }}
          />
          <Button
            title={`Approvals  ${activeTab == 1 ? `(${notificationsCount})` : ''}`}
            active={activeTab == 1}
            onClick={() => {
              this.changeTab(1)
              changeContentTab(1)
            }}
          />
          <Button
            title={`Alerts  ${activeTab == 2 ? `(${notificationsCount})` : ''}`}
            active={activeTab == 2}
            onClick={() => {
              this.changeTab(2)
              changeContentTab(2)
            }}
          />
          <Button
            title={`Chat  ${activeTab == 3 ? `(${notificationsCount})` : ''}`}
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
