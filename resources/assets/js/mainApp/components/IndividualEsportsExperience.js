import React, { Component } from "react"
import Select from 'react-select'
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom"
import axios from "axios"

export default class IndividualEsportsExperience extends Component {
  constructor() {
    super()
    this.state = {
      myPage: false,
    }
  }

  componentWillMount(){
    const {match} = this.props.routeProps
    const {initialData} = this.props


    if (initialData != 'loading'){
      if (initialData.userInfo.id == match.params.id){
        this.setState({myPage: true})
      }
    }
  }

  find_tag(tag){
    window.location.href = `/advancedSearch/${tag}/Esports Experience`
  }


  showAllTags = (arrTags) => {
    if(arrTags !== undefined){
      return arrTags.map((tag, index) => {
        const calcIndex = index % 4;
        switch(calcIndex) {
          case 0:
            return(
              <div className="tag" key={index}>
                <button className="btn-green" onClick={() => this.find_tag(tag)}>{tag}</button>&nbsp;
              </div>
            )
            break
          case 1:
            return(
              <div className="tag" key={index}>
                <button className="btn-blue" onClick={() => this.find_tag(tag)}>{tag}</button>&nbsp;
              </div>
            )
            break
          case 2:
            return(
              <div className="tag" key={index}>
                <button className="btn-red" onClick={() => this.find_tag(tag)}>{tag}</button>&nbsp;
              </div>
            )
            break
          case 3:
            return(
              <div className="tag" key={index}>
                <button className="btn-yellow" onClick={() => this.find_tag(tag)}>{tag}</button>&nbsp;
              </div>
            )
            break
          default:
            return(
              <div className="tag" key={index}>
                <button className="btn-green" onClick={() => this.find_tag(tag)}>{tag}</button>&nbsp;
              </div>
            )
            break
        }
      })
    }
  }

  edit_lnk = (id) => {
    const {match} = self.props.routeProps
    window.location.href = `/profile/${match.params.id}/edit/esportsExp/${id}`
  }


  render() {
    let {item, rowLen, row} = this.props
    var show_lines = true

    const {id, achievements, duration, game_name, role_title, skills, team_name } = item

    var arrTags = ""
    var show_team_name = false
    var show_achievements = false
    var show_tags = false
    var duration_converted = "Less than 3 months"
    var show_fix = false


    if ( (achievements != null) && (achievements != "") ) {
      show_achievements= true
    }

    if ( (team_name != null) && (team_name != "") ) {
      show_team_name= true
    }

    if ( (skills != null) && (skills != "") ) {
      arrTags = skills.split(',')
      show_tags= true
    }
    if (show_tags == false && show_team_name == true && show_achievements == false){
      show_fix = true
    }

    switch(duration) {
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

    if (rowLen === row + 1) {
      show_lines = false
    }
    return (
      <div className="game-info">
        <div className="game-name">
          {`${game_name}`}
        </div>
        <div className="game-infos">
          {this.state.myPage && <i className="fas fa-pen" onClick={() => this.edit_lnk(id)}></i>}
        </div>
        <div className="role-title">
          <i className="fas fa-angle-double-down"></i>&nbsp; {`${role_title}`}
        </div>
        {show_team_name && <div className="team-name">
          <i className="fas fa-users"></i>&nbsp; {`${team_name}`}
        </div>}
        <div className="game-stuff">
          <i className="fas fa-gamepad"></i>&nbsp; {`${duration_converted}`}
        </div>
        {show_achievements && <div className="game-comments">
          <i className="fas fa-trophy"></i>&nbsp;{`${achievements}`}
        </div>}
        {show_fix && <div className="game-comments">
        </div>}
        {show_tags && <div className="tags">
            {this.showAllTags(arrTags)}
          </div>
        }
        {show_lines && <div className="line-break">
          <hr />
        </div>}
        {show_lines && <div className="line-break2">
          <hr />
        </div>}
      </div>
    )
  }
}
