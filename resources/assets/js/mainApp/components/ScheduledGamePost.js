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
import IndividualComment from "./IndividualComment"
import DeleteScheduleGameModal from "./DeleteScheduleGameModal";


const createOption = (label: string, value: int) => ({
  label,
  value
})

export default class ScheduledGamePost extends Component {
  constructor() {
    super()
    this.state = {
      show_more_comments: false,
      pull_once:true,
      value: "",
      zero_comments: false,
      comment_total:0,
      myPost: false,
      approval_btn: false,
      show_attendees: false,
      attendees_count: 0,
      show_invite: false,
      show_full: false,
      show_attending: false,
      show_pending: false,
      show_one_profile: false,
      show_two_profile: false,
      show_three_profile: false,
      show_four_profile: false,
      show_five_profile: false,
      show_more_profile: false,
      attendees_profiles: [],
      show_Dota_2_roles_selector: false,
      dota_2_roles_selector: [],
      dota2_roles_box: null,
      show_dota_2_position: false,
      dota_2_position: "Pos: ",
      show_dota_2_pos_one: false,
      show_dota_2_pos_two: false,
      show_dota_2_pos_three: false,
      show_dota_2_pos_four: false,
      show_dota_2_pos_five: false,
      dota_2_pos_one_count: 0,
      dota_2_pos_two_count: 0,
      dota_2_pos_three_count: 0,
      dota_2_pos_four_count: 0,
      dota_2_pos_five_count: 0,
      clash_royale_field: false,
      bDeleteModalOpen: false,
      modal_id: 0,
      visibility_hidden_lnk: false
    }

    this.callbackPostFileModalClose = this.callbackPostFileModalClose.bind(this);
    this.callbackPostFileModalConfirm=this.callbackPostFileModalConfirm.bind(this);

    this.textInput = null;

    this.setTextInputRef = element => {
      this.textInput = element;
    };

    this.focusTextInput = () => {
      // Focus the text input using the raw DOM API
      if (this.textInput) this.textInput.focus()
    }
  }

  callbackPostFileModalClose(){

    this.setState({
      bDeleteModalOpen: false
    })
  }

  callbackPostFileModalConfirm = async (data) => {
    this.setState({
      bDeleteModalOpen: false
    })

    try{
      const mysch = axios.get(`/api/ScheduleGame/delete/${this.state.modal_id}/${data.value}`)
      location.reload()
    } catch(error){
      console.log(error)
    }
  }

  detectKey = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return
    }

    if (e.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      this.insert_comment()
    }
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
  }

  onChange = () => {
    let tmpState = this.state.show_more_comments

    if (!this.state.show_more_comments) {
      this.pullComments()
    }
    // this.setState({
    //   pull_once: false
    // })
    this.setState({
      show_more_comments: !this.state.show_more_comments
    })
    if (!tmpState){
      this.focusTextInput()
    }
  }


  componentWillMount(){
    const self = this
    const { schedule_game } = this.props

    const getCommentsCount = async function(){
      try{
        const myCommentsCount = await axios.get(`/api/comments/scheduled_gamesCount/${schedule_game.id}`)
        if (myCommentsCount.data.no_of_comments[0].no_of_comments != 0){
          self.setState({
            zero_comments: true,
            comment_total: myCommentsCount.data.no_of_comments[0].no_of_comments
            })
        }
      } catch(error){
       console.log(error)
      }
    }

    const checkWhosPost = async function(){
      try{
        const checkWhosPost = await axios.get(`/api/myScheduledGamesCount/${schedule_game.id}`)
        if (checkWhosPost.data.myScheduledGamesCount[0].no_of_my_posts != 0){
          self.setState({
            myPost: true,
            approval_btn: true
          })
          // if (schedule_game.game_name == "Dota 2"){
          //   self.setState({
          //     approval_btn: true
          //   })
          // }else{
          //   approval_btn: false
          // }
        }
      } catch(error){
       console.log(error)
      }
    }

    const getNumberofAttendees = async function(){
      try{
        if(schedule_game.limit != 42){
          self.state.show_attendees = true
          const getNumberofAttendees = await axios.get(`/api/attendees/attending/${schedule_game.id}`)
          if (getNumberofAttendees.data.allAttendees[0].no_of_allAttendees != 0){
            // self.setState({
            //   attendees_count: getNumberofAttendees.data.allAttendees[0].no_of_allAttendees
            // })
            self.state.attendees_count = getNumberofAttendees.data.allAttendees[0].no_of_allAttendees

            const getwhoisAttending = await axios.get(`/api/attendees/role_call/${schedule_game.id}`)
            for (var i = 0; i < getwhoisAttending.data.role_call.length; i++){
              self.state.attendees_profiles.push(getwhoisAttending.data.role_call[i])
              switch(i) {
                case 0:
                  self.setState({show_one_profile: true})
                  //self.state.show_one_profile = true
                  break
                case 1:
                  self.setState({show_two_profile: true})
                  //self.state.show_two_profile = true
                  break
                case 2:
                  self.setState({show_three_profile: true})
                  //self.state.show_three_profile = true
                  break
                case 3:
                  self.setState({show_four_profile: true})
                  //self.state.show_four_profile = true
                  break
                case 4:
                  self.setState({show_five_profile: true})
                  //self.state.show_five_profile = true
                  break
                case 5:
                  self.setState({show_more_profile: true})
                  //self.state.show_more_profile = true
                  break
              }
            }
          }
          const get_if_im_Attending = await axios.get(`/api/attendees/myattendance/${schedule_game.id}`)
          if (get_if_im_Attending.data.myattendance[0].no_of_myAttendance == 0){  //You have no approved invites
            if (get_if_im_Attending.data.myattendance_pending[0].no_of_myAttendance_pending != 0){ //Check do you have any pending invites
              self.setState({
                show_attending: false,
                show_invite: false,
                show_full: false,
                show_pending: true
              })
            }
            else if (getNumberofAttendees.data.allAttendees[0].no_of_allAttendees < schedule_game.limit){ //Check if the game is full since you have no invite or pending invites
              self.setState({
                show_attending: false,
                show_invite: true,
                show_full: false,
                show_pending: false

              })
            } else {
              self.setState({
                show_attending: false,
                show_invite: false,
                show_full: true,
                show_pending: false
              })
            }
          } else {    //You're approved
            self.setState({
              show_attending: true,
              show_invite: false,
              show_full: false,
              show_pending: false
            })
          }
          if (schedule_game.game_name == "Dota 2"){
            const getmyDota2Position = await axios.get(`/api/attendees/game_positions/${schedule_game.id}`)
            if (getmyDota2Position.data.game_position_of_dota_2_position_ones[0].no_of_dota_2_position_ones != 0){
              self.state.show_dota_2_pos_one = true
              self.state.show_dota_2_position = true
              self.state.dota_2_pos_one_count = getmyDota2Position.data.game_position_of_dota_2_position_ones[0].no_of_dota_2_position_ones
            }
            if (getmyDota2Position.data.game_position_of_dota_2_position_twos[0].no_of_dota_2_position_twos != 0){
              self.state.show_dota_2_pos_two = true
              self.state.show_dota_2_position = true
              self.state.dota_2_pos_two_count = getmyDota2Position.data.game_position_of_dota_2_position_twos[0].no_of_dota_2_position_twos
            }
            if (getmyDota2Position.data.game_position_of_dota_2_position_threes[0].no_of_dota_2_position_threes != 0){
              self.state.show_dota_2_pos_three = true
              self.state.show_dota_2_position = true
              self.state.dota_2_pos_three_count = getmyDota2Position.data.game_position_of_dota_2_position_threes[0].no_of_dota_2_position_threes
            }
            if (getmyDota2Position.data.game_position_of_dota_2_position_fours[0].no_of_dota_2_position_fours != 0){
              self.state.show_dota_2_pos_four = true
              self.state.show_dota_2_position = true
              self.state.dota_2_pos_four_count = getmyDota2Position.data.game_position_of_dota_2_position_fours[0].no_of_dota_2_position_fours
            }
            if (getmyDota2Position.data.game_position_of_dota_2_position_fives[0].no_of_dota_2_position_fives != 0){
              self.state.show_dota_2_pos_five = true
              self.state.show_dota_2_position = true
              self.state.dota_2_pos_five_count = getmyDota2Position.data.game_position_of_dota_2_position_fives[0].no_of_dota_2_position_fives
            }
          }
        } else {
          try{
            const get_if_im_Attending = await axios.get(`/api/attendees/myattendance/${schedule_game.id}`)
            if (get_if_im_Attending.data.myattendance[0].no_of_myAttendance != 0){
              self.setState({
                show_attending: true,
                show_invite: false,
                show_full: false,
                show_pending: false
              })
            }else if (get_if_im_Attending.data.myattendance_pending[0].no_of_myAttendance_pending != 0) {
              self.setState({
                show_attending: false,
                show_invite: false,
                show_full: false,
                show_pending: true
              })
            }else {
              self.setState({
                show_attending: false,
                show_invite: true,
                show_full: false,
                show_pending: false
              })
            }
            const getwhoisAttending = await axios.get(`/api/attendees/role_call/${schedule_game.id}`)
            for (var i = 0; i < getwhoisAttending.data.role_call.length; i++){
              self.state.attendees_profiles.push(getwhoisAttending.data.role_call[i])
              switch(i) {
                case 0:
                  self.setState({show_one_profile: true})
                  //self.state.show_one_profile = true
                  break
                case 1:
                  //self.state.show_two_profile = true
                  self.setState({show_two_profile: true})
                  break
                case 2:
                  //self.state.show_three_profile = true
                  self.setState({show_three_profile: true})
                  break
                case 3:
                  //self.state.show_four_profile = true
                  self.setState({show_four_profile: true})
                  break
                case 4:
                  //self.state.show_five_profile = true
                  self.setState({show_five_profile: true})
                  break
                case 5:
                  //self.state.show_more_profile = true
                  self.setState({show_more_profile: true})
                  break
              }
            }
            if (schedule_game.game_name == "Dota 2"){
              const getmyDota2Position = await axios.get(`/api/attendees/game_positions/${schedule_game.id}`)
              if (getmyDota2Position.data.game_position_of_dota_2_position_ones[0].no_of_dota_2_position_ones != 0){
                self.state.show_dota_2_pos_one = true
                self.state.show_dota_2_position = true
                self.state.dota_2_pos_one_count = getmyDota2Position.data.game_position_of_dota_2_position_ones[0].no_of_dota_2_position_ones
              }
              if (getmyDota2Position.data.game_position_of_dota_2_position_twos[0].no_of_dota_2_position_twos != 0){
                self.state.show_dota_2_pos_two = true
                self.state.show_dota_2_position = true
                self.state.dota_2_pos_two_count = getmyDota2Position.data.game_position_of_dota_2_position_twos[0].no_of_dota_2_position_twos
              }
              if (getmyDota2Position.data.game_position_of_dota_2_position_threes[0].no_of_dota_2_position_threes != 0){
                self.state.show_dota_2_pos_three = true
                self.state.show_dota_2_position = true
                self.state.dota_2_pos_three_count = getmyDota2Position.data.game_position_of_dota_2_position_threes[0].no_of_dota_2_position_threes
              }
              if (getmyDota2Position.data.game_position_of_dota_2_position_fours[0].no_of_dota_2_position_fours != 0){
                self.state.show_dota_2_pos_four = true
                self.state.show_dota_2_position = true
                self.state.dota_2_pos_four_count = getmyDota2Position.data.game_position_of_dota_2_position_fours[0].no_of_dota_2_position_fours
              }
              if (getmyDota2Position.data.game_position_of_dota_2_position_fives[0].no_of_dota_2_position_fives != 0){
                self.state.show_dota_2_pos_five = true
                self.state.show_dota_2_position = true
                self.state.dota_2_pos_five_count = getmyDota2Position.data.game_position_of_dota_2_position_fives[0].no_of_dota_2_position_fives
              }
            }
          } catch(error){
           console.log(error)
          }
        }
      } catch(error){
       console.log(error)
      }
      self.forceUpdate()
    }

    if (schedule_game.game_name == "Dota 2"){
      if ( (schedule_game.dota2_roles != null) && (schedule_game.dota2_roles != "") ){
        self.state.show_Dota_2_roles_selector = true
        var arrRoles = ""
        var tmp = []

        arrRoles = schedule_game.dota2_roles.split(',')
        var tmp_str = ""
        for (var i = 0; i < arrRoles.length; i++){
          var value = 1
          switch(arrRoles[i].trim()) {
            case "Position 1":
              value = 1
              tmp_str = "Pos 1"
              break
            case "Position 2":
              value = 2
              tmp_str = "Pos 2"
              break
            case "Position 3":
              value = 3
              tmp_str = "Pos 3"
              break
            case "Position 4":
              value = 4
              tmp_str = "Pos 4"
              break
            case "Position 5":
              value = 5
              tmp_str = "Pos 5"
              break
          }
          const newOption = createOption(tmp_str, value)
          tmp.push(newOption)
        }
        self.setState({dota_2_roles_selector: tmp})
      }
    }
    if (schedule_game.game_name == "Clash Royale"){
      self.setState({clash_royale_field: true})
    }

    if (schedule_game.visibility == 4){
      this.setState({visibility_hidden_lnk: true})
    }

    getCommentsCount()
    checkWhosPost()
    getNumberofAttendees()

    if (this.props.props != undefined){
      if (this.props.props.match.params.id != undefined && this.props.props.match.params.id != "" && this.props.show_single == true ){
        this.onChange()
      }
    }

  }

  onFocus = () => {
    if (this.state.pull_once) {
      this.pullComments()
    }
    this.setState({
      pull_once: false,
      show_more_comments: true
    })
  }

  pullComments = () => {
    const self = this
    const { schedule_game } = this.props

    const getComments = async function(){
      try{
        const myComments = await axios.get(`/api/comments/scheduled_games/${schedule_game.id}`)
        self.setState({
          myComments: myComments.data.allComments,
          value: "",
          comment_total: myComments.data.allComments.length,
        })
      } catch(error){
       console.log(error)
      }
    }
    getComments()
  }

  showComment = () => {
    if(this.state.myComments != undefined){
      return this.state.myComments.map((item, index) => {
        return <IndividualComment comment={item} key={index} user={this.props.user} />
      })
    }
  }

  insert_comment = () => {
    const { schedule_game } = this.props
    const self = this

    if (this.state.value == ""){
      return
    }
    if (this.state.value.trim() == ""){
      this.setState({
         value: "",
      })
      return
    }

    this.onFocus()

    const saveComment = async function(){
      try{
        const postComment = await axios.post('/api/comments',{
          content: self.state.value.trim(),
          schedule_games_id: schedule_game.id
        })
        self.setState({
           myComments: [],
        })
        self.pullComments()
        self.setState({
          comment_total: self.state.comment_total + 1,
          zero_comments: true
        })
        if (schedule_game.user_id != self.props.user.userInfo.id){
          const addPostLike = axios.post('/api/notifications/addComment',{
            other_user_id: schedule_game.user_id,
            schedule_games_id: schedule_game.id,
            comment_id: postComment.data.id
          })
        }

      } catch(error){
       console.log(error)
      }
    }
    saveComment()
  }

  // update_post = (e) => {
  //   if (this.state.value2 == ""){
  //     return
  //   }
  //   if (this.state.value2.trim() == ""){
  //     this.setState({
  //        value: "",
  //     })
  //     return
  //   }
  //   const self = this
  //   const { schedule_game } = this.props
  //
  //   const editPost = async function(){
  //     try{
  //       const myEditPost = await axios.post(`/api/post/update/${schedule_game.id}`,{
  //         content: self.state.value
  //       })
  //       self.setState({
  //         content: self.state.value2,
  //         edit_post: false,
  //         value2: ""
  //       })
  //     } catch(error){
  //      console.log(error)
  //     }
  //   }
  //   editPost()
  // }

  delete_sch = async (id) => {
    const tmp = null

    try{
      const all_attendees = await axios.get(`/api/attendees/attending/${id}`)
      if (all_attendees.data.allAttendees[0].no_of_allAttendees > 0){
        this.setState({
          bDeleteModalOpen: true,
          modal_id: id
        })
      } else {
        if (window.confirm('Are you sure you wish to trash this game boss?')){
          const mysch = axios.get(`/api/ScheduleGame/delete/${id}/${tmp}`)
          location.reload()
        }
      }
    } catch(error){
      console.log(error)
    }
  }

  enrollinGame = async () => {
    var myDota2_roles = ""

    if (this.state.show_Dota_2_roles_selector){
      if ( (this.state.dota2_roles_box != "") && (this.state.dota2_roles_box != null) ){
        for (var i=0; i < this.state.dota2_roles_box.length; i++){
          switch(this.state.dota2_roles_box[i].value) {
            case 1:
              this.state.show_dota_2_pos_one = true
              break
            case 2:
              this.state.show_dota_2_pos_two = true
              break
            case 3:
              this.state.show_dota_2_pos_three = true
              break
            case 4:
              this.state.show_dota_2_pos_four = true
              break
            case 5:
              this.state.show_dota_2_pos_five = true
              break
          }
        }
      }else {
        window.alert("Sorry mate, you need to select a role")
        return
      }
    }
    try{
      const getNumberofAttendees = await axios.get(`/api/attendees/attending/${this.props.schedule_game.id}`)
      if (this.props.schedule_game.limit == 42 || getNumberofAttendees.data.allAttendees[0].no_of_allAttendees < this.props.schedule_game.limit){

        const savemySpot = axios.post('/api/attendees/savemySpot',{
          schedule_games_id: this.props.schedule_game.id,
          dota_2_position_one: this.state.show_dota_2_pos_one,
          dota_2_position_two: this.state.show_dota_2_pos_two,
          dota_2_position_three: this.state.show_dota_2_pos_three,
          dota_2_position_four: this.state.show_dota_2_pos_four,
          dota_2_position_five: this.state.show_dota_2_pos_five,
          notify: true
       })
       this.setState({show_invite: false,
         show_attending: false,
         show_full: false,
         show_pending: true
       })

        // const deleteNoti = await axios.get(`/api/notifications/delete/schedule_game_attendees/${this.props.schedule_game.id}`)
        //
        // const getAllAttendees = await axios.get(`/api/attendees/show_all_pending_attendance/${this.props.schedule_game.id}`)
        // console.log(getAllAttendees);
        // for (var i=0; i < getAllAttendees.data.allAttendees.length; i++){
        //   if (this.props.user.userInfo.id != getAllAttendees.data.allAttendees[i].user_id){
        //     const post_game = axios.post('/api/notifications/addScheduleGame/attendance',{
        //       other_user_id: getAllAttendees.data.allAttendees[i].user_id,
        //       schedule_games_id: this.props.schedule_game.id
        //     })
        //   }
        // }
      } else {
        window.alert("Sorry mate, the spot got filled up! You are NOT in :(")
        this.setState({show_invite: false,
          show_attending: false,
          show_full: true
        })
      }
    } catch(error){
      console.log(error)
    }
  }

  disenrollinGame = () => {
    try{
      const getNumberofAttendees = axios.get(`/api/attendees/removeattending/${this.props.schedule_game.id}`)
      this.setState({show_invite: true,
        show_attending: false,
        show_full: false,
        show_pending: false
      })

      const no_vacany = axios.post('/api/ScheduleGame/update_vacany/',{
        vacancy: true,
        id: this.props.schedule_game.id
      })

    } catch(error){
      console.log(error)
    }
    this.state.show_dota_2_pos_one = false
    this.state.show_dota_2_pos_two = false
    this.state.show_dota_2_pos_three = false
    this.state.show_dota_2_pos_four = false
    this.state.show_dota_2_pos_five = false
  }

  redirect_link = () => {
    window.location.href = `/playerList/${this.props.schedule_game.id}`
  }

  handleChange_dota2_roles = (dota2_roles_box) => {
    this.setState({ dota2_roles_box })
  }

  approvals = () => {
    window.location.href = `/scheduledGamesApprovals/${this.props.schedule_game.schedule_games_GUID}`
  }

  render() {
    const { schedule_game } = this.props
    var region = false
    var experience = false
    var platform = false
    var description = false
    var other = false
    var visibility = "Public"
    var dota2_medal_ranks = false
    var dota2_server_regions = false
    var dota2_roles = false


    if (schedule_game.region != "" && schedule_game.region != null){
      region = true
    }
    if (schedule_game.experience != "" && schedule_game.experience != null){
      experience = true
    }
    if (schedule_game.platform != "" && schedule_game.platform != null){
      platform = true
    }
    if (schedule_game.description != "" && schedule_game.description != null){
      description = true
    }
    if (schedule_game.other != "" && schedule_game.other != null){
      other = true
    }

    if (schedule_game.dota2_medal_ranks != "" && schedule_game.dota2_medal_ranks != null){
      dota2_medal_ranks = true
    }
    if (schedule_game.dota2_server_regions != "" && schedule_game.dota2_server_regions != null){
      dota2_server_regions = true
    }
    if (schedule_game.dota2_roles != "" && schedule_game.dota2_roles != null){
      dota2_roles = true
    }

    switch(schedule_game.visibility) {
      case 1:
        visibility = "Public"
        break
      case 2:
        visibility = "Friends"
        break
      case 3:
        visibility = "Group"
        break
      case 4:
        visibility = "Hidden"
        break
    }

    var myExpiry = moment(schedule_game.expiry, "YYYY-MM-DD HH:mm:ssZ")
    const now = moment()

    if (now.isAfter(myExpiry)){
      var duration = "expired!"
    } else {
      var duration = moment.duration(myExpiry.diff(now)).humanize()
    }

    var myStartDateTime = moment(schedule_game.start_date_time, "YYYY-MM-DD HH:mm:ssZ").local()
    var myEndDateTime = moment(schedule_game.end_date_time, "YYYY-MM-DD HH:mm:ssZ").local()

    return (<div className="gamesPosts">
      <div className="padding-container">
        <div className="grey-container">
          <div className="update-info">
            <div className="game-name-display">
              <h3> {schedule_game.game_name} </h3>
              {this.state.approval_btn && <div className="approval-seal" onClick={this.approvals} style={{
                backgroundImage: `url('https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/seal-2512363_small.png')`
              }}> </div>}
              <div className="comments-stats">
                {this.state.zero_comments && <div className="comments-statz" onClick={this.onChange}> {this.state.comment_total > 1 ? `${this.state.comment_total} comments` : `${this.state.comment_total} comment`} </div>}
                {!this.state.zero_comments && <div className="comments-statz" onClick={this.focusTextInput}> No comments</div>}
              </div>
              {!this.state.myPost && <h6> <a href={`/profile/${schedule_game.user_id}`} style={{ textDecoration: 'none', color: 'white' }}> Posted by {schedule_game.alias}</a></h6>}

              {/*<a href="/profile/{schedule_game.user_id}"{schedule_game.alias}</a>*/}
              {this.state.myPost && <div className="delete-icon" onClick={() => { this.delete_sch(schedule_game.id) } }>
                <i className="fas fa-trash-alt"></i>
              </div>}
            </div>
            <DeleteScheduleGameModal
              bOpen={this.state.bDeleteModalOpen}
              callbackClose={this.callbackPostFileModalClose}
              callbackConfirm={this.callbackPostFileModalConfirm}
            ></DeleteScheduleGameModal>
            <div className="expiry-info">
              Expiry:&nbsp;{duration}
            </div>
            <div className="myFields">
              {region && <div> Region/s: {schedule_game.region} </div>}
              <div> Start Time: {myStartDateTime.format('Do MMM YY, h:mm a')} </div>
              <div> End Time: {myEndDateTime.format('Do MMM YY, h:mm a')} </div>
              {experience && <div> Experience: {schedule_game.experience} </div>}
              {platform && <div> Platform: {schedule_game.platform} </div>}
              {other && <div> Other: {schedule_game.other} </div>}
              {dota2_medal_ranks && <div>Medal Ranks: {schedule_game.dota2_medal_ranks} </div>}
              {dota2_server_regions && <div>Server Regions: {schedule_game.dota2_server_regions} </div>}
              {dota2_roles && <div>Roles: {schedule_game.dota2_roles} </div>}
              {this.state.clash_royale_field && <div> Royale Trophies: {schedule_game.clash_royale_trophies} </div>}
              {!this.state.visibility_hidden_lnk && <div> Visibility: {visibility} </div>}
              {this.state.visibility_hidden_lnk && <div> Visibility: <a href={`/scheduledGames/${schedule_game.id}`}> {visibility}</a> (Send this link to players to join game)  </div>}
              {description && <div> Description: {schedule_game.description} </div>}
            </div>
          </div>
          <div className="invitation-panel">
            {this.state.show_invite && <div className="invitation-link">
              <div className="hack-text" onClick={() => this.enrollinGame()}>
                <i className="fas fa-dungeon"></i>&nbsp;Join Queue
              </div>
              {this.state.show_Dota_2_roles_selector && <div className="dota2-roles">
                <Select
                  onChange={this.handleChange_dota2_roles}
                  options={this.state.dota_2_roles_selector}
                  className="dota2-roles-box"
                  placeholder="Select Role/s"
                  isClearable
                  isMulti
                />
              </div>}
            </div>}
            {this.state.show_full && <div className="invitation-link">
              <div className="hack-text2">
                <i className="fas fa-door-closed"></i>&nbsp;Sorry it's <span style={{color: "#f44336"}}>&nbsp; full :( </span>
              </div>
            </div>}
            {this.state.show_attending && <div className="invitation-link">
              <div className="hack-text3" onClick={() => { if (window.confirm('Are you sure you wish to remove yourself from this Game?')) this.disenrollinGame()}}>
                <i className="fas fa-door-closed"></i><span style={{color: "#4CAF50"}}>&nbsp;Leave game</span>
              </div>
            </div>}
            {this.state.show_pending && <div className="invitation-link">
              <div className="hack-text3" onClick={() => { if (window.confirm('Are you sure you wish to remove yourself from this Game?')) this.disenrollinGame()}}>
                <i className="fas fa-door-closed"></i><span style={{color: "#2196F3"}}>&nbsp;Waiting on host...</span>
              </div>
            </div>}
            {this.state.show_dota_2_position && <div className="dota2-roles-answers">
              {this.state.dota_2_position}
              {this.state.show_dota_2_pos_one && <div className="dota_2_position_one_text"> 1<div className={`noti-number ${this.state.dota_2_pos_one_count > 0 ? 'active' : '' }`}> {this.state.dota_2_pos_one_count}</div> </div>}

              {this.state.show_dota_2_pos_one && this.state.show_dota_2_pos_two && <div className="dot-sep">,</div>}
              {this.state.show_dota_2_pos_two && <div className="dota_2_position_two_text"> 2<div className={`noti-number ${this.state.dota_2_pos_two_count > 0 ? 'active' : '' }`}> {this.state.dota_2_pos_two_count}</div></div>}

              {(this.state.show_dota_2_pos_one || this.state.show_dota_2_pos_two) && this.state.show_dota_2_pos_three && <div className="dot-sep">,</div>}
              {this.state.show_dota_2_pos_three && <div className="dota_2_position_three_text"> 3<div className={`noti-number ${this.state.dota_2_pos_three_count > 0 ? 'active' : '' }`}> {this.state.dota_2_pos_three_count}</div> </div>}

              {(this.state.show_dota_2_pos_one || this.state.show_dota_2_pos_two || this.state.show_dota_2_pos_three) && this.state.show_dota_2_pos_four && <div className="dot-sep">,</div>}
              {this.state.show_dota_2_pos_four && <div className="dota_2_position_four_text"> 4<div className={`noti-number ${this.state.dota_2_pos_four_count > 0 ? 'active' : '' }`}> {this.state.dota_2_pos_four_count}</div> </div>}

              {(this.state.show_dota_2_pos_one || this.state.show_dota_2_pos_two || this.state.show_dota_2_pos_three || this.state.show_dota_2_pos_four) && this.state.show_dota_2_pos_five && <div className="dot-sep">,</div>}
              {this.state.show_dota_2_pos_five && <div className="dota_2_position_five_text"> 5<div className={`noti-number ${this.state.dota_2_pos_five_count > 0 ? 'active' : '' }`}> {this.state.dota_2_pos_five_count}</div></div>}

            </div>}
            {this.state.show_one_profile && <div className="attendees-one">
              <a href={`/profile/${this.state.attendees_profiles[0].user_id}`} className="user-img" style={{
                backgroundImage: `url('${this.state.attendees_profiles[0].profile_img}')`
              }}/>
            </div>}
            {this.state.show_two_profile && <div className="attendees-two">
              <a href={`/profile/${this.state.attendees_profiles[1].user_id}`} className="user-img" style={{
                backgroundImage: `url('${this.state.attendees_profiles[1].profile_img}')`
              }}/>
            </div>}
            {this.state.show_three_profile && <div className="attendees-three">
              <a href={`/profile/${this.state.attendees_profiles[2].user_id}`} className="user-img" style={{
                backgroundImage: `url('${this.state.attendees_profiles[2].profile_img}')`
              }}/>
            </div>}
            {this.state.show_four_profile && <div className="attendees-four">
              <a href={`/profile/${this.state.attendees_profiles[3].user_id}`} className="user-img" style={{
                backgroundImage: `url('${this.state.attendees_profiles[3].profile_img}')`
              }}/>
            </div>}
            {this.state.show_five_profile && <div className="attendees-five">
              <a href={`/profile/${this.state.attendees_profiles[4].user_id}`} className="user-img" style={{
                backgroundImage: `url('${this.state.attendees_profiles[4].profile_img}')`
              }}/>
            </div>}
            {this.state.show_more_profile && <div className="attendees-more">
              <div className="user-img" onClick={this.redirect_link} style={{
                backgroundImage: `url('https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/5%2B.png')`
              }}> </div>
            </div>}
            {this.state.show_attendees &&  <div className="attendees-count">
              {this.state.attendees_count} out of {schedule_game.limit}
            </div>}
            {!this.state.show_attendees &&  <div className="attendees-count">
              Unlimited
            </div>}
          </div>
          <div className="compose-comment">
            <textarea
              name="name"
              rows={8}
              cols={80}
              placeholder="Write a comment..."
              value={this.state.value}
              onChange={this.handleChange}
              maxLength="254"
              onKeyUp = {this.detectKey}
              ref={this.setTextInputRef}
              onFocus={this.onFocus}
            />
            <div className="buttons">
              <div className="repost-btn" onClick={this.insert_comment}>
                <i className="fas fa-reply" />{" "}
              </div>
            </div>
          </div>
          <div className="comments">
            {this.state.show_more_comments && <div className="show-individual-comments">
              {this.showComment()}
            </div>}
          </div>
        </div>
      </div>
    </div>)
  }
}
