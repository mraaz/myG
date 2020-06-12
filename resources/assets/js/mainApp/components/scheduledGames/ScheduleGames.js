import React, { Component, Fragment } from 'react'
import GameFilter from './GameFilter'
import GameList from './GameList'
import GameDetails from './GameDetails'
import SingleGameDetails from './SingleGameDetails.js'
import { PullDataFunction as getScheduleGames } from './getScheduleGames'
import axios from 'axios'

import InfiniteScroll from 'react-infinite-scroll-component'

export default class ScheduleGames extends Component {
  constructor() {
    super()
    this.state = {
      show_full_games: false,
      singleScheduleGamesPayload: {},
      scheduleGames: [],
      selected_game: {},
      showRightSideInfo: false,
      commentData: {},
      singleView: false,
      moreplease: true,
      counter: 1,
      scheduleGamesView: {},
      showAllComment: false,
    }
  }

  handleShowAllComments = () => {
    this.setState({ showAllComment: !this.state.showAllComment })
  }

  async componentDidMount() {
    const { params = {} } = this.props.routeProps.match
    const { id = '' } = params
    if (id) {
      const scheduleGames = await axios.get(`/api/ScheduleGame/filtered_by_one/${id}`)
      if (scheduleGames.data && scheduleGames.data.latestScheduledGames.length > 0) {
        this.setState({ scheduleGamesView: scheduleGames.data, showRightSideInfo: true, singleView: true })
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
      this.setState({
        singleScheduleGamesPayload: scheduleGames.data,
        selected_game: { ...game },
        showRightSideInfo: true,
        showAllComment: false,
      })
    }
  }

  handleChange = async (data, name) => {
    this.setState({ singleScheduleGamesPayload: {}, showRightSideInfo: false })
    if (name == 'game_name') {
      this.setState({ ...data }, () => {
        this.getScheduleGamesChangeCall()
      })
    } else {
      this.setState({ ...data }, () => {
        this.getScheduleGamesChangeCall()
      })
    }
  }
  getScheduleGamesChangeCall = async (data = {}) => {
    const { counter, scheduleGames = [] } = this.state
    const scheduleGamesRes = await getScheduleGames({ ...this.state, ...data, counter: 1 })

    if (scheduleGamesRes.data && scheduleGamesRes.data.latestScheduledGames.length == 0) {
      this.setState({
        moreplease: false,
      })
      return
    }

    if (scheduleGamesRes.data && scheduleGamesRes.data.latestScheduledGames.length > 0) {
      const { latestScheduledGames = [] } = scheduleGamesRes.data
      this.setState({ scheduleGames: latestScheduledGames })
    }
  }
  getScheduleGamesData = async (data = {}) => {
    const { counter, scheduleGames = [] } = this.state

    let count = counter + 1

    if (scheduleGames.length > 0) {
      window.scrollTo(0, document.documentElement.offsetHeight - 4000)
    }
    const scheduleGamesRes = await getScheduleGames({ ...this.state, ...data, counter: count })

    if (scheduleGamesRes.data && scheduleGamesRes.data.latestScheduledGames.length == 0) {
      this.setState({
        moreplease: false,
      })
      return
    }

    if (scheduleGamesRes.data && scheduleGamesRes.data.latestScheduledGames.length > 0) {
      if (count > 1) {
        this.setState({ scheduleGames: [...scheduleGames, ...scheduleGamesRes.data.latestScheduledGames], counter: count })
      } else {
        this.setState({ scheduleGames: scheduleGames.data.latestScheduledGames })
      }
    }
  }
  handleExcludesFullGames = (e) => {
    const checked = e.target.checked
    this.setState({ show_full_games: checked }, () => {
      this.getScheduleGamesChangeCall({ show_full_games: checked })
    })
  }

  render() {
    const { params = {} } = this.props.routeProps.match
    const { id = '' } = params
    const {
      savedFilter,
      addFilter,
      scheduleGames = [],
      show_full_games,
      singleScheduleGamesPayload,
      selected_game,
      showRightSideInfo,
      commentData,
      singleView,
      scheduleGamesView = {},
      showAllComment,
    } = this.state
    const { latestScheduledGames = [] } = scheduleGamesView

    if (this.props.initialData == 'loading') {
      return <h1>Loading</h1>
    }
    return (
      <section className='viewGame__container'>
        {id == '' && <GameFilter handleChange={this.handleChange} />}
        <div className={`gameList__section ${singleView ? 'singleGameView__container' : 'GameView__container'}`}>
          {!singleView && scheduleGames.length > 0 ? (
            <Fragment>
              <InfiniteScroll dataLength={scheduleGames.length} next={this.getScheduleGamesData} hasMore={this.state.moreplease}>
                <GameList
                  scheduleGames={scheduleGames}
                  show_full_games={show_full_games}
                  handleExcludesFullGames={this.handleExcludesFullGames}
                  getSingleGameData={this.getSingleGameData}
                />
              </InfiniteScroll>
              <GameDetails
                singleScheduleGamesPayload={singleScheduleGamesPayload}
                selected_game={selected_game}
                showRightSideInfo={showRightSideInfo}
                commentData={commentData}
                handleShowAllComments={this.handleShowAllComments}
                showAllComment={showAllComment}
                {...this.props}
              />
            </Fragment>
          ) : (
            <Fragment>
              {latestScheduledGames.length > 0 ? (
                <SingleGameDetails
                  scheduleGames={scheduleGamesView}
                  showRightSideInfo={showRightSideInfo}
                  commentData={commentData}
                  {...this.props}
                />
              ) : (
                <h1>There is no data found!</h1>
              )}
            </Fragment>
          )}
        </div>
      </section>
    )
  }
}
