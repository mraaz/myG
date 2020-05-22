/*
 * Author : nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component } from 'react'
// import ComposeSection from './ComposeSection'
import ComposeSection from './ComposeSection_v2'
import Posts from './Posts'
import Notifications from './Notifications'
import MyPosts from './MyPosts'
import MyScheduledGames from './MyScheduledGames'
import AnalyticsBox from './AnalyticsBox'
import GroupMain from './GroupMain'
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
          {/* <ComposeSection initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData} /> */}
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
          {tabName == 'home' && <Posts initialData={this.props.initialData == undefined ? 'loading' : this.props.initialData} />}
          {tabName == 'communities' && <GroupMain routeProps={this.props} initialData={this.props.initialData} key={Math.random()} />}
          {tabName == 'notifications' && <Notifications routeProps={this.props} initialData={this.props.initialData} key={Math.random()} />}
          {tabName == 'mygames' && <MyScheduledGames routeProps={this.props} initialData={this.props.initialData} key={Math.random()} />}
          {tabName == 'myposts' && <MyPosts routeProps={this.props} initialData={this.props.initialData} key={Math.random()} />}
        </div>
      )
    } else {
      return <div className='content-area'>Loading</div>
    }
  }
}
