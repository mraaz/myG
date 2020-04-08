import React, { Component } from 'react'
import Select from 'react-select'
import { Link } from 'react-router-dom'

export default class IndividualSearchResults extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    let { searchResults, lastRow } = this.props
    var show_profile_img = false
    if (searchResults.profile_img != null) {
      show_profile_img = true
    }
    return (
      <div className='invitation-info'>
        {show_profile_img && (
          <Link
            to={`/profile/${searchResults.alias}`}
            className='user-img'
            style={{
              backgroundImage: `url('${searchResults.profile_img}')`,
            }}></Link>
        )}
        {!show_profile_img && (
          <Link
            to={`/profile/${searchResults.alias}`}
            className='user-img'
            style={{
              backgroundImage: `url('https://mygame-media.s3-ap-southeast-2.amazonaws.com/default_user/new-user-profile-picture.png')`,
            }}></Link>
        )}
        <div className='user-info'>{`${searchResults.alias}`}</div>

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
