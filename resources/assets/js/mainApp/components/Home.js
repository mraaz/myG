import React, { Component } from 'react'
import ComposeSection from './ComposeSection'
import Posts from './Posts'
import AnalyticsBox from './AnalyticsBox'
import { Link } from 'react-router-dom'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      name: 'Raaz',
      initialData: undefined,
      tabName: 'home',
    }
  }
  componentDidMount() {
    this.setState({
      initialData: this.props.initialData,
    })
  }

  tabToggle = (tabName) => {
    this.setState({
      tabName: tabName,
    })
  }

  render() {
    const { tabName, initialData } = this.state
    if (initialData) {
      return (
        <div className='content-area'>
          <AnalyticsBox />
          <ComposeSection initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData} />
          <div className='links'>
            <div className={`${tabName == 'home' ? 'active' : ''}`} onClick={(e) => this.tabToggle('home')}>
              Home
            </div>
            <div className={`${tabName == 'communities' ? 'active' : ''}`} onClick={(e) => this.tabToggle('communities')}>
              Communities
            </div>
            <div className={`${tabName == 'notifications' ? 'active' : ''}`} onClick={(e) => this.tabToggle('notifications')}>
              Notifications
            </div>
            <div className={`${tabName == 'mygames' ? 'active' : ''}`} onClick={(e) => this.tabToggle('mygames')}>
              My Games
            </div>
            <div className={`${tabName == 'myposts' ? 'active' : ''}`} onClick={(e) => this.tabToggle('myposts')}>
              My Posts
            </div>
          </div>
          {tabName == 'home' && <Posts initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData} />}
          {tabName == 'communities' && <h1>communities</h1>}
          {tabName == 'notifications' && <h1>notifications</h1>}
          {tabName == 'mygames' && <h1>mygames</h1>}
          {tabName == 'myposts' && <h1>myposts</h1>}
        </div>
      )
    } else {
      return <div className='content-area'>Loading</div>
    }
  }
}
