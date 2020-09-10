/*
 * Author : nitin Tyagi
 * github  : https://github.com/realinit
 * Email : nitin.1992tyagi@gmail.com
 */
import React, { Component, Fragment } from 'react'
import GameFilter from './gameFilter'
import GameList from './gameList'
import GameDetails from './gameDetails'
import SingleGameDetails from './singlegameDetails.js'
import NoRecord from './NoRecord.js'
import { PullDataFunction as getScheduleGames } from './getScheduleGames'
import axios from 'axios'
import Select from 'react-select'
import { prefilledFilter_option } from './option'

import InfiniteScroll from 'react-infinite-scroll-component'

export default class MyScheduledGames extends Component {
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
      fetching: false,
      exclude_expired: false,
    }
  }

  handleShowAllComments = async (id) => {
    this.setState({ showAllComment: !this.state.showAllComment })
    const allComments = await axios.get(`/api/comments/get_right_card_comment_info/${id}`)
    if (allComments.data) {
      this.setState({ commentData: { ...allComments.data } })
    }
  }

  async componentDidMount() {
    const scheduleGames = await axios.post(`/api/myScheduledGames`, {
      counter: 1,
      exclude_expired: false,
      filter: 0,
    })

    if (scheduleGames.data && scheduleGames.data.myScheduledGames && scheduleGames.data.myScheduledGames.length > 0) {
      this.setState({ scheduleGames: scheduleGames.data.myScheduledGames })
    }
    window.history.pushState('myG', 'myG', '/?at=mygames')
  }

  getSingleGameData = async (e, id, game) => {
    e.preventDefault()
    e.stopPropagation()
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

  getScheduleGamesData = async (data = {}) => {
    const { counter, scheduleGames = [], exclude_expired, filter } = this.state
    let count = counter + 1
    this.setState({ fetching: true })
    const scheduleGamesRes = await axios.post(`/api/myScheduledGames`, {
      counter: count,
      exclude_expired: exclude_expired,
      filter,
    })
    if (scheduleGamesRes.data && scheduleGamesRes.data.myScheduledGames.length == 0) {
      this.setState({
        moreplease: false,
        fetching: false,
      })
      return
    }
    if (scheduleGamesRes.data && scheduleGamesRes.data.myScheduledGames.length > 0) {
      if (count > 1) {
        this.setState({ scheduleGames: [...scheduleGames, ...scheduleGamesRes.data.myScheduledGames], counter: count, fetching: false })
      } else {
        this.setState({ scheduleGames: scheduleGamesRes.data.myScheduledGames, fetching: false })
      }
    }
  }
  handleExcludesFullGames = async (e, _filter = '') => {
    const checked = e ? e.target.checked : this.state.exclude_expired
    const filter = _filter !== '' ? _filter : this.state.filter
    const scheduleGamesRes = await axios.post(`/api/myScheduledGames`, {
      counter: 1,
      exclude_expired: checked,
      filter,
    })

    if (scheduleGamesRes.data && scheduleGamesRes.data.myScheduledGames.length > 0) {
      this.setState({ scheduleGames: scheduleGamesRes.data.myScheduledGames, fetching: false, exclude_expired: checked, filter })
    } else {
      this.setState({
        moreplease: false,
        fetching: false,
        exclude_expired: checked,
        filter,
        scheduleGames: [],
      })
    }
  }
  handleChangeFilter = (prefilledFilter) => {
    this.setState({ prefilledFilter }, () => {
      this.handleExcludesFullGames(null, prefilledFilter.value)
    })
  }

  render() {
    const { routeProps = {} } = this.props
    const { match = {} } = routeProps
    const { params = {} } = match
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
      fetching,
      prefilledFilter,
    } = this.state
    const { latestScheduledGames = [] } = scheduleGamesView

    if (this.props.initialData == 'loading') {
      return <h1>Loading</h1>
    }
    return (
      <section className='viewGame__container'>
        <div
          className={`gameList__section ${singleView ? 'singleGameView__container' : 'GameView__container'}`}
          style={{ display: 'block' }}>
          <div className='myGame__filter-section'>
            <div className='viewGame__gameName'>
              <Select
                onChange={(data) => this.handleChangeFilter(data)}
                options={prefilledFilter_option}
                placeholder='Select your filter'
                name='prefilledFilter'
                className='viewGame__name'
                classNamePrefix='filter'
                value={prefilledFilter}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {scheduleGames.length > 0 ? (
              <Fragment>
                <div style={{ flex: 1 }}>
                  <GameList
                    scheduleGames={scheduleGames}
                    show_full_games={show_full_games}
                    handleExcludesFullGames={this.handleExcludesFullGames}
                    slideOptionLabel={`Exclude Expired Games`}
                    getSingleGameData={this.getSingleGameData}
                    next={this.getScheduleGamesData}
                    hasMore={this.state.moreplease}
                    fetching={fetching}
                    copyClipboardEnable={false}
                    showPrefilledFilter={true}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <GameDetails
                    singleScheduleGamesPayload={singleScheduleGamesPayload}
                    selected_game={selected_game}
                    showRightSideInfo={showRightSideInfo}
                    commentData={commentData}
                    handleShowAllComments={this.handleShowAllComments}
                    showAllComment={showAllComment}
                    {...this.props}
                  />
                </div>
              </Fragment>
            ) : (
              <NoRecord />
            )}
          </div>
        </div>
      </section>
    )
  }
}
