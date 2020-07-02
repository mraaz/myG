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
import AnalyticsBox from './AnalyticsBox'
import GroupMain from './GroupMain'
import { Link } from 'react-router-dom'
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
    this.contentAreaRef = React.createRef()
    window.addEventListener('scroll', this.handleScroll, true)
    this.lastScrollY = 0
  }

  componentDidMount() {
    this.setState({
      initialData: this.props.initialData,
    })
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    this.lastScrollY = window.scrollY
    const offsetWidth = this.contentAreaRef.current.offsetWidth
    window.requestAnimationFrame(() => {
      if (this.lastScrollY > 300) {
        this.navRef.current.style.top = '0px'
        this.navRef.current.style.position = 'fixed'
        this.navRef.current.style.zIndex = '1001'

        if (offsetWidth < 1200) {
          this.navRef.current.style.width = '72%'
          this.navRef.current.style.height = '60px'
          this.navRef.current.style.padding = '10px'
          this.navRef.current.style.paddingBottom = 0
          this.navRef.current.style.margin = '0 auto'
        } else {
          this.navRef.current.style.width = '74%'
          this.navRef.current.style.height = '60px'
          this.navRef.current.style.padding = '10px'
          this.navRef.current.style.paddingBottom = 0
          this.navRef.current.style.margin = '0 auto'
        }
      } else {
        this.navRef.current.removeAttribute('style')
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
        <div className='content-area' ref={this.contentAreaRef} style={{ height: '100vh', overflow: 'scroll' }}>
          <AnalyticsBox />
          {/* <ComposeSection initialData={this.state.initialData == undefined ? 'loading' : this.state.initialData} /> */}
          <div className='links' ref={this.navRef}>
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
