import React, { Component } from "react"
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom"
import axios from "axios"
import IndividualGamingExperience from "./IndividualGamingExperience"
import IndividualEsportsExperience from "./IndividualEsportsExperience"
import FileOpenModal from './FileOpenModal'

export default class Profile extends Component {

  constructor() {
    super()
    self = this
    this.state = {
      collapse: true,
      collapseesports: true,
      friendStatus: 0, //0: Not friend, 1: Friends, 2:Friend request pending,
      friendTxt: "",
      myPage: false,
      bFileModalOpen: false,
      profile_attr: '',
      show_bio: false
    }

    this.callbackFileModalClose = this.callbackFileModalClose.bind(this);
    this.callbackFileModalConfirm = this.callbackFileModalConfirm.bind(this);

    this.clickUpdateProfile = this.clickUpdateProfile.bind(this);
    this.clickUpdateProfileBack = this.clickUpdateProfileBack.bind(this);

  }

  callbackFileModalClose(){
    this.setState({
      bFileModalOpen: false,
      profile_attr: ''
    })
  }

  callbackFileModalConfirm(src){
    var profile = this.state.userProfile;
    if(profile.hasOwnProperty(this.state.profile_attr)){
      profile[this.state.profile_attr] = src;
    }

    this.setState({
      bFileModalOpen: false,
      profile: profile
    })

    //update user profile image

    if(this.state.profile_attr != ''){
      var data = {};
      data[this.state.profile_attr] = src;

      var url = '/api/userprofile';
      if(this.state.profile_attr == 'profile_bg'){
        url = '/api/userprofilebg';
      }
      axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(resp){


      }).catch(error => {
        // handle your error
      });
    }

  }

  clickUpdateProfileBack(){
    this.setState({
      bFileModalOpen: true,
      profile_attr: 'profile_bg'
    })
  }

  clickUpdateProfile(){
    this.setState({
      bFileModalOpen: true,
      profile_attr: 'profile_img'
    })
  }

  componentWillMount(){
    const {match} = this.props.routeProps
    const {initialData} = this.props

    if (initialData != 'loading'){
      if (initialData.userInfo.id == match.params.id){
        this.setState({myPage: true})
      }
    }
    const getUser = async function(){
      try{
        const userProfile = await axios.get(`/api/user/${match.params.id}`)
        self.setState({
          initialData: self.props.initialData,
          userProfile: userProfile.data.user[0],
          })
        if(userProfile.data.friend){
          self.setState({
            friendTxt: "Remove Friend",
            friendStatus: 1
            })
        } else {
          const checkFriend = await axios.get(`/api/notifications/friend/${match.params.id}`)
          if(checkFriend.data.checkedFriend){
            self.setState({
              friendTxt: "Request Pending",
              friendStatus: 2
              })
          }else{
            self.setState({
              friendTxt: "Add Friend",
              friendStatus: 0
              })
          }
        }
      } catch(error){
        console.log(error)
      }
    }
    const getGameExperiences = async function(){
      try{
        const gameExperience = await axios.get(`/api/GameExperiences/${match.params.id}`)
        self.setState({
          gameData: gameExperience.data
          })
      } catch(error){
        console.log(error)
      }
    }

    const getEsportsExperiences = async function(){
      try{
        const esportsExperience = await axios.get(`/api/esports_experiences/${match.params.id}`)
        self.setState({
          esportsExpData: esportsExperience.data
          })
      } catch(error){
        console.log(error)
      }
    }

    const getEsportsBio = async function(){
      try{
        const esportsBio = await axios.get(`/api/esports_bio/show_bio/${match.params.id}`)
        self.setState({
          esportsBioData: esportsBio.data
          })
          if (esportsBio.data.myProfile.length != 0){
            if (esportsBio.data.myProfile[0].games_of_ardour != ""){
              self.setState({
                show_bio: true
                })
            } else if ( (esportsBio.data.myProfile[0].career_highlights != "") && (esportsBio.data.myProfile[0].career_highlights != null) ) {
              self.setState({
                show_bio: true
                })
            }
          }
      } catch(error){
        console.log(error)
      }
    }

    getUser()
    getGameExperiences()
    getEsportsExperiences()
    getEsportsBio()
  }

  addFriend = async () => {
    const {match} = this.props.routeProps
    const self = this

    if(this.state.friendStatus === 2){
      return
    }
    if(this.state.friendStatus){
      if (window.confirm('Are you sure you wish to unfriend?')){
        try{
          const userProfile = await axios.get(`/api/user/${match.params.id}/unfriend`)
          self.setState({
            friendTxt: "Add Friend",
            friendStatus: 0
          })
        } catch(error){
          console.log(error)
        }
      }
    } else{
      try{
        const addFriend = await axios.post('/api/notifications/addFriend',{
          other_user_id: match.params.id,
        })
        self.setState({
          friendTxt: "Request Pending",
          friendStatus: 2
        })
      } catch(error){
        console.log(error)
      }
    }
  }

  showAllGamingExperiences = () => {
    if(this.state.gameData !== undefined){
      const rowLen = this.state.gameData.allGameExperiences.length
      return this.state.gameData.allGameExperiences.map((item, index) => {
        return <IndividualGamingExperience item={item} key={index} row={index} rowLen={rowLen} routeProps={this.props.routeProps} initialData={this.props.initialData}/>
      })
    }
  }

  showAllesportsExperiences = () => {
    if(this.state.esportsExpData !== undefined){
      const rowLen = this.state.esportsExpData.esportsExperience.length
      return this.state.esportsExpData.esportsExperience.map((item, index) => {
        return <IndividualEsportsExperience item={item} key={index} row={index} rowLen={rowLen} routeProps={this.props.routeProps} initialData={this.props.initialData}/>
      })
    }
  }


  clickedDropdown = () => {
    this.setState({
      collapse: !this.state.collapse
    })
  }

  clickedDropdownesports = () => {
    this.setState({
      collapseesports: !this.state.collapseesports
    })
  }

  editDossier () {
    const {match} = self.props.routeProps
    window.location.href = `/profile/${match.params.id}/edit/dossier`
  }


  addGamingExp () {
    const {match} = self.props.routeProps
    window.location.href = `/profile/${match.params.id}/add/gamingexp`
  }

  addEsportsExp () {
    const {match} = self.props.routeProps
    window.location.href = `/profile/${match.params.id}/add/esportsExp`
  }

  render() {
    if(this.state.userProfile !== undefined) {
      if(this.state.esportsBioData !== undefined){
        const {first_name, last_name, country, region, profile_img, profile_bg, slogan, bio, contact_info} = this.state.userProfile
        var games_of_ardour, show_ardour = false
        var career_highlights, show_highlights = false
        var show_contact_info = false
        var show_location = false

        if ( (this.state.friendStatus == 1) || (this.state.myPage) ){
          show_contact_info = true
        }

        if ( (country != null) && (country.trim() != "") ){
          show_location = true
        }

        if(this.state.show_bio){
          if ((this.state.esportsBioData.myProfile[0].games_of_ardour != "") && (this.state.esportsBioData.myProfile[0].games_of_ardour != undefined)){
            games_of_ardour = this.state.esportsBioData.myProfile[0].games_of_ardour
            show_ardour = true
          }

          if ((this.state.esportsBioData.myProfile[0].career_highlights != "") && (this.state.esportsBioData.myProfile[0].career_highlights != undefined)){
            career_highlights = this.state.esportsBioData.myProfile[0].career_highlights
            show_highlights = true
          }
        }

        return (
          <section id="profile-page">
            <FileOpenModal
              bOpen={this.state.bFileModalOpen}
              callbackClose={this.callbackFileModalClose}
              callbackConfirm={this.callbackFileModalConfirm}
            ></FileOpenModal>
            <div className="content-area profile-page">
              <div className="header-grey-container">
                <div className="top-container">
                  <div className="userbackground-img" style={{
                    backgroundImage: `url('${profile_bg}')`
                    }}>
                    {this.state.myPage && <div className="header-background-uploader"  onClick={() => this.clickUpdateProfileBack()}>Update</div>}
                  </div>
                  <div className="user-img-upload-container">
                    <div className="user-img" style={{
                      backgroundImage: `url('${profile_img}')`
                      }}>
                    </div>
                    <img className="user-profile-img" src={profile_img}></img>
                    {this.state.myPage && <div className="user-img-upload" onClick={() => this.clickUpdateProfile()}>Update </div>}
                  </div>
                </div>
                <div className="bottom-container">
                  <div className="follow_btn">
                    {!this.state.myPage && <div className="follow-btn" onClick={this.addFriend}> {this.state.friendTxt} </div>}
                  </div>
                </div>
              </div>
              <div className="personal-container">
                <div className="info">
                  <h1>{`${first_name} ${last_name}`}</h1>
                  {show_location && <div className="location">
                    <i className="fas fa-circle"></i>&nbsp;
                    {`${region}`},&nbsp;{`${country}`}
                  </div>}
                  {this.state.myPage && <div className="edit_btn">
                    <i className="fas fa-pencil-alt" onClick={this.editDossier}></i>
                  </div>}
                  <h4>{`${slogan}`}</h4>
                </div>
                <div className="table">
                  <div className="myBio">
                    {`${bio}`}
                  </div>
                  {show_contact_info && <div className="contact-info">
                    {`${contact_info}`}
                  </div>}
                </div>
              </div>
              <div id="header" ><img src="https://mygame-media.s3-ap-southeast-2.amazonaws.com/headers/headers_v1-13.png" /></div>

              {this.state.show_bio && <div className="padding-container">
                <div className="esports-bio-grey-container">
                  <h3> myEsports Profile</h3>
                  <div className="esports-bio-container">
                    {show_ardour && <div className="esports-bio-ardour">
                      <i className="fas fa-user-shield"></i>&nbsp;{`${games_of_ardour}`}
                    </div>}
                    {show_highlights && <div className="esports-bio-highlights">
                      <i className="fas fa-crown"></i>&nbsp; {`${career_highlights}`}
                    </div>}
                  </div>
                </div>
              </div>}

              <div className="padding-container">
                <div className="esports-experience-grey-container">
                  <h3> myEsports Experience</h3>
                  <div className="add-esports-experience">
                    {this.state.myPage && <i className="fas fa-plus-circle" onClick={this.addEsportsExp}></i>}
                  </div>
                  <div className="icon" onClick={this.clickedDropdownesports}>
                    <i className="fas fa-chevron-down" />
                  </div>
                  <div className="padding-container">
                  </div>
                  {this.state.collapseesports &&  <div className="esports-container">
                    {this.showAllesportsExperiences()}
                  </div>}
                </div>
              </div>
              <div className="padding-container">
                <div className="game-experience-grey-container">
                  <h3> myGaming Experience</h3>
                  <div className="add-gaming-experience">
                    {this.state.myPage && <i className="fas fa-plus-circle" onClick={this.addGamingExp}></i>}
                  </div>
                  <div className="icon" onClick={this.clickedDropdown}>
                    <i className="fas fa-chevron-down" />
                  </div>
                  <div className="padding-container">
                  </div>
                  {this.state.collapse &&  <div className="experience-container">
                    {this.showAllGamingExperiences()}
                  </div>}
                </div>
              </div>
            </div>
          </section>
        )
      } else{
        return (
          <div className="content-area profile-page">
            Loading
          </div>
        )
      }
    } else{
      return (
        <div className="content-area profile-page">
          Loading
        </div>
      )
    }
  }
}
