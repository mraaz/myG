import React, { Component } from 'react'
import GameFilter from './gameFilter'
import GameList from './gameList'
import GameDetails from './gameDetails'
import { PullDataFunction as getScheduleGames } from './getScheduleGames'
import axios from 'axios'

export default class ScheduleGames extends Component {
  constructor() {
    super()
    this.state = {
      show_full_games: false,
      singleScheduleGamesPayload: {},
      selected_game: {},
      showRightSideInfo: false,
      commentData: {},
    }
  }

  async componentDidMount() {
    const { params = {} } = this.props.routeProps.match
    const { id = '' } = params
    if (id) {
      const scheduleGames = await axios.get(`/api/ScheduleGame/filtered_by_one/${id}`)
      if (scheduleGames.data && scheduleGames.data.latestScheduledGames.length > 0) {
        this.setState({ scheduleGames: scheduleGames.data.latestScheduledGames })
      }
    } else {
      const scheduleGames = await getScheduleGames({ counter: 1 })
      if (scheduleGames.data && scheduleGames.data.latestScheduledGames.length > 0) {
        this.setState({ scheduleGames: scheduleGames.data.latestScheduledGames })
      }
    }
  }

  getSingleGameData = async (id, game) => {
    const scheduleGames = await axios.get(`/api/ScheduleGame/additional_game_info/${id}`)
    const allComments = await axios.get(`/api/comments/get_right_card_comment_info/${id}`)
    if (allComments.data) {
      this.setState({ commentData: { ...allComments.data } })
    }
    if (scheduleGames.data && Object.keys(scheduleGames.data).length > 0) {
      this.setState({ singleScheduleGamesPayload: scheduleGames.data, selected_game: { ...game }, showRightSideInfo: true })
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
  ScheduleGames = async (data = {}) => {
    const scheduleGames = await getScheduleGames({ ...this.state, ...data })
    if (scheduleGames.data && scheduleGames.data.latestScheduledGames.length > 0) {
      this.setState({ scheduleGames: scheduleGames.data.latestScheduledGames })
    }
  }
  handleExcludesFullGames = (e) => {
    const checked = e.target.checked
    this.setState({ show_full_games: checked }, () => {
      this.ScheduleGames({ show_full_games: checked })
    })
  }

  render() {
    const { params = {} } = this.props.routeProps.match
    const { id = '' } = params
    const {
      savedFilter,
      addFilter,
      scheduleGames,
      show_full_games,
      singleScheduleGamesPayload,
      selected_game,
      showRightSideInfo,
      commentData,
    } = this.state
    if (this.props.initialData == 'loading') {
      return <h1>Loading</h1>
    }
    return (
      <section className='viewGame__container'>
        {id == '' && <GameFilter handleChange={this.handleChange} />}
        <div className='gameList__section'>
          <GameList
            scheduleGames={scheduleGames}
            show_full_games={show_full_games}
            handleExcludesFullGames={this.handleExcludesFullGames}
            getSingleGameData={this.getSingleGameData}
          />
          <GameDetails
            singleScheduleGamesPayload={singleScheduleGamesPayload}
            selected_game={selected_game}
            showRightSideInfo={showRightSideInfo}
            commentData={commentData}
          />
        </div>
      </section>
    )
  }
}
