import React, { Component } from 'react'
import axios from 'axios'

import TopTabs from './TopTabs'

export default class Alerts extends Component {
  constructor() {
    super()
    this.state = {
      counter: 1,
      notification: [],
    }
  }

  componentDidMount = async () => {
    const { counter } = this.state
    window.scrollTo(0, 0)
    const getnoti = await axios.post('/api/notifications_v2/getAllNoti', {
      counter,
      activity_type: 0,
    })
    if (getnoti.data.length > 0) {
      this.setState({
        notification: getnoti.data,
      })
    }
  }
  changeTab = async (tab) => {}

  render() {
    const { active } = this.props

    const isActive = active == true ? { display: 'block' } : { display: 'none' }

    return (
      <div style={isActive}>
        <TopTabs tabs={['All', 'Feed', 'Games', 'Misc']} changeTab={this.changeTab} />
        <div className='top-actions'>
          <div className='actions'>
            <button className='action'>Mark All Read</button>
            <button className='action'>Clear All</button>
          </div>
        </div>
        <div className='notification alert'>
          <div className='notification-user-avatar'></div>
          <div className='notification-content'>
            <p className='notification-description'>
              <span className='notification-username'>@brunogoodma</span>
              has <span className='notification-type'>Commented</span>
              your <span className='notification-link'>Post</span>
            </p>
            <div className='notification-options'>
              <span className='notification-time'>45 minutes ago</span>
            </div>
          </div>
        </div>
        <div className='endline'>No more updates</div>
      </div>
    )
  }
}
