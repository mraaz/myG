import React, { Component } from 'react'
import axios from 'axios'

import ScheduleGamesView from './scheduledGames/ScheduleGames'
import IndividualPost from './IndividualPost'

export default class GroupsProcessing extends Component {
  constructor() {
    super()
    this.state = { scheduledGameView: false }
  }

  componentDidMount() {
    const self = this

    const process_data = async function() {
      if (self.props.post.schedule_games_id != null) {
        try {
          const onescheduledGames = await axios.get(`/api/ScheduleGame/filtered_by_one/${self.props.post.schedule_games_id}`)
          if (onescheduledGames.data.latestScheduledGames.length != 0) {
            self.setState({
              schedule_games: onescheduledGames.data.latestScheduledGames[0],
              scheduledGameView: true,
            })
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    process_data()
  }

  showPost = () => {
    if (this.state.scheduledGameView) {
      return <ScheduleGamesView schedule_game={this.state.schedule_games} key={this.props.post.id} user={this.props.user} />
    } else {
      return <IndividualPost post={this.props.post} key={this.props.post.id} user={this.props.user} />
    }
  }

  render() {
    return <div className='content-area scheduleGames-page'>{this.showPost()}</div>
  }
}
