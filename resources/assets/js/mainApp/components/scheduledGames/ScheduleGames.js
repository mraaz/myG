import React, { Component } from 'react'
import GameFilter from './gameFilter'
import GameList from './gameList'
import GameDetails from './gameDetails'
import { PullDataFunction as getScheduleGames } from './getScheduleGames'
import axios from 'axios'

export default class ScheduleGames extends Component {
  constructor() {
    super()
    this.state = {}
  }

  async componentDidMount() {
    const { params = {} } = this.props.routeProps.match
    const { id = '' } = params
    if (id) {
      const scheduleGames = await axios.get(`/api/ScheduleGame/filtered_by_one/${id}`)
      if (scheduleGames.data.latestScheduledGames.length > 0) {
        this.setState({ scheduleGames: scheduleGames.data.latestScheduledGames })
      }
    } else {
      const scheduleGames = await getScheduleGames({ counter: 1 })
      if (scheduleGames.data && scheduleGames.data.latestScheduledGames.length > 0) {
        this.setState({ scheduleGames: scheduleGames.data.latestScheduledGames })
      }
    }
  }

  handleChange = async (data, name) => {
    if (name == 'game_name') {
      this.setState({ ...data }, () => {
        this.ScheduleGames()
      })
    } else {
      this.setState({ ...data }, () => {
        this.ScheduleGames()
      })
    }
  }
  ScheduleGames = async () => {
    const scheduleGames = await getScheduleGames(this.state)
    if (scheduleGames.data && scheduleGames.data.latestScheduledGames.length > 0) {
      this.setState({ scheduleGames: scheduleGames.data.latestScheduledGames })
    }
  }

  render() {
    const { params = {} } = this.props.routeProps.match
    const { id = '' } = params
    const { savedFilter, addFilter, scheduleGames } = this.state
    if (this.props.initialData == 'loading') {
      return <h1>Loading</h1>
    }
    return (
      <section className='viewGame__container'>
        {id == '' && <GameFilter handleChange={this.handleChange} />}
        <div className='gameList__section'>
          <GameList scheduleGames={scheduleGames} />
          <GameDetails />
        </div>
      </section>
    )
  }
}
