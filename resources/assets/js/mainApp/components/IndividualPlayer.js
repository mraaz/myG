import React, { Component } from 'react'
import Select from 'react-select'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class IndividualPlayer extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    let { attendee, lastRow } = this.props
    var show_profile_img = false
    if (attendee.profile_img != null) {
      show_profile_img = true
    }
    return (
      <div className='invitation-info'>
        {show_profile_img && (
          <Link
            to={`/profile/${attendee.user_id}`}
            className='user-img'
            style={{
              backgroundImage: `url('${attendee.profile_img}')`,
            }}></Link>
        )}
        {!show_profile_img && (
          <Link
            to={`/profile/${attendee.user_id}`}
            className='user-img'
            style={{
              backgroundImage: `url('https://mygame-media.s3-ap-southeast-2.amazonaws.com/default_user/new-user-profile-picture.png')`,
            }}></Link>
        )}
        <div className='user-info'>{`${attendee.alias}`}</div>
        {!lastRow && (
          <div className='line-break'>
            <hr />
          </div>
        )}
        {lastRow && <div className='last-row'></div>}
      </div>
    )
  }
}
