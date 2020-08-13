import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'
import TopTabs from './TopTabs'

export default class Approvals extends Component {
  constructor() {
    super()
  }

  componentDidMount = async () => {
    window.scrollTo(0, 0)
    const getApprovals_Dashboard = await axios.post('/api/notifications_v2/getApprovals_Dashboard', {
      counter: 1,
      activity_type: 0,
    })
  }

  render() {
    const { active } = this.props

    const isActive = active == true ? { display: 'block' } : { display: 'none' }

    return (
      <div style={isActive}>
        <TopTabs tabs={['All', 'Friendships', 'Games', 'Communities']} />
        <div className='notification'>
          <div className='notification-user-avatar'></div>
          <div className='notification-content'>
            <p className='notification-description'>
              <span className='notification-username'>@brunogoodma</span> has liked your post
            </p>
            <div className='notification-options'>
              <span className='notification-time'>45 minutes ago</span>
              <div className='notification-actions'>
                <button className='action accept'>Accept</button>
                <button className='action decline'>Decline</button>
              </div>
            </div>
          </div>
        </div>
        <div className='notification'>
          <div className='notification-user-avatar'></div>
          <div className='notification-content'>
            <p className='notification-description'>
              <span className='notification-username'>@brunogoodma</span> has sent you a{' '}
              <span className='notification-type'>Friendship</span> request
            </p>
            <div className='notification-options'>
              <span className='notification-time'>45 minutes ago</span>
              <div className='notification-actions'>
                <button className='action accept'>Accept</button>
                <button className='action decline'>Decline</button>
              </div>
            </div>
          </div>
        </div>
        <div className='endline'>No more updates</div>
      </div>
    )
  }
}
