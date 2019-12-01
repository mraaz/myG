import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import IndividualComment from './IndividualComment'
import DeleteScheduleGameModal from './DeleteScheduleGameModal'

export default class ScheduledGamePost_Default extends Component {
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
    }

    this.callbackPostFileModalClose = this.callbackPostFileModalClose.bind(this)
    this.callbackPostFileModalConfirm = this.callbackPostFileModalConfirm.bind(
      this
    )

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
      const mysch = axios.get(
        `/api/ScheduleGame/delete/${this.state.modal_id}/${data.value}`
      )
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
      event.preventDefault()
      event.stopPropagation()
      this.insert_comment()
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
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

  componentWillMount() {
    const self = this
    const { schedule_game } = this.props.props

    const getCommentsCount = async function() {
      try {
        const myCommentsCount = await axios.get(
          `/api/comments/scheduled_gamesCount/${schedule_game.id}`
        )
        if (myCommentsCount.data.no_of_comments[0].no_of_comments != 0) {
          self.state.zero_comments = true
          self.state.comment_total =
            myCommentsCount.data.no_of_comments[0].no_of_comments
        }
      } catch (error) {
        console.log(error)
      }
    }

    const getNumberofAttendees = async function() {
      try {
        const getwhoisAttending = await axios.get(
          `/api/attendees/role_call/${schedule_game.id}`
        )
        for (var i = 0; i < getwhoisAttending.data.role_call.length; i++) {
          self.state.attendees_profiles.push(
            getwhoisAttending.data.role_call[i]
          )
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

        const get_if_im_Attending = await axios.get(
          `/api/attendees/myattendance/${schedule_game.id}`
        )
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

        if (schedule_game.limit != 42) {
          //If its not an unlimited game
          self.state.show_attendees = true //Display the count ie 1 of 5
          const getNumberofAttendees = await axios.get(
            `/api/attendees/attending/${schedule_game.id}`
          ) //Get the total
          if (
            getNumberofAttendees.data.allAttendees[0].no_of_allAttendees != 0
          ) {
            self.state.attendees_count =
              getNumberofAttendees.data.allAttendees[0].no_of_allAttendees
            if (
              getNumberofAttendees.data.allAttendees[0].no_of_allAttendees >=
              schedule_game.limit
            ) {
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

    this.state.start_date = moment(
      schedule_game.start_date_time,
      'YYYY-MM-DD HH:mm:ssZ'
    ).local()
    this.state.end_date = moment(
      schedule_game.end_date_time,
      'YYYY-MM-DD HH:mm:ssZ'
    ).local()

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
        const myComments = await axios.get(
          `/api/comments/scheduled_games/${schedule_game.id}`
        )
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
        return (
          <IndividualComment
            comment={item}
            key={index}
            user={this.props.props.user}
          />
        )
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
    const tmp = null

    try {
      const all_attendees = await axios.get(`/api/attendees/attending/${id}`)
      if (all_attendees.data.allAttendees[0].no_of_allAttendees > 0) {
        this.setState({
          bDeleteModalOpen: true,
          modal_id: id,
        })
      } else {
        if (window.confirm('Are you sure you wish to trash this game boss?')) {
          const mysch = axios.get(`/api/ScheduleGame/delete/${id}/${tmp}`)
          location.reload()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  enrollinGame = async () => {
    try {
      const getNumberofAttendees = await axios.get(
        `/api/attendees/attending/${this.props.props.schedule_game.id}`
      )
      if (
        this.props.props.schedule_game.limit == 42 ||
        getNumberofAttendees.data.allAttendees[0].no_of_allAttendees <
          this.props.props.schedule_game.limit
      ) {
        const savemySpot = axios.post('/api/attendees/savemySpot', {
          schedule_games_id: this.props.props.schedule_game.id,
          notify: true,
        })
        this.setState({
          show_invite: false,
          show_attending: false,
          show_full: false,
          show_pending: true,
        })
      } else {
        window.alert('Sorry mate, the spot got filled up! You are NOT in :(')
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
      const getNumberofAttendees = axios.get(
        `/api/attendees/removeattending/${this.props.props.schedule_game.id}`
      )
      this.setState({
        show_invite: true,
        show_attending: false,
        show_full: false,
        show_pending: false,
      })

      const no_vacany = axios.post('/api/ScheduleGame/update_vacany/', {
        vacancy: true,
        id: this.props.props.schedule_game.id,
      })
    } catch (error) {
      console.log(error)
    }
  }

  redirect_link = () => {
    this.setState({ redirect_PlayerList: true })
  }

  approvals = () => {
    this.setState({ redirect_Approvals: true })
  }

  render() {
    const { schedule_game } = this.props.props

    if (this.state.redirect_PlayerList === true) {
      var tmp = `/playerList/${this.props.props.schedule_game.id}`
      return <Redirect push to={tmp} />
    }
    if (this.state.redirect_Approvals === true) {
      var tmp = `/scheduledGamesApprovals/${this.props.props.schedule_game.schedule_games_GUID}`
      return <Redirect push to={tmp} />
    }

    return (
      <div className='padding-container'>
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
                    {this.state.comment_total > 1
                      ? `${this.state.comment_total} comments`
                      : `${this.state.comment_total} comment`}{' '}
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
                  <Link
                    to={`/profile/${schedule_game.user_id}`}
                    style={{ textDecoration: 'none', color: 'white' }}>
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
              callbackConfirm={
                this.callbackPostFileModalConfirm
              }></DeleteScheduleGameModal>
            <div className='expiry-info'>
              Expiry:&nbsp;{this.state.duration}
            </div>
            <div className='myFields'>
              {this.state.region && (
                <div> Region/s: {schedule_game.region} </div>
              )}
              <div>
                {' '}
                Start Time: {this.state.start_date.format(
                  'Do MMM YY, h:mm a'
                )}{' '}
              </div>
              <div>
                {' '}
                End Time: {this.state.end_date.format('Do MMM YY, h:mm a')}{' '}
              </div>
              {this.state.experience && (
                <div> Experience: {schedule_game.experience} </div>
              )}
              {this.state.platform && (
                <div> Platform: {schedule_game.platform} </div>
              )}
              {this.state.other && <div> Other: {schedule_game.other} </div>}
              {!this.state.visibility_hidden_lnk && (
                <div> Visibility: {this.state.visibility} </div>
              )}
              {this.state.visibility_hidden_lnk && (
                <div>
                  {' '}
                  Visibility:{' '}
                  <Link to={`/scheduledGames/${schedule_game.id}`}>
                    {' '}
                    {this.state.visibility}
                  </Link>{' '}
                  (Send this link to players inorder to join this game){' '}
                </div>
              )}
              {this.state.description && (
                <div> Description: {schedule_game.description} </div>
              )}
            </div>
          </div>
          <div className='invitation-panel'>
            {this.state.show_invite && (
              <div className='invitation-link'>
                <div className='hack-text' onClick={() => this.enrollinGame()}>
                  <i className='fas fa-dungeon'></i>&nbsp;Join Queue
                </div>
              </div>
            )}
            {this.state.show_full && (
              <div className='invitation-link'>
                <div className='hack-text2'>
                  <i className='fas fa-door-closed'></i>&nbsp;Sorry it's{' '}
                  <span style={{ color: '#f44336' }}>&nbsp; full :( </span>
                </div>
              </div>
            )}
            {this.state.show_attending && (
              <div className='invitation-link'>
                <div
                  className='hack-text3'
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you wish to remove yourself from this Game?'
                      )
                    )
                      this.disenrollinGame()
                  }}>
                  <i className='fas fa-door-closed'></i>
                  <span style={{ color: '#4CAF50' }}>&nbsp;Leave game</span>
                </div>
              </div>
            )}
            {this.state.show_pending && (
              <div className='invitation-link'>
                <div
                  className='hack-text3'
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you wish to remove yourself from this Game?'
                      )
                    )
                      this.disenrollinGame()
                  }}>
                  <i className='fas fa-door-closed'></i>
                  <span style={{ color: '#2196F3' }}>
                    &nbsp;Waiting on host...
                  </span>
                </div>
              </div>
            )}
            {this.state.show_one_profile && (
              <div className='attendees-one'>
                <Link
                  to={`/profile/${this.state.attendees_profiles[0].user_id}`}
                  className='user-img'
                  style={{
                    backgroundImage: `url('${this.state.attendees_profiles[0].profile_img}')`,
                  }}></Link>
              </div>
            )}
            {this.state.show_two_profile && (
              <div className='attendees-two'>
                <Link
                  to={`/profile/${this.state.attendees_profiles[1].user_id}`}
                  className='user-img'
                  style={{
                    backgroundImage: `url('${this.state.attendees_profiles[1].profile_img}')`,
                  }}></Link>
              </div>
            )}
            {this.state.show_three_profile && (
              <div className='attendees-three'>
                <Link
                  to={`/profile/${this.state.attendees_profiles[2].user_id}`}
                  className='user-img'
                  style={{
                    backgroundImage: `url('${this.state.attendees_profiles[2].profile_img}')`,
                  }}></Link>
              </div>
            )}
            {this.state.show_four_profile && (
              <div className='attendees-four'>
                <Link
                  to={`/profile/${this.state.attendees_profiles[3].user_id}`}
                  className='user-img'
                  style={{
                    backgroundImage: `url('${this.state.attendees_profiles[3].profile_img}')`,
                  }}></Link>
              </div>
            )}
            {this.state.show_five_profile && (
              <div className='attendees-five'>
                <Link
                  to={`/profile/${this.state.attendees_profiles[4].user_id}`}
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
            {!this.state.show_attendees && (
              <div className='attendees-count'>Unlimited</div>
            )}
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
              onKeyUp={this.detectKey}
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
            {this.state.show_more_comments && (
              <div className='show-individual-comments'>
                {this.showComment()}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
