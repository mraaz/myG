import React, { Component } from "react"
import Select from 'react-select'
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom"
import axios from "axios"
import moment from "moment"

export default class AdvancedSearchPost extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  showRating = (rating) => {
  if(rating !== undefined){
    switch(rating) {
      case 0:
        return(
          <div className="stars">
            <i className="far fa-star"></i>
            <i className="far fa-star"></i>
            <i className="far fa-star"></i>
            <i className="far fa-star"></i>
            <i className="far fa-star"></i>
          </div>
        )
      case 1:
        return(
          <div className="stars">
            <i className="fas fa-star"></i>
            <i className="far fa-star"></i>
            <i className="far fa-star"></i>
            <i className="far fa-star"></i>
            <i className="far fa-star"></i>
          </div>
        )
      case 2:
        return(
          <div className="stars">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="far fa-star"></i>
            <i className="far fa-star"></i>
            <i className="far fa-star"></i>
          </div>
        )
      case 3:
        return(
          <div className="stars">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="far fa-star"></i>
            <i className="far fa-star"></i>
          </div>
        )
        break
      case 4:
        return(
          <div className="stars">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="far fa-star"></i>
          </div>
        )
        break
      case 5:
        return(
          <div className="stars">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </div>
        )
        break
      default:
        return(
          <div className="stars">
            <i className="far fa-star"></i>
            <i className="far fa-star"></i>
            <i className="far fa-star"></i>
            <i className="far fa-star"></i>
            <i className="far fa-star"></i>
          </div>
        )
        break
      }
    }
  }

  showAllTags = (arrTags) => {
    if(arrTags !== undefined){
      return arrTags.map((tag, index) => {
        const calcIndex = index % 4;
        switch(calcIndex) {
          case 0:
            return(
              <div className="tag" key={index}>
                <button className="btn-green">{tag}</button>&nbsp;
              </div>
            )
            break
          case 1:
            return(
              <div className="tag" key={index}>
                <button className="btn-blue">{tag}</button>&nbsp;
              </div>
            )
            break
          case 2:
            return(
              <div className="tag" key={index}>
                <button className="btn-red">{tag}</button>&nbsp;
              </div>
            )
            break
          case 3:
            return(
              <div className="tag" key={index}>
                <button className="btn-yellow">{tag}</button>&nbsp;
              </div>
            )
            break
          default:
            return(
              <div className="tag" key={index}>
                <button className="btn-green">{tag}</button>&nbsp;
              </div>
            )
            break
        }
      })
    }
  }

  render() {
    const { game_experience } = this.props
    var show_profile_img = false
    var arrTags = ""

    if(this.props.table){
      var experience = false
      var status = false
      var ratings = false
      var tags = false
      var commendation = false
      var played_converted = "Less than 1 year"

      if (game_experience.played != "" && game_experience.played != null){
        switch(game_experience.played) {
          case 1:
            played_converted = "Less than 1 year"
            break;
          case 2:
            played_converted = "Less than 2 years"
            break;
          case 3:
            played_converted = "Less than 3 years"
            break;
          case 4:
            played_converted = "Less than 4 years"
            break;
          case 5:
            played_converted = "Less than 5 years"
            break;
          case 42:
            played_converted = "More than 5 years"
            break;
          default:
            played_converted = "Less than 1 year"
        }
      }
      if (game_experience.experience == "" || game_experience.experience == null){
        game_experience.experience = ""
      }
      if (game_experience.status != "" && game_experience.status != null){
        status = true
      }
      if (game_experience.ratings != "" && game_experience.ratings != null){
        ratings = true
      }
      if (game_experience.commendation != "" && game_experience.commendation != null){
        commendation = true
      }
      if (game_experience.tags != "" && game_experience.tags != null){
        tags = true
        arrTags = game_experience.tags.split(',')
      }
    } else {
      var show_team_name = false
      var show_tags = false
      var duration_converted = "Less than 3 months"

      if ( (game_experience.team_name != null) && (game_experience.team_name != "") ) {
        show_team_name= true
      }

      if ( (game_experience.skills != null) && (game_experience.skills != "") ) {
        arrTags = game_experience.skills.split(',')
        show_tags= true
      }

      switch(game_experience.duration) {
        case 1:
          duration_converted = "Less than 3 months"
          break;
        case 2:
          duration_converted = "Less than 6 months"
          break;
        case 3:
          duration_converted = "Less than 1 year"
          break;
        case 4:
          duration_converted = "Less than 2 years"
          break;
        case 5:
          duration_converted = "Less than 3 years"
          break;
        case 42:
          duration_converted = "3+ years"
          break;
        default:
          duration_converted = "Less than 3 months"
      }

    }

    if (game_experience.profile_img != null){
      show_profile_img = true
    }

    return (<div className="gamesPosts">
      <div className="padding-container">
        <div className="grey-container">
          {this.props.table && <div className="update-info">
            <div className="author-info">
              {show_profile_img && <a href={`/profile/${game_experience.user_id}`} className="user-img" style={{
                backgroundImage: `url('${game_experience.profile_img}')`
              }}/>}
              {!show_profile_img && <a href={`/profile/${game_experience.user_id}`} className="user-img" style={{
                backgroundImage: `url('https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png')`
              }}/>}
              <div className="info">
                <a href={`/profile/${game_experience.user_id}`}>{game_experience.alias}</a>
              </div>
            </div>
            <div className="game-name"> {game_experience.game_name} </div>
            {ratings && <div className="game-rating"> {this.showRating(game_experience.ratings)} </div>}
            {status && <div className="game-status"> <i className="fab fa-d-and-d"></i>&nbsp;{game_experience.status} </div>}
            <div className="game-stuff"> <i className="fas fa-gamepad"></i>&nbsp;{`${played_converted}`}, {`${game_experience.experience}`} </div>
            {commendation && <div className="game-commendation"> <i className="fas fa-dragon"></i>&nbsp;{`${game_experience.commendation}`}&nbsp; </div>}
            {tags && <div className="tags"> {this.showAllTags(arrTags)} </div>}
          </div>}
          {!this.props.table && <div className="update-info">
            <div className="author-info">
              {show_profile_img && <a href={`/profile/${game_experience.user_id}`} className="user-img" style={{
                backgroundImage: `url('${game_experience.profile_img}')`
              }}/>}
              {!show_profile_img && <a href={`/profile/${game_experience.user_id}`} className="user-img" style={{
                backgroundImage: `url('https://s3-ap-southeast-2.amazonaws.com/mygame-media/default_user/new-user-profile-picture.png')`
              }}/>}
              <div className="info">
                <a href={`/profile/${game_experience.user_id}`}>{game_experience.alias}</a>
              </div>
            </div>
            <div className="game-name"> {game_experience.game_name} </div>
            <div className="role-title"> <i className="fas fa-angle-double-down"></i>&nbsp; {game_experience.role_title}</div>
            {show_team_name && <div className="team-name">
              <i className="fas fa-users"></i>&nbsp; {game_experience.team_name}
            </div>}
            <div className="game-stuff">
              <i className="fas fa-gamepad"></i>&nbsp; {`${duration_converted}`}
            </div>
            {show_tags && <div className="tags"> {this.showAllTags(arrTags)} </div>}
          </div>}
        </div>
      </div>
    </div>)
  }
}
