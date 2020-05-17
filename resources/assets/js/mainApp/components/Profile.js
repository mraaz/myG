import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from 'axios'
import IndividualGamingExperience from './IndividualGamingExperience'
import IndividualEsportsExperience from './IndividualEsportsExperience'
import FileOpenModal from './FileOpenModal'
import SweetAlert from 'react-bootstrap-sweetalert'
import { setAsFriendRedux } from '../../common/friend'

export default class Profile extends Component {
  constructor() {
    super()
    this.state = {
      collapse: true,
      collapseesports: true,
      friendStatus: 0, //0: Not friend, 1: Friends, 2:Friend request pending,
      friendTxt: '',
      followTxt: false,
      myPage: false,
      bFileModalOpen: false,
      profile_attr: '',
      show_bio: false,
      noti_id: 0,
      redirect_: false,
      redirect_link: '',
      alert: null,
      esportsBioData: undefined,
    }

    this.callbackFileModalClose = this.callbackFileModalClose.bind(this)
    this.callbackFileModalConfirm = this.callbackFileModalConfirm.bind(this)

    this.clickUpdateProfile = this.clickUpdateProfile.bind(this)
    this.clickUpdateProfileBack = this.clickUpdateProfileBack.bind(this)
  }

  callbackFileModalClose() {
    this.setState({
      bFileModalOpen: false,
      profile_attr: '',
    })
  }

  callbackFileModalConfirm(src, key) {
    var profile = this.state.userProfile
    if (profile.hasOwnProperty(this.state.profile_attr)) {
      profile[this.state.profile_attr] = src
    }

    this.setState({
      bFileModalOpen: false,
      profile: profile,
    })

    //update user profile image

    if (this.state.profile_attr != '') {
      var data = {}
      var tmp = 'aws_key'
      data[this.state.profile_attr] = src
      data[tmp] = key

      var url = '/api/userprofile'
      if (this.state.profile_attr == 'profile_bg') {
        url = '/api/userprofilebg'
      }
      axios
        .post(url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(function(resp) {})
        .catch((error) => {
          // handle your error
        })
    }
  }

  clickUpdateProfileBack() {
    this.setState({
      bFileModalOpen: true,
      profile_attr: 'profile_bg',
    })
  }

  clickUpdateProfile() {
    this.setState({
      bFileModalOpen: true,
      profile_attr: 'profile_img',
    })
  }
  componentDidUpdate(prevProps) {
    if (this.props.routeProps.location.pathname !== prevProps.routeProps.location.pathname) {
      this.componentDidMount()
    }
  }

  componentDidMount() {
    const self = this
    const { match } = this.props.routeProps
    const { initialData } = this.props

    const getID = async function() {
      try {
        const convertAliastoID = await axios.get(`/api/user/alias/${match.params.alias}`)
        if (convertAliastoID.data.length != 0) {
          self.props.routeProps.match.params.id = convertAliastoID.data[0].id

          if (initialData != 'loading') {
            if (initialData.userInfo.id == match.params.id) {
              self.setState({ myPage: true })
            }
          }

          getUser()
          getGameExperiences()
          getEsportsExperiences()
          getEsportsBio()
        }
      } catch (error) {
        console.log(error)
      }
    }

    const getUser = async function() {
      try {
        const userProfile = await axios.get(`/api/user/${match.params.id}`)
        console.log(userProfile)
        self.setState({
          initialData: self.props.initialData,
          userProfile: userProfile.data.user[0],
        })

        if (userProfile.data.following) {
          self.setState({
            followTxt: true,
          })
        }

        if (userProfile.data.friend) {
          self.setState({
            friendTxt: 'Remove Friend',
            friendStatus: 1,
          })
        } else {
          const checkFriend = await axios.get(`/api/notifications/friend/${match.params.id}`)
          if (checkFriend.data.checkedFriend) {
            self.setState({
              friendTxt: 'Request Pending',
              friendStatus: 2,
            })
          } else {
            const checkFriendPending = await axios.get(`/api/notifications/myFriendRequest/${match.params.id}`)
            if (checkFriendPending.data.myFriendRequest) {
              self.setState({
                friendTxt: 'Accept Request',
                friendStatus: 3,
                noti_id: checkFriendPending.data.noti_id[0].id,
              })
            } else {
              self.setState({
                friendTxt: 'Connect',
                friendStatus: 0,
              })
              const send_off_im_looking = axios.get(`/api/connections/i_am_viewing_this_profile/${match.params.id}`)
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    const getGameExperiences = async function() {
      try {
        const gameExperience = await axios.get(`/api/GameExperiences/${match.params.id}`)
        self.setState({
          gameData: gameExperience.data,
        })
      } catch (error) {
        console.log(error)
      }
    }

    const getEsportsExperiences = async function() {
      try {
        const esportsExperience = await axios.get(`/api/esports_experiences/${match.params.id}`)
        self.setState({
          esportsExpData: esportsExperience.data,
        })
      } catch (error) {
        console.log(error)
      }
    }

    const getEsportsBio = async function() {
      try {
        const esportsBio = await axios.get(`/api/esports_bio/show_bio/${match.params.id}`)
        self.setState({
          esportsBioData: esportsBio.data,
        })
        if (esportsBio.data.myProfile.length != 0) {
          //console.log(esportsBio);
          if (esportsBio.data.myProfile[0].games_of_ardour != '') {
            self.setState({
              show_bio: true,
            })
          } else if (esportsBio.data.myProfile[0].career_highlights != '' && esportsBio.data.myProfile[0].career_highlights != null) {
            self.setState({
              show_bio: true,
            })
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    getID()
  }

  doFollow = () => {
    if (!this.state.followTxt) {
      try {
        const createFollower = axios.post('/api/followers/create', {
          follower_id: this.props.routeProps.match.params.id,
        })
        this.setState({ followTxt: true })
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const deleteFollower = axios.delete(`/api/followers/${this.props.routeProps.match.params.id}/delete`)
        this.setState({ followTxt: false })
      } catch (error) {
        console.log(error)
      }
    }
  }

  addFriend = () => {
    const { match } = this.props.routeProps
    const self = this

    if (this.state.friendStatus === 2) {
      return
    }

    if (this.state.friendStatus === 3) {
      try {
        setAsFriendRedux(match.params.id)
        const deleteNoti = axios.get(`/api/notifications/delete/${this.state.noti_id}`)
        const createFriend = axios.post('/api/friends/create', {
          friend_id: match.params.id,
        })
      } catch (error) {
        console.log(error)
      }
      self.setState({
        friendTxt: 'Remove Friend',
        friendStatus: 1,
      })
      return
    }

    if (this.state.friendStatus) {
      this.showAlert()
    } else {
      try {
        const addFriend = axios.post('/api/notifications/addFriend', {
          other_user_id: match.params.id,
        })
        self.setState({
          friendTxt: 'Request Pending',
          friendStatus: 2,
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  showAllGamingExperiences = () => {
    if (this.state.gameData !== undefined) {
      const rowLen = this.state.gameData.allGameExperiences.length
      return this.state.gameData.allGameExperiences.map((item, index) => {
        return (
          <IndividualGamingExperience
            item={item}
            key={index}
            row={index}
            rowLen={rowLen}
            routeProps={this.props.routeProps}
            initialData={this.props.initialData}
          />
        )
      })
    }
  }

  showAllesportsExperiences = () => {
    if (this.state.esportsExpData !== undefined) {
      const rowLen = this.state.esportsExpData.esportsExperience.length
      return this.state.esportsExpData.esportsExperience.map((item, index) => {
        return (
          <IndividualEsportsExperience
            item={item}
            key={index}
            row={index}
            rowLen={rowLen}
            routeProps={this.props.routeProps}
            initialData={this.props.initialData}
          />
        )
      })
    }
  }

  clickedDropdown = () => {
    this.setState({
      collapse: !this.state.collapse,
    })
  }

  clickedDropdownesports = () => {
    this.setState({
      collapseesports: !this.state.collapseesports,
    })
  }

  editDossier = () => {
    this.state.redirect_link = 'editDossier'
    this.setState({ redirect_: true })
  }

  addGamingExp = () => {
    this.state.redirect_link = 'addGamingExp'
    this.setState({ redirect_: true })
  }

  addEsportsExp = () => {
    this.state.redirect_link = 'addEsportsExp'
    this.setState({ redirect_: true })
  }

  showAlert() {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        title='Remove Friend?'
        confirmBtnText='Make it so!'
        confirmBtnBsStyle='warning'
        focusCancelBtn={true}
        focusConfirmBtn={false}
        showCloseButton={true}
        onConfirm={() => this.hideAlert('true')}
        onCancel={() => this.hideAlert('false')}>
        Are you sure you wish to unfriend?
      </SweetAlert>
    )

    this.setState({
      alert: getAlert(),
    })
  }

  hideAlert(text) {
    this.setState({
      alert: null,
    })
    if (text == 'true') {
      const { match } = this.props.routeProps
      try {
        const userProfile = axios.get(`/api/user/${match.params.id}/unfriend`)
        this.setState({
          friendTxt: 'Add Friend',
          friendStatus: 0,
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  render() {
    const { match } = this.props.routeProps
    var redirect_to_profile = false
    if (this.state.redirect_) {
      var tmp
      switch (this.state.redirect_link) {
        case 'editDossier':
          tmp = `/profile/${match.params.alias}/edit/dossier`
          return <Redirect push to={tmp} />
          break
        case 'addGamingExp':
          tmp = `/profile/${match.params.alias}/add/gamingexp`
          return <Redirect push to={tmp} />
          break
        case 'addEsportsExp':
          tmp = `/profile/${match.params.alias}/add/esportsExp`
          return <Redirect push to={tmp} />
          break
      }
    }
    //Redirect to logged in user if an Alias is not provided
    if (this.props.initialData != 'loading') {
      if (typeof match.params.alias == 'undefined') {
        redirect_to_profile = true
      }
    }

    if (this.state.userProfile !== undefined) {
      if (this.state.esportsBioData !== undefined) {
        const {
          first_name,
          last_name,
          country,
          region,
          profile_img,
          profile_bg,
          slogan,
          bio,
          contact_info,
          relationship_status,
        } = this.state.userProfile
        var games_of_ardour,
          show_ardour = false
        var career_highlights,
          show_highlights = false
        var show_contact_info = false
        var show_location = false

        if (this.state.friendStatus == 1 || this.state.myPage) {
          show_contact_info = true
        }

        if (country != null && country.trim() != '') {
          show_location = true
        }
        if (this.state.esportsBioData.myProfile.length > 0) {
          if (this.state.show_bio) {
            if (
              this.state.esportsBioData.myProfile[0].games_of_ardour != undefined &&
              this.state.esportsBioData.myProfile[0].games_of_ardour != ''
            ) {
              games_of_ardour = this.state.esportsBioData.myProfile[0].games_of_ardour
              show_ardour = true
            }

            if (
              this.state.esportsBioData.myProfile[0].career_highlights != '' &&
              this.state.esportsBioData.myProfile[0].career_highlights != undefined
            ) {
              career_highlights = this.state.esportsBioData.myProfile[0].career_highlights
              show_highlights = true
            }
          }
        }

        return (
          <section id='profile-page'>
            {this.state.alert}
            <FileOpenModal
              bOpen={this.state.bFileModalOpen}
              callbackClose={this.callbackFileModalClose}
              callbackConfirm={this.callbackFileModalConfirm}></FileOpenModal>
            <div className='content-area profile-page'>
              <div className='header-grey-container'>
                <div className='top-container'>
                  <div
                    className='userbackground-img'
                    style={{
                      backgroundImage: `url('${profile_bg}')`,
                    }}>
                    {this.state.myPage && (
                      <div className='header-background-uploader' onClick={() => this.clickUpdateProfileBack()}>
                        Update
                      </div>
                    )}
                  </div>
                  <div className='user-img-upload-container'>
                    <div
                      className='user-img'
                      style={{
                        backgroundImage: `url('${profile_img}')`,
                      }}></div>
                    <img className='user-profile-img' src={profile_img}></img>
                    {this.state.myPage && (
                      <div className='user-img-upload' onClick={() => this.clickUpdateProfile()}>
                        Update{' '}
                      </div>
                    )}
                  </div>
                </div>
                <div className='bottom-container'>
                  <div className='follow_btn'>
                    {!this.state.myPage && (
                      <div className='addFriend-btn' onClick={this.addFriend}>
                        {' '}
                        {this.state.friendTxt}{' '}
                      </div>
                    )}
                    {!this.state.myPage && (
                      <div className='follow-btn' onClick={this.doFollow}>
                        {' '}
                        {this.state.followTxt ? 'Unfollow' : 'Follow'}{' '}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='personal-container'>
                <div className='info'>
                  <h1>{`${first_name} ${last_name}`}</h1>
                  {show_location && (
                    <div className='location'>
                      <i className='fas fa-circle'></i>&nbsp;
                      {`${region}`}&nbsp;{`${country}`}
                    </div>
                  )}
                  <div className='alias'>({`${this.state.userProfile.alias}`})</div>
                  {this.state.myPage && (
                    <div className='edit_btn'>
                      <i className='fas fa-pencil-alt' onClick={this.editDossier}></i>
                    </div>
                  )}
                  <h4>{`${slogan}`}</h4>
                </div>
                <div className='table'>
                  <div className='myBio'>{`${bio}`}</div>
                  {show_contact_info && <div className='contact-info'>{`${contact_info}`}</div>}
                  {show_contact_info && <div className='relationship_status'>{`${relationship_status}`}</div>}
                </div>
              </div>
              <div id='header'>
                <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/headers/headers_v1-13.png' />
              </div>

              {this.state.show_bio && (
                <div className='padding-container'>
                  <div className='esports-bio-grey-container'>
                    <h3> Esports Profile</h3>
                    <div className='esports-bio-container'>
                      {show_ardour && (
                        <div className='esports-bio-ardour'>
                          <i className='fas fa-user-shield'></i>&nbsp;
                          {`${games_of_ardour}`}
                        </div>
                      )}
                      {show_highlights && (
                        <div className='esports-bio-highlights'>
                          <i className='fas fa-crown'></i>&nbsp; {`${career_highlights}`}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className='padding-container'>
                <div className='esports-experience-grey-container'>
                  <h3> Esports Career</h3>
                  <div className='add-esports-experience'>
                    {this.state.myPage && <i className='fas fa-plus-circle' onClick={this.addEsportsExp}></i>}
                  </div>
                  <div className='icon' onClick={this.clickedDropdownesports}>
                    <i className='fas fa-chevron-down' />
                  </div>
                  <div className='padding-container'></div>
                  {this.state.collapseesports && <div className='esports-container'>{this.showAllesportsExperiences()}</div>}
                </div>
              </div>
              <div className='padding-container'>
                <div className='game-experience-grey-container'>
                  <h3> Gaming Interests</h3>
                  <div className='add-gaming-experience'>
                    {this.state.myPage && <i className='fas fa-plus-circle' onClick={this.addGamingExp}></i>}
                  </div>
                  <div className='icon' onClick={this.clickedDropdown}>
                    <i className='fas fa-chevron-down' />
                  </div>
                  <div className='padding-container'></div>
                  {this.state.collapse && <div className='experience-container'>{this.showAllGamingExperiences()}</div>}
                </div>
              </div>
            </div>
          </section>
        )
      } else {
        return <div className='content-area profile-page'>Loading</div>
      }
    } else {
      if (redirect_to_profile) {
        var tmp = `/profile/${this.props.initialData.userInfo.alias}`
        return <Redirect push to={tmp} />
      } else {
        return <div className='content-area profile-page'>This profile was not found</div>
      }
    }
  }
}
