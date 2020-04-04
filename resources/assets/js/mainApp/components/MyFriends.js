import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import IndividualFriend from './IndividualFriend'
import InfiniteScroll from 'react-infinite-scroll-component'

export default class MyFriends extends Component {
  constructor() {
    super()
    this.state = { moreplease: true, counter: 0, allMyFriends: [], total_friends: 0 }
  }

  componentDidMount() {
    this.pullData()
  }

  pullData = async () => {
    this.state.counter = this.state.counter + 1

    try {
      const getFriends = await axios.post('/api/friends/allmyFriends', {
        counter: this.state.counter,
      })

      if (getFriends.data.showallMyFriends.data.length == 0) {
        this.setState({
          moreplease: false,
        })
        return
      }

      if (this.state.total_friends == 0) {
        this.setState({
          total_friends: getFriends.data.myFriendsLength[0].total_friends,
        })
      }

      this.setState({
        allMyFriends: this.state.allMyFriends.concat(getFriends.data.showallMyFriends.data),
      })
    } catch (error) {
      console.log(error)
    }
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
                  {this.state.allMyFriends.length == 1 ? this.state.total_friends + ' friend' : this.state.total_friends + ' friends'})
                </h3>
                <div className='padding-container'></div>
                <div className='invitation-container'>
                  <InfiniteScroll dataLength={this.state.allMyFriends.length} next={this.pullData} hasMore={this.state.moreplease}>
                    {this.showFriends()}
                  </InfiniteScroll>
                </div>
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
