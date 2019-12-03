import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { withRouter, Link } from 'react-router-dom'

class LeftMenu extends Component {
  constructor() {
    super()
    this.state = {
      dropdown: false,
      show_top_btn: false,
    }
  }
  clickedDropdown = () => {
    this.setState({
      dropdown: !this.state.dropdown,
    })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)

    window.onscroll = (event) => {
      if (window.pageYOffset < 1) {
        this.setState({
          show_top_btn: false,
        })
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    window.onscroll = null
  }

  handleScroll = (event) => {
    let scrollTop = event.srcElement.body.scrollTop,
      itemTranslate = Math.min(0, scrollTop / 3 - 60)

    this.setState({
      show_top_btn: true,
    })
  }

  moveTop = () => {
    window.scrollTo(0, 0)
  }

  redirect_groups = () => {
    this.props.history.push('/groups')
  }
  redirect_feed = () => {
    this.props.history.push('/')
  }
  redirect_games = () => {
    this.props.history.push('/myScheduledGames')
  }
  redirect_friends = () => {
    this.props.history.push('/myFriends')
  }
  redirect_myPosts = () => {
    this.props.history.push('/myPosts')
  }

  render() {
    var left_icon = 'https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v1_Logo.png'
    if (this.props.initialData.userInfo == undefined) {
      return <div>Loading</div>
    } else {
      const { first_name, last_name, id } = this.props.initialData.userInfo
      return (
        <section id='left-menu'>
          <div className='account-dropdown'>
            <div className='logo' onClick={this.redirect}>
              <div
                className='logo-img'
                style={{
                  backgroundImage: `url('${left_icon}')`,
                }}></div>
            </div>
            <div className='name' onClick={this.clickedDropdown}>
              {`${first_name} ${last_name}`}
            </div>
            <div className='icon' onClick={this.clickedDropdown}>
              <i className='fas fa-chevron-down' />
            </div>

            <div className={`dropdown ${this.state.dropdown ? 'active' : ''}`}>
              <nav>
                <a href='/mySettings'>mySettings</a>
                <a href='/logout'>Logout</a>
              </nav>
            </div>
          </div>
          <div className='groups'>
            <div className='menu'>
              <Link to='/addScheduleGames'>
                <div
                  className='add-ScheduleGames'
                  style={{ backgroundImage: `url('https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v1_Icon_01.png')` }}></div>
              </Link>
              <Link to='/scheduledGames'>
                <div
                  className='view-ScheduleGames'
                  style={{ backgroundImage: `url('https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v1_Icon_02.png')` }}></div>
              </Link>
              <div className='add-ScheduleGames-caption'>
                <Link to='/addScheduleGames' style={{ textDecoration: 'none', color: 'white' }}>
                  Add Game
                </Link>
              </div>
              <div className='view-ScheduleGames-caption'>
                <Link to='/scheduledGames' style={{ textDecoration: 'none', color: 'white' }}>
                  View Game
                </Link>
              </div>
              <Link to='/advancedSearch'>
                <div
                  className='advancedSearch'
                  style={{ backgroundImage: `url('https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v1_Icon_03.png')` }}></div>
              </Link>
              <Link to={`/profile/${this.props.initialData.userInfo.id}`}>
                <div
                  className='profile'
                  style={{ backgroundImage: `url('https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v2_Icon-11.png')` }}></div>
              </Link>
              <div className='advancedSearch-caption'>
                <Link to='/advancedSearch' style={{ textDecoration: 'none', color: 'white' }}>
                  Search
                </Link>
              </div>
              <div className='groups-caption'>
                <Link to={`/profile/${this.props.initialData.userInfo.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                  Profile
                </Link>
              </div>
            </div>
          </div>
          <div className='myMenu'>
            <div className='title'>Menu</div>
            <div id='item-list'>
              <div className='icon-list'>
                <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v1_Icon_05.png' />
              </div>
              <div className='text-list' onClick={this.redirect_feed}>
                Feed
              </div>
            </div>
            <div id='item-list'>
              <div className='icon-list'>
                <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v2_Icon-10.png' />
              </div>
              <div className='text-list' onClick={this.redirect_groups}>
                Groups
              </div>
            </div>
            <div id='item-list'>
              <div className='icon-list'>
                <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v1_Icon_07.png' />
              </div>
              <div className='text-list' onClick={this.redirect_games}>
                Games
              </div>
            </div>
            <div id='item-list'>
              <div className='icon-list'>
                <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v1_Icon_08.png' />
              </div>
              <div className='text-list' onClick={this.redirect_friends}>
                Friends
              </div>
            </div>
            <div id='item-list'>
              <div className='icon-list'>
                <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v1_Icon_05.png' />
              </div>
              <div className='text-list' onClick={this.redirect_myPosts}>
                myPosts
              </div>
            </div>
          </div>
          {this.state.show_top_btn && (
            <div className='top-btn'>
              <button className='top' type='button' onClick={this.moveTop}>
                Top
              </button>
            </div>
          )}
        </section>
      )
    }
  }
}

const app = document.getElementById('app')
export default withRouter(LeftMenu)
