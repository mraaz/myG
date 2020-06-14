import React, { Component } from 'react'
import Select from 'react-select'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import IndividualComment from './IndividualComment'
import DeleteScheduleGameModal from './DeleteScheduleGameModal'
import { toast } from 'react-toastify'
import SweetAlert from './common/MyGSweetAlert'
import { Toast_style } from './Utility_Function'
import { exitGameGroup } from '../../common/group'

const createOption = (label: string, value: int) => ({
  label,
  value,
})

export default class ScheduledGamePost_Dota2 extends Component {
  constructor() {
    super()
    this.state = {
      show_more_comments: false,
      pull_once: true,
      value: '',
      zero_comments: false,
      comment_total: 0,
      myPost: false,
      approval_btn: false,
      show_attendees: false,
      attendees_count: 0,
      show_invite: true,
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
      bDeleteModalOpen: false,
      modal_id: 0,
      visibility_hidden_lnk: false,
      show_region: false,
      show_experience: false,
      show_platform: false,
      show_description: false,
      show_other: false,
      visibility: 'Public',
      duration: '',
      start_date: moment(),
      end_date: moment(),
      redirect_Approvals: false,
      redirect_PlayerList: false,
      show_Dota_2_roles_selector: false,
      dota_2_roles_selector: [],
      dota2_roles_box: null,
      show_dota_2_position: false,
      dota_2_position: 'Pos: ',
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
      show_dota2_medal_ranks: false,
      show_dota2_server_regions: false,
      show_dota2_roles: false,
      alert: null,
    }

    this.callbackPostFileModalClose = this.callbackPostFileModalClose.bind(this)
    this.callbackPostFileModalConfirm = this.callbackPostFileModalConfirm.bind(this)

    this.textInput = null

    this.setTextInputRef = (element) => {
      this.textInput = element
    }

    this.focusTextInput = () => {
      // Focus the text input using the raw DOM API
      if (this.textInput) this.textInput.focus()
    }
  }

  callbackPostFileModalClose() {
    this.setState({
      bDeleteModalOpen: false,
    })
  }

  callbackPostFileModalConfirm = async (data) => {
    this.setState({
      bDeleteModalOpen: false,
    })

    try {
      const mysch = axios.get(`/api/ScheduleGame/delete/${this.state.modal_id}/${data.value}`)
      location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  detectKey = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      this.insert_comment()
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  handleChange_dota2_roles = (dota2_roles_box) => {
    this.setState({ dota2_roles_box })
  }

  onChange = () => {
    let tmpState = this.state.show_more_comments

    if (!this.state.show_more_comments) {
      this.pullComments()
    }
    this.setState({
      show_more_comments: !this.state.show_more_comments,
    })
    if (!tmpState) {
      this.focusTextInput()
    }
  }

  componentDidMount() {
    const self = this
    const { schedule_game } = this.props.props

    const getCommentsCount = async function() {
      try {
        const myCommentsCount = await axios.get(`/api/comments/scheduled_gamesCount/${schedule_game.id}`)
        if (myCommentsCount.data.no_of_comments[0].no_of_comments != 0) {
          self.state.zero_comments = true
          self.state.comment_total = myCommentsCount.data.no_of_comments[0].no_of_comments
        }
      } catch (error) {
        console.log(error)
      }
    }

    const getNumberofAttendees = async function() {
      try {
        const getwhoisAttending = await axios.get(`/api/attendees/role_call/${schedule_game.id}`)
        for (var i = 0; i < getwhoisAttending.data.role_call.length; i++) {
          self.state.attendees_profiles.push(getwhoisAttending.data.role_call[i])
          switch (i) {
            case 0:
              self.state.show_one_profile = true
              break
            case 1:
              self.state.show_two_profile = true
              break
            case 2:
              self.state.show_three_profile = true
              break
            case 3:
              self.state.show_four_profile = true
              break
            case 4:
              self.state.show_five_profile = true
              break
            case 5:
              self.state.show_more_profile = true
              break
          }
        }

        const get_if_im_Attending = await axios.get(`/api/attendees/myattendance/${schedule_game.id}`)
        if (get_if_im_Attending.data.myattendance.length == 0) {
          //You're not approved or pending
          self.state.show_attending = false
          self.state.show_invite = true
          self.state.show_full = false
          self.state.show_pending = false
        } else if (get_if_im_Attending.data.myattendance[0].type == 1) {
          // You're approved
          self.state.show_attending = true
          self.state.show_invite = false
          self.state.show_full = false
          self.state.show_pending = false
        } else if (get_if_im_Attending.data.myattendance[0].type == 3) {
          //You're pending
          self.state.show_attending = false
          self.state.show_invite = false
          self.state.show_full = false
          self.state.show_pending = true
        }

        const getmyDota2Position = await axios.get(`/api/attendees/game_positions/${schedule_game.id}`)
        if (getmyDota2Position.data.game_position_of_dota_2_position_ones[0].no_of_dota_2_position_ones != 0) {
          self.state.show_dota_2_pos_one = true
          self.state.show_dota_2_position = true
          self.state.dota_2_pos_one_count = getmyDota2Position.data.game_position_of_dota_2_position_ones[0].no_of_dota_2_position_ones
        }
        if (getmyDota2Position.data.game_position_of_dota_2_position_twos[0].no_of_dota_2_position_twos != 0) {
          self.state.show_dota_2_pos_two = true
          self.state.show_dota_2_position = true
          self.state.dota_2_pos_two_count = getmyDota2Position.data.game_position_of_dota_2_position_twos[0].no_of_dota_2_position_twos
        }
        if (getmyDota2Position.data.game_position_of_dota_2_position_threes[0].no_of_dota_2_position_threes != 0) {
          self.state.show_dota_2_pos_three = true
          self.state.show_dota_2_position = true
          self.state.dota_2_pos_three_count =
            getmyDota2Position.data.game_position_of_dota_2_position_threes[0].no_of_dota_2_position_threes
        }
        if (getmyDota2Position.data.game_position_of_dota_2_position_fours[0].no_of_dota_2_position_fours != 0) {
          self.state.show_dota_2_pos_four = true
          self.state.show_dota_2_position = true
          self.state.dota_2_pos_four_count = getmyDota2Position.data.game_position_of_dota_2_position_fours[0].no_of_dota_2_position_fours
        }
        if (getmyDota2Position.data.game_position_of_dota_2_position_fives[0].no_of_dota_2_position_fives != 0) {
          self.state.show_dota_2_pos_five = true
          self.state.show_dota_2_position = true
          self.state.dota_2_pos_five_count = getmyDota2Position.data.game_position_of_dota_2_position_fives[0].no_of_dota_2_position_fives
        }

        if (schedule_game.limit != 42) {
          //If its not an unlimited game
          self.state.show_attendees = true //Display the count ie 1 of 5
          const getNumberofAttendees = await axios.get(`/api/attendees/attending/${schedule_game.id}`) //Get the total
          if (getNumberofAttendees.data.allAttendees[0].no_of_allAttendees != 0) {
            self.state.attendees_count = getNumberofAttendees.data.allAttendees[0].no_of_allAttendees
            if (getNumberofAttendees.data.allAttendees[0].no_of_allAttendees >= schedule_game.limit) {
              self.state.show_attending = false
              self.state.show_invite = false
              self.state.show_full = true
              self.state.show_pending = false
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
      self.forceUpdate()
    }

    if (schedule_game.visibility == 4) {
      this.state.visibility_hidden_lnk = true
    }

    if (this.props.props != undefined) {
      if (this.props.props.props != undefined) {
        if (
          this.props.props.props.match.params.id != undefined &&
          this.props.props.props.match.params.id != '' &&
          this.props.props.show_single == true
        ) {
          this.onChange()
        }
      }
    }

    if (this.props != undefined) {
      if (this.props.props.user != undefined) {
        if (this.props.props.user.userInfo != undefined) {
          if (this.props.props.user.userInfo.id == schedule_game.user_id) {
            this.state.myPost = true
            this.state.approval_btn = true
          }
        }
      }
    }

    if (schedule_game.region != '' && schedule_game.region != null) {
      this.state.show_region = true
    }
    if (schedule_game.experience != '' && schedule_game.experience != null) {
      this.state.show_experience = true
    }
    if (schedule_game.platform != '' && schedule_game.platform != null) {
      this.state.show_platform = true
    }
    if (schedule_game.description != '' && schedule_game.description != null) {
      this.state.show_description = true
    }
    if (schedule_game.other != '' && schedule_game.other != null) {
      this.state.show_other = true
    }

    switch (schedule_game.visibility) {
      case 1:
        this.state.visibility = 'Public'
        break
      case 2:
        this.state.visibility = 'Friends'
        break
      case 3:
        this.state.visibility = 'Group'
        break
      case 4:
        this.state.visibility = 'Hidden'
        break
    }

    var myExpiry = moment(schedule_game.expiry, 'YYYY-MM-DD HH:mm:ssZ')
    const now = moment()

    if (now.isAfter(myExpiry)) {
      this.state.duration = 'expired!'
    } else {
      this.state.duration = moment.duration(myExpiry.diff(now)).humanize()
    }

    this.state.start_date = moment(schedule_game.start_date_time, 'YYYY-MM-DD HH:mm:ssZ').local()
    this.state.end_date = moment(schedule_game.end_date_time, 'YYYY-MM-DD HH:mm:ssZ').local()

    if (schedule_game.dota2_roles != null && schedule_game.dota2_roles != '') {
      this.state.show_Dota_2_roles_selector = true
      var arrRoles = ''
      var tmp = []

      arrRoles = schedule_game.dota2_roles.split(',')
      var tmp_str = ''
      for (var i = 0; i < arrRoles.length; i++) {
        var value = 1
        switch (arrRoles[i].trim()) {
          case 'Position 1':
            value = 1
            tmp_str = 'Pos 1'
            break
          case 'Position 2':
            value = 2
            tmp_str = 'Pos 2'
            break
          case 'Position 3':
            value = 3
            tmp_str = 'Pos 3'
            break
          case 'Position 4':
            value = 4
            tmp_str = 'Pos 4'
            break
          case 'Position 5':
            value = 5
            tmp_str = 'Pos 5'
            break
        }
        const newOption = createOption(tmp_str, value)
        tmp.push(newOption)
      }
      this.setState({ dota_2_roles_selector: tmp })
    }

    if (schedule_game.dota2_medal_ranks != '' && schedule_game.dota2_medal_ranks != null) {
      this.state.show_dota2_medal_ranks = true
    }
    if (schedule_game.dota2_server_regions != '' && schedule_game.dota2_server_regions != null) {
      this.state.show_dota2_server_regions = true
    }
    if (schedule_game.dota2_roles != '' && schedule_game.dota2_roles != null) {
      this.state.show_dota2_roles = true
    }

    getCommentsCount()
    getNumberofAttendees()
  }

  onFocus = () => {
    if (this.state.pull_once) {
      this.pullComments()
    }
    this.setState({
      pull_once: false,
      show_more_comments: true,
    })
  }

  pullComments = () => {
    const self = this
    const { schedule_game } = this.props.props

    const getComments = async function() {
      try {
        const myComments = await axios.get(`/api/comments/scheduled_games/${schedule_game.id}`)
        self.setState({
          myComments: myComments.data.allComments,
          value: '',
          comment_total: myComments.data.allComments.length,
        })
      } catch (error) {
        console.log(error)
      }
    }
    getComments()
  }

  showComment = () => {
    if (this.state.myComments != undefined) {
      return this.state.myComments.map((item, index) => {
        return <IndividualComment comment={item} key={index} user={this.props.props.user} />
      })
    }
  }

  insert_comment = () => {
    const { schedule_game } = this.props.props
    const self = this

    if (this.state.value == '') {
      return
    }
    if (this.state.value.trim() == '') {
      this.setState({
        value: '',
      })
      return
    }

    this.onFocus()

    const saveComment = async function() {
      try {
        const postComment = await axios.post('/api/comments', {
          content: self.state.value.trim(),
          schedule_games_id: schedule_game.id,
        })
        self.setState({
          myComments: [],
        })
        self.pullComments()
        self.setState({
          comment_total: self.state.comment_total + 1,
          zero_comments: true,
        })
        if (schedule_game.user_id != self.props.props.user.userInfo.id) {
          const addPostLike = axios.post('/api/notifications/addComment', {
            other_user_id: schedule_game.user_id,
            schedule_games_id: schedule_game.id,
            comment_id: postComment.data.id,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    saveComment()
  }

  delete_sch = async (id) => {
    try {
      const all_attendees = await axios.get(`/api/attendees/attending/${id}`)
      if (all_attendees.data.allAttendees[0].no_of_allAttendees > 0) {
        this.setState({
          bDeleteModalOpen: true,
          modal_id: id,
        })
      } else {
        this.showAlert_delete()
      }
    } catch (error) {
      console.log(error)
    }
  }

  enrollinGame = async () => {
    var myDota2_roles = ''

    if (this.state.show_Dota_2_roles_selector) {
      if (this.state.dota2_roles_box != '' && this.state.dota2_roles_box != null) {
        for (var i = 0; i < this.state.dota2_roles_box.length; i++) {
          switch (this.state.dota2_roles_box[i].value) {
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
      } else {
        toast.success(<Toast_style text={'Sorry mate, you need to select a role'} />)
        return
      }
    }
    try {
      const getNumberofAttendees = await axios.get(`/api/attendees/attending/${this.props.props.schedule_game.schedule_games_id}`)
      if (
        this.props.props.schedule_game.limit == 42 ||
        getNumberofAttendees.data.allAttendees[0].no_of_allAttendees < this.props.props.schedule_game.limit
      ) {
        const savemySpot = axios.post('/api/attendees/savemySpot', {
          schedule_games_id: this.props.props.schedule_game.schedule_games_id,
          value_one: { dota2_medal_ranks: 'Herald' },
          value_two: { dota2_server_regions: 'North Amerrica' },
          value_three: { dota2_server_regions: 'Position 1, Position 2' },
          value_four: null,
          value_five: null,
        })
        this.setState({
          show_invite: false,
          show_attending: false,
          show_full: false,
          show_pending: true,
        })
      } else {
        toast.success(<Toast_style text={'Sorry mate, the spot got filled up! You are NOT in :('} />)
        this.setState({
          show_invite: false,
          show_attending: false,
          show_full: true,
          show_pending: false,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  disenrollinGame = () => {
    try {
      const getNumberofAttendees = axios.get(`/api/attendees/removeattending/${this.props.props.schedule_game.schedule_games_id}`)
      exitGameGroup(this.props.props.schedule_game.schedule_games_id)
      this.setState({
        show_invite: true,
        show_attending: false,
        show_full: false,
        show_pending: false,
      })
    } catch (error) {
      console.log(error)
    }
    this.state.show_dota_2_pos_one = false
    this.state.show_dota_2_pos_two = false
    this.state.show_dota_2_pos_three = false
    this.state.show_dota_2_pos_four = false
    this.state.show_dota_2_pos_five = false
  }

  redirect_link = () => {
    this.setState({ redirect_PlayerList: true })
  }

  approvals = () => {
    this.setState({ redirect_Approvals: true })
  }

  showAlert() {
    const getAlert = () => (
      <SweetAlert
        danger
        showCancel
        title='Are you sure you wish to remove yourself from this Game?'
        confirmBtnText='Make it so!'
        confirmBtnBsStyle='danger'
        focusCancelBtn={true}
        focusConfirmBtn={false}
        showCloseButton={true}
        onConfirm={() => this.hideAlert('true')}
        onCancel={() => this.hideAlert('false')}></SweetAlert>
    )

    this.setState({
      alert: getAlert(),
    })
  }

  showAlert_delete() {
    const getAlert = () => (
      <SweetAlert
        danger
        showCancel
        title='Are you sure you wish to trash this game boss?'
        confirmBtnText='Make it so!'
        confirmBtnBsStyle='danger'
        focusCancelBtn={true}
        focusConfirmBtn={false}
        showCloseButton={true}
        onConfirm={() => this.hideAlert('delete_true')}
        onCancel={() => this.hideAlert('false')}></SweetAlert>
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
      this.disenrollinGame()
    }
    if (text == 'delete_true') {
      try {
        const tmp = null
        const mysch = axios.get(`/api/ScheduleGame/delete/${this.props.props.schedule_game.schedule_games_id}/${tmp}`)
        location.reload()
      } catch (error) {
        console.log(error)
      }
    }
  }

  render() {
    const { schedule_game } = this.props.props
    console.log(schedule_game)

    if (this.state.redirect_PlayerList === true) {
      var tmp = `/playerList/${this.props.props.schedule_game.schedule_games_id}`
      return <Redirect push to={tmp} />
    }
    if (this.state.redirect_Approvals === true) {
      var tmp = `/scheduledGamesApprovals/${this.props.props.schedule_game.schedule_games_GUID}`
      return <Redirect push to={tmp} />
    }

    return (
      <div className='padding-container'>
        {this.state.alert}
        <div className='grey-container'>
          <div className='update-info'>
            <div className='game-name-display'>
              <h3> {schedule_game.game_name} </h3>
              {this.state.approval_btn && (
                <div
                  className='approval-seal'
                  onClick={this.approvals}
                  style={{
                    backgroundImage: `url('https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/seal-2512363_small.png')`,
                  }}>
                  {' '}
                </div>
              )}
              <div className='comments-stats'>
                {this.state.zero_comments && (
                  <div className='comments-statz' onClick={this.onChange}>
                    {' '}
                    {this.state.comment_total > 1 ? `${this.state.comment_total} comments` : `${this.state.comment_total} comment`}{' '}
                  </div>
                )}
                {!this.state.zero_comments && (
                  <div className='comments-statz' onClick={this.focusTextInput}>
                    {' '}
                    No comments
                  </div>
                )}
              </div>
              {!this.state.myPost && (
                <h6>
                  {' '}
                  <Link to={`/profile/${schedule_game.alias}`} style={{ textDecoration: 'none', color: 'white' }}>
                    {' '}
                    Posted by {schedule_game.alias}
                  </Link>
                </h6>
              )}
              {this.state.myPost && (
                <div
                  className='delete-icon'
                  onClick={() => {
                    this.delete_sch(schedule_game.id)
                  }}>
                  <i className='fas fa-trash-alt'></i>
                </div>
              )}
            </div>
            <DeleteScheduleGameModal
              bOpen={this.state.bDeleteModalOpen}
              callbackClose={this.callbackPostFileModalClose}
              callbackConfirm={this.callbackPostFileModalConfirm}></DeleteScheduleGameModal>
            <div className='expiry-info'>Expiry:&nbsp;{this.state.duration}</div>
            <div className='myFields'>
              {this.state.show_region && <div> Region/s: {schedule_game.region} </div>}
              <div> Start Time: {this.state.start_date.format('Do MMM YY, h:mm a')} </div>
              <div> End Time: {this.state.end_date.format('Do MMM YY, h:mm a')} </div>
              {this.state.show_experience && <div> Experience: {schedule_game.experience} </div>}
              {this.state.show_platform && <div> Platform: {schedule_game.platform} </div>}
              {this.state.show_other && <div> Other: {schedule_game.other} </div>}
              {this.state.show_dota2_medal_ranks && <div>Medal Ranks: {schedule_game.dota2_medal_ranks} </div>}
              {this.state.show_dota2_server_regions && <div>Server Regions: {schedule_game.dota2_server_regions} </div>}
              {this.state.show_dota2_roles && <div>Roles: {schedule_game.dota2_roles} </div>}
              {!this.state.visibility_hidden_lnk && <div> Visibility: {this.state.visibility} </div>}
              {this.state.visibility_hidden_lnk && (
                <div>
                  {' '}
                  Visibility: <Link to={`/scheduledGames/${schedule_game.id}`}> {this.state.visibility}</Link> (Send this link to players
                  inorder to join this game){' '}
                </div>
              )}
              {this.state.show_description && <div> Description: {schedule_game.description} </div>}
            </div>
          </div>
          <div className='invitation-panel'>
            {this.state.show_invite && (
              <div className='invitation-link'>
                <div className='hack-text' onClick={() => this.enrollinGame()}>
                  <i className='fas fa-dungeon'></i>&nbsp;Join Queue
                </div>
                {this.state.show_Dota_2_roles_selector && (
                  <div className='dota2-roles'>
                    <Select
                      onChange={this.handleChange_dota2_roles}
                      options={this.state.dota_2_roles_selector}
                      className='dota2-roles-box'
                      placeholder='Select Role/s'
                      isClearable
                      isMulti
                    />
                  </div>
                )}
              </div>
            )}
            {this.state.show_full && (
              <div className='invitation-link'>
                <div className='hack-text2'>
                  <i className='fas fa-door-closed'></i>&nbsp;Sorry it's <span style={{ color: '#f44336' }}>&nbsp; full :( </span>
                </div>
              </div>
            )}
            {this.state.show_attending && (
              <div className='invitation-link'>
                <div className='hack-text3' onClick={() => this.showAlert()}>
                  <i className='fas fa-door-closed'></i>
                  <span style={{ color: '#4CAF50' }}>&nbsp;Leave game</span>
                </div>
              </div>
            )}
            {this.state.show_pending && (
              <div className='invitation-link'>
                <div className='hack-text3' onClick={() => this.showAlert()}>
                  <i className='fas fa-door-closed'></i>
                  <span style={{ color: '#2196F3' }}>&nbsp;Waiting on host...</span>
                </div>
              </div>
            )}
            {this.state.show_dota_2_position && (
              <div className='dota2-roles-answers'>
                {this.state.dota_2_position}
                {this.state.show_dota_2_pos_one && (
                  <div className='dota_2_position_one_text'>
                    {' '}
                    1
                    <div className={`noti-number ${this.state.dota_2_pos_one_count > 0 ? 'active' : ''}`}>
                      {' '}
                      {this.state.dota_2_pos_one_count}
                    </div>{' '}
                  </div>
                )}

                {this.state.show_dota_2_pos_one && this.state.show_dota_2_pos_two && <div className='dot-sep'>,</div>}
                {this.state.show_dota_2_pos_two && (
                  <div className='dota_2_position_two_text'>
                    {' '}
                    2
                    <div className={`noti-number ${this.state.dota_2_pos_two_count > 0 ? 'active' : ''}`}>
                      {' '}
                      {this.state.dota_2_pos_two_count}
                    </div>
                  </div>
                )}

                {(this.state.show_dota_2_pos_one || this.state.show_dota_2_pos_two) && this.state.show_dota_2_pos_three && (
                  <div className='dot-sep'>,</div>
                )}
                {this.state.show_dota_2_pos_three && (
                  <div className='dota_2_position_three_text'>
                    {' '}
                    3
                    <div className={`noti-number ${this.state.dota_2_pos_three_count > 0 ? 'active' : ''}`}>
                      {' '}
                      {this.state.dota_2_pos_three_count}
                    </div>{' '}
                  </div>
                )}

                {(this.state.show_dota_2_pos_one || this.state.show_dota_2_pos_two || this.state.show_dota_2_pos_three) &&
                  this.state.show_dota_2_pos_four && <div className='dot-sep'>,</div>}
                {this.state.show_dota_2_pos_four && (
                  <div className='dota_2_position_four_text'>
                    {' '}
                    4
                    <div className={`noti-number ${this.state.dota_2_pos_four_count > 0 ? 'active' : ''}`}>
                      {' '}
                      {this.state.dota_2_pos_four_count}
                    </div>{' '}
                  </div>
                )}

                {(this.state.show_dota_2_pos_one ||
                  this.state.show_dota_2_pos_two ||
                  this.state.show_dota_2_pos_three ||
                  this.state.show_dota_2_pos_four) &&
                  this.state.show_dota_2_pos_five && <div className='dot-sep'>,</div>}
                {this.state.show_dota_2_pos_five && (
                  <div className='dota_2_position_five_text'>
                    {' '}
                    5
                    <div className={`noti-number ${this.state.dota_2_pos_five_count > 0 ? 'active' : ''}`}>
                      {' '}
                      {this.state.dota_2_pos_five_count}
                    </div>
                  </div>
                )}
              </div>
            )}
            {this.state.show_one_profile && (
              <div className='attendees-one'>
                <Link
                  to={`/profile/${this.state.attendees_profiles[0].alias}`}
                  className='user-img'
                  style={{
                    backgroundImage: `url('${this.state.attendees_profiles[0].profile_img}')`,
                  }}></Link>
              </div>
            )}
            {this.state.show_two_profile && (
              <div className='attendees-two'>
                <Link
                  to={`/profile/${this.state.attendees_profiles[1].alias}`}
                  className='user-img'
                  style={{
                    backgroundImage: `url('${this.state.attendees_profiles[1].profile_img}')`,
                  }}></Link>
              </div>
            )}
            {this.state.show_three_profile && (
              <div className='attendees-three'>
                <Link
                  to={`/profile/${this.state.attendees_profiles[2].alias}`}
                  className='user-img'
                  style={{
                    backgroundImage: `url('${this.state.attendees_profiles[2].profile_img}')`,
                  }}></Link>
              </div>
            )}
            {this.state.show_four_profile && (
              <div className='attendees-four'>
                <Link
                  to={`/profile/${this.state.attendees_profiles[3].alias}`}
                  className='user-img'
                  style={{
                    backgroundImage: `url('${this.state.attendees_profiles[3].profile_img}')`,
                  }}></Link>
              </div>
            )}
            {this.state.show_five_profile && (
              <div className='attendees-five'>
                <Link
                  to={`/profile/${this.state.attendees_profiles[4].alias}`}
                  className='user-img'
                  style={{
                    backgroundImage: `url('${this.state.attendees_profiles[4].profile_img}')`,
                  }}></Link>
              </div>
            )}
            {this.state.show_more_profile && (
              <div className='attendees-more'>
                <div
                  className='user-img'
                  onClick={this.redirect_link}
                  style={{
                    backgroundImage: `url('https://mygame-media.s3-ap-southeast-2.amazonaws.com/stock_images/5%2B.png')`,
                  }}>
                  {' '}
                </div>
              </div>
            )}
            {this.state.show_attendees && (
              <div className='attendees-count'>
                {this.state.attendees_count} out of {schedule_game.limit}
              </div>
            )}
            {!this.state.show_attendees && <div className='attendees-count'>Unlimited</div>}
          </div>
          <div className='compose-comment'>
            <textarea
              name='name'
              rows={8}
              cols={80}
              placeholder='Write a comment...'
              value={this.state.value}
              onChange={this.handleChange}
              maxLength='254'
              onKeyDown={this.detectKey}
              ref={this.setTextInputRef}
              onFocus={this.onFocus}
            />
            <div className='buttons'>
              <div className='repost-btn' onClick={this.insert_comment}>
                <i className='fas fa-reply' />{' '}
              </div>
            </div>
          </div>
          <div className='comments'>
            {this.state.show_more_comments && <div className='show-individual-comments'>{this.showComment()}</div>}
          </div>
        </div>
      </div>
    )
  }
}
