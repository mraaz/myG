import React, { Component } from 'react'
import Select from 'react-select'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class IndividualFriend extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    let { friend, lastRow } = this.props
    var show_profile_img = false
    if (friend.profile_img != null) {
      show_profile_img = true
    }
    return (
      <div className='invitation-info'>
        {show_profile_img && (
          <Link
            to={`/profile/${friend.alias}`}
            className='user-img'
            style={{
              backgroundImage: `url('${friend.profile_img}')`,
            }}></Link>
        )}
        {!show_profile_img && (
          <Link
            to={`/profile/${friend.alias}`}
            className='user-img'
            style={{
              backgroundImage: `url('https://mygame-media.s3-ap-southeast-2.amazonaws.com/default_user/new-user-profile-picture.png')`,
            }}></Link>
        )}
        <div className='user-info'>
          {`${friend.first_name}`} {`${friend.last_name}`} ({`${friend.alias}`})
        </div>
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
