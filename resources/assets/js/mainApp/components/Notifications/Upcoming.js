import React, { Component, Fragment } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'

import UpcomingItem from './UpcomingItem'
import NoRecord from './NoRecord'

export default class Upcoming extends Component {
  constructor() {
    super()
    this.state = {
      upcomingGames: [],
      moreplease: true,
      counter: 1,
      fetching: false,
    }
    this.myRef = React.createRef()
  }

  async componentDidMount() {
    try {
      const getUpcomingGames = await axios.post('/api/ScheduleGame/myScheduledGames_Upcoming_Games', {
        counter: 1,
      })
      if (getUpcomingGames.data && getUpcomingGames.data.myScheduledGames.length > 0) {
        this.setState({ upcomingGames: getUpcomingGames.data.myScheduledGames }, () => {
          this.props.setNotificationsCount(this.state.upcomingGames.length)
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  getUpcomingGamesData = async () => {
    const { counter, upcomingGames = [] } = this.state
    let count = counter + 1
    this.setState({ fetching: true })
    const getUpcomingGames = await axios.post('/api/ScheduleGame/myScheduledGames_Upcoming_Games', {
      counter: count,
    })
    if (getUpcomingGames.data && getUpcomingGames.data.myScheduledGames.length == 0) {
      this.setState({
        moreplease: false,
        fetching: false,
      })
      return
    }
    if (getUpcomingGames.data && getUpcomingGames.data.myScheduledGames.length > 0) {
      if (count > 1) {
        this.setState(
          { upcomingGames: [...upcomingGames, ...getUpcomingGames.data.myScheduledGames], counter: count, fetching: false },
          () => {
            this.props.setNotificationsCount(this.state.upcomingGames.length)
          }
        )
      } else {
        this.setState({ upcomingGames: getUpcomingGames.data.myScheduledGames, fetching: false }, () => {
          this.props.setNotificationsCount(this.state.upcomingGames.length)
        })
      }
    }
  }
  handleScroll = (event) => {
    const _event = event.currentTarget,
      _current = this.myRef.current
    if (_event.scrollTop + (3 / 2) * _current.offsetHeight > _event.scrollHeight && this.state.moreplease && !this.state.fetching) {
      this.getUpcomingGamesData()
    }
  }

  render() {
    const { active } = this.props
    const { upcomingGames = [], moreplease = true } = this.state

    const isActive = active == true ? { display: 'block' } : { display: 'none' }

    return (
      <div style={isActive}>
        <div className='gameList__box upcoming__game' onScroll={this.handleScroll} ref={this.myRef}>
          {upcomingGames.length == 0 && <NoRecord />}
          {upcomingGames.length > 0 &&
            upcomingGames.map((game) => {
              return <UpcomingItem {...game} {...this.props} />
            })}
        </div>
      </div>
    )
  }
}
