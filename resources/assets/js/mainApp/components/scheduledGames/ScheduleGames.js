import React, { Component } from 'react'
import GameFilter from './gameFilter'
import GameList from './gameList'
import GameDetails from './gameDetails'
import { PullDataFunction as getScheduleGames } from './getScheduleGames'

export default class ScheduleGames extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {}
  handleChange = async (data) => {
    this.setState({ ...data }, () => {
      this.ScheduleGames()
    })
  }
  ScheduleGames = async () => {
    const scheduleGames = await getScheduleGames(this.state)
    console.log('scheduleGames', scheduleGames)
    if (scheduleGames.data.length > 0) {
      this.setState({ scheduleGames: scheduleGames.data })
    }
  }

  render() {
    const { savedFilter, addFilter, scheduleGames } = this.state
    if (this.props.initialData == 'loading') {
      return <h1>Loading</h1>
    }
    return (
      <section className='viewGame__container'>
        <GameFilter handleChange={this.handleChange} />
        <div className='gameList__section'>
          <GameList scheduleGames={scheduleGames} />
          <GameDetails />
        </div>
      </section>
    )
  }
}
