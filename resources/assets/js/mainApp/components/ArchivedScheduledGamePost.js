import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import IndividualComment from './IndividualComment'

const createOption = (label: string, value: int) => ({
  label,
  value,
})

export default class ArchivedScheduledGamePost extends Component {
  constructor() {
    super()
    this.state = {
      show_more_comments: false,
      value: '',
      zero_comments: false,
      comment_total: 0,
      myPost: false,
      show_attendees: false,
      attendees_count: 0,
      show_one_profile: false,
      show_two_profile: false,
      show_three_profile: false,
      show_four_profile: false,
      show_five_profile: false,
      show_more_profile: false,
      attendees_profiles: [],
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
      clash_royale_field: false,
      redirect_: false,
    }

    this.textInput = null

    this.setTextInputRef = (element) => {
      this.textInput = element
    }

    this.focusTextInput = () => {
      // Focus the text input using the raw DOM API
      if (this.textInput) this.textInput.focus()
    }
  }

  componentDidMount() {
    const self = this
    const { schedule_game } = this.props

    const getCommentsCount = async function() {
      try {
        const myCommentsCount = await axios.get(`/api/archive_comments/scheduled_gamesCount/${schedule_game.archive_schedule_game_id}`)
        if (myCommentsCount.data.no_of_comments[0].no_of_comments != 0) {
          self.setState({
            zero_comments: true,
            comment_total: myCommentsCount.data.no_of_comments[0].no_of_comments,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }

    const checkWhosPost = async function() {
      try {
        const checkWhosPost = await axios.get(`/api/ArchivemyScheduledGamesCount/${schedule_game.id}`)
        if (checkWhosPost.data.myScheduledGamesCount[0].no_of_my_posts != 0) {
          self.setState({
            myPost: true,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }

    const getNumberofAttendees = async function() {
      try {
        if (schedule_game.limit != 42) {
          self.state.show_attendees = true
          const getNumberofAttendees = await axios.get(`/api/archive_attendees/attending/${schedule_game.archive_schedule_game_id}`)
          if (getNumberofAttendees.data.allAttendees[0].no_of_allAttendees != 0) {
            self.state.attendees_count = getNumberofAttendees.data.allAttendees[0].no_of_allAttendees

            const getwhoisAttending = await axios.get(`/api/archive_attendees/role_call/${schedule_game.archive_schedule_game_id}`)
            for (var i = 0; i < getwhoisAttending.data.role_call.length; i++) {
              self.state.attendees_profiles.push(getwhoisAttending.data.role_call[i])
              switch (i) {
                case 0:
                  self.setState({ show_one_profile: true })
                  break
                case 1:
                  self.setState({ show_two_profile: true })
                  break
                case 2:
                  self.setState({ show_three_profile: true })
                  break
                case 3:
                  self.setState({ show_four_profile: true })
                  break
                case 4:
                  self.setState({ show_five_profile: true })
                  break
                case 5:
                  self.setState({ show_more_profile: true })
                  break
              }
            }
          }
        } else {
          try {
            const getwhoisAttending = await axios.get(`/api/archive_attendees/role_call/${schedule_game.archive_schedule_game_id}`)
            for (var i = 0; i < getwhoisAttending.data.role_call.length; i++) {
              self.state.attendees_profiles.push(getwhoisAttending.data.role_call[i])
              switch (i) {
                case 0:
                  self.setState({ show_one_profile: true })
                  break
                case 1:
                  self.setState({ show_two_profile: true })
                  break
                case 2:
                  self.setState({ show_three_profile: true })
                  break
                case 3:
                  self.setState({ show_four_profile: true })
                  break
                case 4:
                  self.setState({ show_five_profile: true })
                  break
                case 5:
                  self.setState({ show_more_profile: true })
                  break
              }
            }
          } catch (error) {
            console.log(error)
          }
        }
      } catch (error) {
        console.log(error)
      }
      self.forceUpdate()
    }

    getCommentsCount()
    checkWhosPost()
    getNumberofAttendees()
  }

  pullComments = () => {
    const self = this
    const { schedule_game } = this.props

    const getComments = async function() {
      try {
        const myComments = await axios.get(`/api/archive_comments/scheduled_games/${schedule_game.archive_schedule_game_id}`)
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
        return <IndividualComment comment={item} key={index} user={this.props.user} />
      })
    }
  }

  onChange = () => {
    let tmpState = this.state.show_more_comments

    if (!this.state.show_more_comments) {
      this.pullComments()
    }
    this.setState({
      show_more_comments: !this.state.show_more_comments,
    })
  }

  redirect_link = () => {
    this.setState({ redirect_: true })
  }

  render() {
    if (this.state.redirect_) {
      var tmp = `/archive_playerList/${this.props.schedule_game.archive_schedule_game_id}`
      return <Redirect push to={tmp} />
    }

    const { schedule_game } = this.props
    var region = false
    var experience = false
    var platform = false
    var description = false
    var other = false
    var visibility = 'Public'
    var dota2_medal_ranks = false
    var dota2_server_regions = false
    var dota2_roles = false

    if (schedule_game.region != '' && schedule_game.region != null) {
      region = true
    }
    if (schedule_game.experience != '' && schedule_game.experience != null) {
      experience = true
    }
    if (schedule_game.platform != '' && schedule_game.platform != null) {
      platform = true
    }
    if (schedule_game.description != '' && schedule_game.description != null) {
      description = true
    }
    if (schedule_game.other != '' && schedule_game.other != null) {
      other = true
    }

    if (schedule_game.dota2_medal_ranks != '' && schedule_game.dota2_medal_ranks != null) {
      dota2_medal_ranks = true
    }
    if (schedule_game.dota2_server_regions != '' && schedule_game.dota2_server_regions != null) {
      dota2_server_regions = true
    }
    if (schedule_game.dota2_roles != '' && schedule_game.dota2_roles != null) {
      dota2_roles = true
    }

    switch (schedule_game.visibility) {
      case 1:
        visibility = 'Public'
        break
      case 4:
        visibility = 'Private'
        break
    }

    var myExpiry = moment(schedule_game.expiry, 'YYYY-MM-DD HH:mm:ssZ')
    const now = moment()

    if (now.isAfter(myExpiry)) {
      var duration = 'expired!'
    } else {
      var duration = moment.duration(myExpiry.diff(now)).humanize()
    }

    var myStartDateTime = moment(schedule_game.start_date_time, 'YYYY-MM-DD HH:mm:ssZ').local()
    var myEndDateTime = moment(schedule_game.end_date_time, 'YYYY-MM-DD HH:mm:ssZ').local()

    return (
      <div className='gamesPosts'>
        <div className='padding-container'>
          <div className='grey-container'>
            <div className='update-info'>
              <div className='game-name-display'>
                <h3> {schedule_game.game_name} </h3>
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
              </div>
              <div className='expiry-info'>Expiry:&nbsp;{duration}</div>
              <div className='myFields'>
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
                <div> Visibility: {visibility} </div>
                {description && <div> Description: {schedule_game.description} </div>}
                <div>Reason for Cancelling: {schedule_game.reason_for_cancel} </div>
              </div>
            </div>
            <div className='invitation-panel'>
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
                    }}>
                    >
                  </Link>
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
                placeholder='No more comments, this game is cancelled.'
                value={this.state.value}
                disabled={true}
              />
              <div className='buttons'>
                <div className='repost-btn'>
                  <i className='fas fa-reply' />{' '}
                </div>
              </div>
            </div>
            <div className='comments'>
              {this.state.show_more_comments && <div className='show-individual-comments'>{this.showComment()}</div>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
