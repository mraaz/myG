import React, { Component } from 'react'
import axios from 'axios'
import IndividualInvitation from './IndividualInvitation'
import InfiniteScroll from 'react-infinite-scroll-component'

export default class Invitation extends Component {
  constructor() {
    super()
    this.state = {
      counter: 0,
      myFriendRequests: [],
      moreplease: true,
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.fetchMoreData()
  }

  fetchMoreData = () => {
    if (this.state.myFriendRequests.length > 0) {
      window.scrollTo(0, document.documentElement.offsetHeight - 4000)
    }
    const self = this

    const getFriendnoti = async function () {
      try {
        const getFriendnoti = await axios.post('/api/notifications/allmyFriendRequests', {
          counter: self.state.counter,
        })

        if (getFriendnoti.data.allMyFriends.data.length == 0) {
          self.state.moreplease = false
          return
        }

        self.setState({
          myFriendRequests: self.state.myFriendRequests.concat(getFriendnoti.data.allMyFriends.data),
        })
      } catch (error) {
        console.log(error)
      }
    }

    var myCounter = this.state.counter
    this.setState(
      {
        counter: this.state.counter + 1,
      },
      () => {
        getFriendnoti()
      }
    )

    if (myCounter != 1) {
      this.setState({
        show_top_btn: true,
      })
    }
  }

  showInvitations = () => {
    if (this.state.myFriendRequests != undefined) {
      const rowLen = this.state.myFriendRequests.length
      var lastRow = false
      if (rowLen == 0) {
        return <div className='invitation-info'>No pending invitations</div>
      }
      return this.state.myFriendRequests.map((item, index) => {
        if (rowLen === index + 1) {
          lastRow = true
        }
        return <IndividualInvitation invitation={item} key={index} lastRow={lastRow} />
      })
    }
  }

  render() {
    return (
      <section id='invitation-page'>
        <div className='content-area invitation-page'>
          <div className='padding-container'>
            <div className='invitation-grey-container'>
              <h3>myInvitations</h3>
              <div className='padding-container'></div>
              <div className='invitation-container'>
                <InfiniteScroll dataLength={this.state.myFriendRequests.length} next={this.fetchMoreData} hasMore={this.state.moreplease}>
                  {this.showInvitations()}
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
