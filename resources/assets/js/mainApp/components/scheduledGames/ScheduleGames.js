import React, { Component } from 'react'
import GameFilter from './gameFilter'
import GameList from './gameList'
import GameDetails from './gameDetails'

export default class ScheduleGames extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    // this.getFilter()
  }

  render() {
    const { savedFilter, addFilter } = this.state
    if (this.props.initialData == 'loading') {
      return <h1>Loading</h1>
    }
    return (
      <section className='viewGame__container'>
        <GameFilter />
        <div className='gameList__section'>
          <GameList />
          <GameDetails />
        </div>
      </section>
    )
  }
}
