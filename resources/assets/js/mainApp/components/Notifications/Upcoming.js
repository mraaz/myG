import React, { Component, Fragment } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'

import UpcomingItem from './UpcomingItem'

export default class Upcoming extends Component {
  constructor() {
    super()
    this.state = {
      upcomingGames: [],
    }
  }

  async componentDidMount() {
    try {
      const getUpcomingGames = await axios.post('/api/ScheduleGame/myScheduledGames_Upcoming_Games', {
        counter: 1,
      })
      if (getUpcomingGames.data && getUpcomingGames.data.myScheduledGames.length > 0) {
        this.setState({ upcomingGames: getUpcomingGames.data.myScheduledGames })
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { active } = this.props
    const { upcomingGames = [] } = this.state

    const isActive = active == true ? { display: 'block' } : { display: 'none' }

    return (
      <div style={isActive}>
        <InfiniteScroll dataLength={5} hasMore={false}>
          <div className='gameList__box'>
            {upcomingGames.map((game) => {
              return <UpcomingItem {...game} />
            })}
          </div>
        </InfiniteScroll>
      </div>
    )
  }
}
