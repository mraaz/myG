import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import ArchivedScheduledGamePost from './ArchivedScheduledGamePost'

export default class ArchivedScheduledGames extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    const self = this

    const { match } = this.props.routeProps

    const getExactData = async function() {
      try {
        const myArchiveScheduledGame = await axios.get(
          `/api/ArchiveScheduleGame/filtered_by_one/${match.params.id}`
        )
        self.setState({
          myScheduledGames: myArchiveScheduledGame.data.latestScheduledGames,
        })
      } catch (error) {
        console.log(error)
      }
    }

    if (match.params.id != undefined && match.params.id != '') {
      getExactData()
    } else {
      self.setState({
        myScheduledGames: [],
      })
    }
  }

  showLatestPosts = () => {
    if (this.state.myScheduledGames != undefined) {
      return this.state.myScheduledGames.map((item, index) => {
        return (
          <ArchivedScheduledGamePost
            schedule_game={item}
            key={index}
            user={this.props.initialData}
          />
        )
      })
    }
  }

  render() {
    if (this.state.myScheduledGames !== undefined) {
      return (
        <section id='posts'>
          <div className='content-area scheduleGames-page'>
            <div id='header-2'>
              <img src='https://mygame-media.s3-ap-southeast-2.amazonaws.com/headers/headers_v1-19.png' />
            </div>
            <div className='da-gap'></div>
            {this.showLatestPosts()}
          </div>
        </section>
      )
    } else {
      return <div className='content-area scheduleGames-page'>Loading</div>
    }
  }
}
