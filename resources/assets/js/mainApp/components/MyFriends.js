import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import IndividualFriend from './IndividualFriend'

export default class MyFriends extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    const self = this

    const getFriends = async function() {
      try {
        const getFriends = await axios.get('/api/friends/allmyFriends')
        self.setState({
          allMyFriends: getFriends.data.showallMyFriends,
        })
      } catch (error) {
        console.log(error)
      }
    }
    getFriends()
  }

  showFriends = () => {
    if (this.state.allMyFriends != undefined) {
      const rowLen = this.state.allMyFriends.length
      var lastRow = false
      if (rowLen == 0) {
        return <div className='invitation-info'>No friends :(</div>
      }
      return this.state.allMyFriends.map((item, index) => {
        if (rowLen === index + 1) {
          lastRow = true
        }
        return <IndividualFriend friend={item} key={index} lastRow={lastRow} />
      })
    }
  }

  render() {
    if (this.state.allMyFriends !== undefined) {
      return (
        <section id='invitation-page'>
          <div className='content-area invitation-page'>
            <div id='header'>
              <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/headers/headers_v1-16.png' />
            </div>
            <div className='padding-container'>
              <div className='invitation-grey-container'>
                <h3>
                  myFriends - (
                  {this.state.allMyFriends.length == 1
                    ? this.state.allMyFriends.length + ' friend'
                    : this.state.allMyFriends.length + ' friends'}
                  )
                </h3>
                <div className='padding-container'></div>
                <div className='invitation-container'>{this.showFriends()}</div>
              </div>
            </div>
          </div>
        </section>
      )
    } else {
      return <div className='content-area invitation-page'>Loading</div>
    }
  }
}
