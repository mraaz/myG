import React, { Component, Fragment } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'

import UpcomingItem from './UpcomingItem'

export default class Upcoming extends Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    try {
      const getUpcomingGames_Dashboard = await axios.post('/api/ScheduleGame/myScheduledGames_Upcoming_Games', {
        counter: 1,
      })

      console.log(getUpcomingGames_Dashboard)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { active } = this.props

    const isActive = active == true ? { display: 'block' } : { display: 'none' }

    return (
      <div style={isActive}>
        <InfiniteScroll dataLength={5} hasMore={false}>
          <UpcomingItem gameTitle='Dota 2' players='3' />
        </InfiniteScroll>
      </div>
    )
  }
}
