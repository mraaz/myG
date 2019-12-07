import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import ScheduledGamePost_Default from './ScheduledGamePost_Default'
import ScheduledGamePost_Dota2 from './ScheduledGamePost_Dota2'
import ScheduledGamePost_Clash_Royale from './ScheduledGamePost_Clash_Royale'

export default class ScheduledGamePost extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {}

  showPost = () => {
    switch (this.props.schedule_game.game_name) {
      case 'Dota 2':
        return <ScheduledGamePost_Dota2 props={this.props} />
        break
      case 'Clash Royale':
        return <ScheduledGamePost_Clash_Royale props={this.props} />
        break
      default:
        return <ScheduledGamePost_Default props={this.props} />
    }
  }

  render() {
    return <div className='gamesPosts'> {this.showPost()}</div>
  }
}
