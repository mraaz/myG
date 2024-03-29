/*
 * Author : Nitin Tyagi
 * Github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component } from 'react'

export default class TobTabs extends Component {
  constructor() {
    super()

    this.state = {
      activeTab: 0
    }
  }

  isActive = (tab) => {
    return this.state.activeTab == tab ? ' active' : ''
  }

  changeActiveTab = (tab) => {
    this.setState(
      {
        activeTab: tab
      },
      () => {
        if (this.props.changeTab) {
          this.props.changeTab(tab)
        }
      }
    )
  }

  render() {
    const { tabs } = this.props

    return (
      <div className='top-tabs'>
        {tabs.map((tab, index) => {
          return (
            <button className={'tab-button' + this.isActive(index)} key={tab + index} onClick={() => this.changeActiveTab(index)}>
              {tab}
            </button>
          )
        })}
      </div>
    )
  }
}
