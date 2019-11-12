import React, { Component } from "react"
import Select from 'react-select'
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom"
import axios from "axios"

export default class IndividualGamingExperience extends Component {
  constructor() {
    super()
    this.state = {
      myPage: false,
      showCommends: true
    }
  }

  componentWillMount(){
    const {match} = this.props.routeProps
    const {initialData} = this.props
    let {item} = this.props
    const self = this

    if (initialData != 'loading'){
      if (initialData.userInfo.id == match.params.id){
        this.setState({myPage: true, showCommends: false})
      }
    }

    const getCommend = async function(){
      try{
        const getCommend = await axios.get(`/api/commendations/user/${item.id}`)
        if (getCommend.data.getCommend[0].no_of_commends != 0){
          self.setState({showCommends: false})
        }

      } catch(error){
        console.log(error)
      }
    }
    getCommend()
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

  commend_me = async (id) => {
    this.setState({showCommends:false})
    try{
      var commendTitle = ""
      const getCommend = await axios.get(`/api/commendations/${id}`)
      if (getCommend.data.getAllCommend[0].no_of_commends < 49){
        commendTitle = "Apprentice"
      } else if (getCommend.data.getAllCommend[0].no_of_commends < 99) {
        commendTitle = "Elite"
      } else if (getCommend.data.getAllCommend[0].no_of_commends < 149) {
        commendTitle = "Expert"
      } else if (getCommend.data.getAllCommend[0].no_of_commends < 199) {
        commendTitle = "Hero"
      } else if (getCommend.data.getAllCommend[0].no_of_commends < 249) {
        commendTitle = "Master"
      } else if (getCommend.data.getAllCommend[0].no_of_commends < 999) {
        commendTitle = "Grand Master"
      } else if (getCommend.data.getAllCommend[0].no_of_commends > 1000) {
        commendTitle = "Pro"
      }

      const addCommend = axios.post('/api/commendations',{
        game_experiences_id: id,
      })

      const getCommendTitle = await axios.get(`/api/GameExperiences/exp/${id}`)
      var oldTitle = ""
      oldTitle = getCommendTitle.data.myGameExperience[0].commendation

      if (oldTitle != commendTitle){
        const addCommendTitle = axios.post(`/api/GameExperiences/commend/${id}`,{
          commendation: commendTitle,
        })
      }

    } catch(error){
      console.log(error)
    }
  }

  find_tag(tag){
    window.location.href = `/advancedSearch/${tag}/Gaming Experience`
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
    window.location.href = `/profile/${match.params.id}/edit/gamingexp/${id}`
  }


  render() {
    let {item, rowLen, row} = this.props
    var show_lines = true

    var {id, game_name, experience, status, comments, played, commendation, link, tags, ratings } = item
    var arrTags = ""
    var show_tags = false
    var show_link = false
    var show_comments = false
    var show_ratings = false
    var played_converted = "Less than 1 year"

    if ( (tags != null) && (tags != "") ) {
      arrTags = tags.split(',')
      show_tags= true
    }

    if ( (link != null) && (link != "") ) {
      show_link= true
    }

    if ( (comments != null) && (comments != "") ) {
      show_comments= true
    }

    if ( (ratings != 0) && (ratings != "") ) {
      show_ratings= true
    }

    if (experience == null) {
      experience = ""
    }

    switch(played) {
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
        {show_ratings && <div className="game-rating">
          {this.showRating(ratings)}
        </div>}
        <div className="game-stuff">
          <i className="fas fa-gamepad"></i>&nbsp;{`${experience}`}, {`${played_converted}`}
        </div>
        <div className="game-status">
          <i className="fab fa-d-and-d"></i>&nbsp;{`${status}`}
        </div>
        <div className="game-commendation">
          <i className="fas fa-dragon"></i>&nbsp;{`${commendation}`}&nbsp;
          {this.state.showCommends && <div className="commendation">
            <button className="commend" type="button" onClick={() => { if (window.confirm('Commend allows you to reward positive behaviour or recongise great skill')) this.commend_me(id) } }>Commend!</button>
          </div>}
        </div>
        {show_comments && <div className="game-comments">
            <i className="fas fa-trophy"></i>&nbsp;{`${comments}`}
          </div>
        }
        {show_link && <div className="game-misc">
            <i className="fas fa-broadcast-tower"></i>&nbsp;Link:{`${link}`}
          </div>
        }
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
