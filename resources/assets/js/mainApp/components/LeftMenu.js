import React, { Component } from "react"
import ReactDOM from "react-dom"
import {
  Redirect,
  Link
} from "react-router-dom"

export default class LeftMenu extends Component {
  constructor() {
    super();
    this.state = {
      dropdown: false,
      show_top_btn: false,
      redirect_addScheduleGames: false
    }
  }
  clickedDropdown = () => {
    this.setState({
      dropdown: !this.state.dropdown
    })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)

    window.onscroll = (event) => {
      if(window.pageYOffset < 1) {
        this.setState({
          show_top_btn: false
        })
      }
    }
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
    window.onscroll = null;
  }

  handleScroll = (event) => {
      let scrollTop = event.srcElement.body.scrollTop,
          itemTranslate = Math.min(0, scrollTop/3 - 60);

      this.setState({
        show_top_btn: true
      })
  }

  moveTop = () => {
    window.scrollTo(0, 0)
  }
  redirect = () => {
    window.location.href = "/"
  }

  redirect_addScheduleGames = () => {
    window.location.href = "/addScheduleGames"
    //this.setState({redirect_addScheduleGames: true})
    // <div className="add-ScheduleGames-caption">
    //   <Link to="/addScheduleGames" className="link" style={{ textDecoration: 'none', color: 'white' }}>
    //     Add Games
    //   </Link>
    // </div>
  }
  redirect_viewScheduleGames = () => {
    window.location.href = "/scheduledGames"
  }
  redirect_advancedSearch = () => {
    window.location.href = "/advancedSearch"
  }
  redirect_groups = () => {
    window.location.href = "/groups"
  }
  redirect_feed = () => {
    window.location.href = "/"
  }
  redirect_profile = () => {
    window.location.href = "/profile/" + this.props.initialData.userInfo.id
  }
  redirect_games = () => {
    window.location.href = "/myScheduledGames"
  }
  redirect_friends = () => {
    window.location.href = "/myFriends"
  }
  redirect_myPosts = () => {
    window.location.href = "/myPosts"
  }

  render() {
    if (this.state.redirect_addScheduleGames === true) {
      return <Redirect push to='/addScheduleGames' />
    }
    var left_icon ='https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v1_Logo.png'
    if(this.props.initialData.userInfo == undefined){
      return(<div>Loading</div>)
    } else {
      const {first_name, last_name, id} = this.props.initialData.userInfo
      return (
        <section id="left-menu">
          <div className="account-dropdown">
            <div className="logo" onClick={this.redirect}>
              <div className="logo-img" style={{
                backgroundImage: `url('${left_icon}')`
                }}>
              </div>
            </div>
            <div className="name" onClick={this.clickedDropdown}>
              {`${first_name} ${last_name}`}
            </div>
            <div className="icon" onClick={this.clickedDropdown}>
              <i className="fas fa-chevron-down" />
            </div>

            <div className={`dropdown ${this.state.dropdown ? 'active' : ''}`}>
              <nav>
                <a href="/mySettings">mySettings</a>
                <a href="/logout">Logout</a>
              </nav>
            </div>
          </div>
          <div className="groups">
            <div className="menu">
              <div className="add-ScheduleGames" onClick={this.redirect_addScheduleGames} style={{
                backgroundImage: `url('https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v1_Icon_01.png')`
                }}>
              </div>
              <div className="view-ScheduleGames" onClick={this.redirect_viewScheduleGames} style={{
                backgroundImage: `url('https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v1_Icon_02.png')`
                }}>
              </div>
              <div className="add-ScheduleGames-caption" onClick={this.redirect_addScheduleGames}>
                Add Game
              </div>
              <div className="view-ScheduleGames-caption" onClick={this.redirect_viewScheduleGames}>
                View Games
              </div>
              <div className="advancedSearch" onClick={this.redirect_advancedSearch} style={{
                backgroundImage: `url('https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v1_Icon_03.png')`
                }}>
              </div>
              <div className="groups" onClick={this.redirect_profile} style={{
                backgroundImage: `url('https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v2_Icon-11.png')`
                }}>
              </div>
              <div className="advancedSearch-caption" onClick={this.redirect_advancedSearch}>
                Search
              </div>
              <div className="groups-caption" onClick={this.redirect_profile}>
                Profile
              </div>
            </div>
          </div>
            <div className="myMenu">
              <div className="title">Menu</div>
              <div id="item-list">
                <div className="icon-list">
                  <img src="https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v1_Icon_05.png" />
                </div>
                <div className="text-list" onClick={this.redirect_feed}>
                  Feed
                </div>
                </div>
              <div id="item-list">
                <div className="icon-list">
                  <img src="https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v2_Icon-10.png" />
                </div>
                <div className="text-list" onClick={this.redirect_groups}>
                  Groups
                </div>
              </div>
              <div id="item-list">
                <div className="icon-list">
                  <img src="https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v1_Icon_07.png" />
                </div>
                <div className="text-list" onClick={this.redirect_games}>
                  Games
                </div>
              </div>
              <div id="item-list">
                <div className="icon-list">
                  <img src="https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v1_Icon_08.png" />
                </div>
                <div className="text-list" onClick={this.redirect_friends}>
                  Friends
                </div>
              </div>
              <div id="item-list">
                <div className="icon-list">
                  <img src="https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/v1_Icon_05.png" />
                </div>
                <div className="text-list" onClick={this.redirect_myPosts}>
                  myPosts
                </div>
              </div>
            </div>
          {this.state.show_top_btn && <div className="top-btn">
            <button className="top" type="button" onClick={this.moveTop}>Top</button>
          </div>}
        </section>
      )
    }
  }
}

const app = document.getElementById("app")
