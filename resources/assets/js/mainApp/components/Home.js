/*
 * Author : nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component } from 'react'
import Posts from './Posts'
import Notifications from './Notifications'
import AnalyticsBox from './AnalyticsBox'
import GroupMain from './Community/GroupMain'
import MyScheduledGames from '../components/scheduledGames/MyScheduledGames'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      name: 'Raaz',
      initialData: undefined,
      tabName: 'home',
    }
    this.navRef = React.createRef()
    this.lastScrollY = 0
  }

  componentDidMount() {
    document.title = 'myG - Home'
    this.setState({
      initialData: this.props.initialData,
    })
    let params = new URLSearchParams(window.location.search)
    const activeTab = params.get('at')
    this.setState({
      tabName: activeTab ? activeTab : 'home',
    })
    window.addEventListener('scroll', this.stickNavigationBar)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.stickNavigationBar)
  }

  stickNavigationBar = () => {
    this.lastScrollY = window.scrollY
    window.requestAnimationFrame(() => {
      if (!this.navRef.current || !this.navRef.current.style) return;
      this.navRef.current.removeAttribute('style')
      if (this.lastScrollY > 200) {
        this.navRef.current.style.top = '0'
        this.navRef.current.style.position = 'fixed'
        this.navRef.current.style.zIndex = '1001'
        this.navRef.current.style.padding = '10px'
        this.navRef.current.style.height = '60px'
        this.navRef.current.style.margin = '0 auto'
        this.navRef.current.style.paddingBottom = 0
        this.navRef.current.style.width = window.innerWidth < 1198 ? '100%' : '72%'
      }
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
        <div className='content-area' ref={this.contentAreaRef}>
          <AnalyticsBox />
          <div className='links' ref={this.navRef}>
            <div className={`${tabName == 'home' ? 'active' : 'home'}`} onClick={(e) => this.tabToggle('home')}>
              Home
            </div>
            <div className={`${tabName == 'communities' ? 'active' : 'communities'}`} onClick={(e) => this.tabToggle('communities')}>
              Communities
            </div>
            <div className={`${tabName == 'notifications' ? 'active' : 'notifications'}`} onClick={(e) => this.tabToggle('notifications')}>
              Notifications
            </div>
            <div className={`${tabName == 'mygames' ? 'active' : 'mygames'}`} onClick={(e) => this.tabToggle('mygames')}>
              My Games
            </div>
          </div>
          {tabName == 'home' && <Posts initialData={!this.props.initialData ? 'loading' : this.props.initialData} key={Math.random()} />}
          {tabName == 'communities' && <GroupMain routeProps={this.props} initialData={this.props.initialData} key={Math.random()} />}
          {tabName == 'notifications' && <Notifications routeProps={this.props} initialData={this.props.initialData} key={Math.random()} />}
          {tabName == 'mygames' && <MyScheduledGames routeProps={this.props} initialData={this.props.initialData} key={Math.random()} />}
        </div>
      )
    } else {
      return <div className='content-area'>Loading</div>
    }
  }
}
